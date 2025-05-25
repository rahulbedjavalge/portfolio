import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const RATE_LIMIT = 10 // requests per minute
const WINDOW_SIZE = 60 // 1 minute in seconds

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown'
    const now = Math.floor(Date.now() / 1000)
    const windowStart = now - WINDOW_SIZE

    // Check existing requests
    const { data: requests, error } = await supabase
      .from('rate_limits')
      .select('created_at')
      .gte('created_at', windowStart)
      .eq('ip', ip)

    if (error) throw error

    if (requests.length >= RATE_LIMIT) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      )
    }

    // Log new request
    await supabase.from('rate_limits').insert([
      {
        ip,
        created_at: now,
      },
    ])

    return NextResponse.json({ allowed: true })
  } catch (error) {
    console.error('Rate limit error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
