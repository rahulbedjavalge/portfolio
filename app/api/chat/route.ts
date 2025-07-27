import { NextRequest, NextResponse } from 'next/server'
import { aiConfig } from '../../../lib/aiConfig'
import { chatAnalytics } from '../../../lib/analytics'

// Function to try a specific model
async function tryModel(modelName: string, userMessage: string) {
  const response = await fetch(aiConfig.api.url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      ...aiConfig.api.headers,
    },
    body: JSON.stringify({
      model: modelName,
      messages: [
        { role: 'system', content: aiConfig.systemMessage },
        { role: 'user', content: userMessage },
      ],
      temperature: aiConfig.model.temperature,
      max_tokens: aiConfig.model.maxTokens,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Model ${modelName} failed: ${response.status} - ${errorText}`)
  }

  return await response.json()
}

export async function POST(req: NextRequest) {
  const startTime = Date.now()
  let currentModel = 'unknown'
  let messageLength = 0

  try {
    const body = await req.json()
    const userMessage = body.message
    messageLength = userMessage?.length || 0

    if (!userMessage) {
      const responseTime = Date.now() - startTime
      chatAnalytics.trackChatInteraction({
        model: 'none',
        responseTime,
        success: false,
        messageLength: 0,
        errorType: 'no_message'
      })

      return NextResponse.json({ error: 'No message provided' }, { status: 400 })
    }

    // Check if API key is configured
    if (!process.env.OPENROUTER_API_KEY) {
      console.error('OPENROUTER_API_KEY is not configured')
      const responseTime = Date.now() - startTime
      chatAnalytics.trackChatInteraction({
        model: 'none',
        responseTime,
        success: false,
        messageLength,
        errorType: 'no_api_key'
      })

      return NextResponse.json({ 
        error: 'API key not configured. Please add your OpenRouter API key to .env.local' 
      }, { status: 500 })
    }

    let lastError: Error | null = null

    // Try each model in sequence until one works
    for (const modelName of aiConfig.models) {
      currentModel = modelName
      try {
        console.log(`Trying model: ${modelName}`)
        const data = await tryModel(modelName, userMessage)
        let assistantMessage = data.choices?.[0]?.message?.content || 'No response from AI'
        
        // Clean up response - remove thinking tags and model references
        assistantMessage = assistantMessage
          .replace(/<think>[\s\S]*?<\/think>/g, '') // Remove thinking blocks
          .replace(/\[thinking\][\s\S]*?\[\/thinking\]/g, '') // Remove alternative thinking format
          .replace(/^thinking:.*$/gm, '') // Remove thinking lines
          .replace(/Model: .*/g, '') // Remove model references
          .trim()

        const responseTime = Date.now() - startTime
        
        // Track successful interaction
        chatAnalytics.trackChatInteraction({
          model: currentModel,
          responseTime,
          success: true,
          messageLength
        })

        console.log(`✅ Success with model: ${modelName} (${responseTime}ms)`)
        
        return NextResponse.json({ 
          reply: assistantMessage,
          model: currentModel
        })
        
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error)
        console.log(`❌ Model ${modelName} failed:`, errorMsg)
        lastError = error instanceof Error ? error : new Error(String(error))
        continue // Try next model
      }
    }

    // If all models failed
    const responseTime = Date.now() - startTime
    chatAnalytics.trackChatInteraction({
      model: currentModel,
      responseTime,
      success: false,
      messageLength,
      errorType: 'all_models_failed'
    })

    console.error('All models failed. Last error:', lastError?.message)
    
    if (lastError?.message.includes('401')) {
      return NextResponse.json({ 
        error: 'Invalid API key. Please check your OpenRouter API key.' 
      }, { status: 401 })
    }
    
    if (lastError?.message.includes('429')) {
      return NextResponse.json({ 
        error: 'Rate limit exceeded on all models. Please try again later.' 
      }, { status: 429 })
    }
    
    return NextResponse.json({ 
      error: `All AI models are currently unavailable. Last error: ${lastError?.message || 'Unknown error'}` 
    }, { status: 503 })

  } catch (error) {
    const responseTime = Date.now() - startTime
    chatAnalytics.trackChatInteraction({
      model: currentModel,
      responseTime,
      success: false,
      messageLength,
      errorType: error instanceof Error ? error.message : 'unknown_error'
    })

    console.error('Error in /api/chat:', error)
    return NextResponse.json({ 
      error: 'Internal server error. Please try again.' 
    }, { status: 500 })
  }
}
