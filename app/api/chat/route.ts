import { NextRequest, NextResponse } from 'next/server'
import { aiConfig } from '../../../lib/aiConfig'

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
  try {
    const body = await req.json()
    const userMessage = body.message

    if (!userMessage) {
      return NextResponse.json({ error: 'No message provided' }, { status: 400 })
    }

    // Check if API key is configured
    if (!process.env.OPENROUTER_API_KEY) {
      console.error('OPENROUTER_API_KEY is not configured')
      return NextResponse.json({ 
        error: 'API key not configured. Please add your OpenRouter API key to .env.local' 
      }, { status: 500 })
    }

    let lastError: Error | null = null

    // Try each model in sequence until one works
    for (const modelName of aiConfig.models) {
      try {
        console.log(`Trying model: ${modelName}`)
        const data = await tryModel(modelName, userMessage)
        const assistantMessage = data.choices?.[0]?.message?.content || 'No response from AI'
        
        console.log(`✅ Success with model: ${modelName}`)
        
        return NextResponse.json({ 
          reply: assistantMessage,
          model: modelName // Include which model was used
        })
        
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error)
        console.log(`❌ Model ${modelName} failed:`, errorMsg)
        lastError = error instanceof Error ? error : new Error(String(error))
        continue // Try next model
      }
    }

    // If all models failed
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
    console.error('Error in /api/chat:', error)
    return NextResponse.json({ 
      error: 'Internal server error. Please try again.' 
    }, { status: 500 })
  }
}
