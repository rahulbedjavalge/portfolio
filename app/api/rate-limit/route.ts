import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory rate limiting (resets on server restart)
const requestCounts = new Map<string, { count: number; windowStart: number }>()

const RATE_LIMIT = 10 // requests per minute
const WINDOW_SIZE = 60 // 1 minute in seconds

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
    const now = Math.floor(Date.now() / 1000)
    const windowStart = now - WINDOW_SIZE

    // Get current count for this IP
    const current = requestCounts.get(ip)
    
    // If no record exists or window has passed, create new record
    if (!current || current.windowStart < windowStart) {
      requestCounts.set(ip, { count: 1, windowStart: now })
      return NextResponse.json({ allowed: true, remaining: RATE_LIMIT - 1 })
    }

    // If within rate limit, increment count
    if (current.count < RATE_LIMIT) {
      current.count++
      return NextResponse.json({ allowed: true, remaining: RATE_LIMIT - current.count })
    }

    // Rate limit exceeded
    return NextResponse.json(
      { 
        allowed: false, 
        error: 'Rate limit exceeded. Please try again later.',
        retryAfter: WINDOW_SIZE - (now - current.windowStart)
      }, 
      { status: 429 }
    )

  } catch (error) {
    console.error('Rate limiting error:', error)
    // Allow request if rate limiting fails
    return NextResponse.json({ allowed: true, remaining: RATE_LIMIT })
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Rate limiting endpoint', 
    rateLimit: RATE_LIMIT,
    windowSize: WINDOW_SIZE 
  })
}
