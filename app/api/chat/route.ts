import { NextRequest, NextResponse } from 'next/server'
import { aiConfig } from '../../../lib/aiConfig'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const userMessage = body.message

    if (!userMessage) {
      return NextResponse.json({ error: 'No message provided' }, { status: 400 })
    }

    const response = await fetch(aiConfig.api.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        ...aiConfig.api.headers,
      },
      body: JSON.stringify({
        model: aiConfig.model.name,
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
      console.error('OpenRouter API error:', errorText)
      return NextResponse.json({ error: 'Failed to fetch AI response' }, { status: 500 })
    }

    const data = await response.json()
    const assistantMessage = data.choices[0]?.message?.content || 'No response from AI'

    return NextResponse.json({ reply: assistantMessage }) // ✅ Proper JSON response
  } catch (error) {
    console.error('Error in /api/chat:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
