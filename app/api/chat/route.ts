import { NextRequest } from 'next/server'
import { Readable } from 'stream'
import { aiConfig } from '../../../lib/aiConfig'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const userMessage = body.message

    if (!userMessage) {
      return new Response('No message provided', { status: 400 })
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
        stream: true,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      return new Response(errorText, { status: response.status })
    }

    const reader = response.body?.getReader()
    const stream = new ReadableStream({
      start(controller) {
        async function push() {
          if (!reader) {
            controller.close()
            return
          }
          const { done, value } = await reader.read()
          if (done) {
            controller.close()
            return
          }

          const chunk = new TextDecoder().decode(value)
          try {
            const parsedChunk = JSON.parse(chunk)
            const content = parsedChunk.choices[0]?.delta?.content
            if (content) controller.enqueue(content)
          } catch (error) {
            console.error('Error parsing chunk:', error)
          }
          push()
        }
        push()
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (error) {
    return new Response(String(error), { status: 500 })
  }
}
