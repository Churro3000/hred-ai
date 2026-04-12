import { NextResponse } from 'next/server'

export async function GET() {
  const garakUrl = process.env.GARAK_URL
  
  if (!garakUrl) {
    return NextResponse.json({ error: 'GARAK_URL not set' })
  }

  try {
    const res = await fetch(`${garakUrl}/health`, {
      signal: AbortSignal.timeout(10000),
    })
    const data = await res.json()
    return NextResponse.json({ garakUrl, health: data, status: res.status })
  } catch (err) {
    return NextResponse.json({ garakUrl, error: String(err) })
  }
}
