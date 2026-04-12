import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

export async function POST(req: NextRequest) {
  try {
    const session = req.cookies.get('hr_session')?.value
    if (!session) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    const { email } = JSON.parse(Buffer.from(session, 'base64').toString())

    const { endpointUrl, apiKey, tier } = await req.json()
    if (!endpointUrl || !apiKey) {
      return NextResponse.json({ error: 'Missing endpoint URL or API key' }, { status: 400 })
    }

    const sql = neon(process.env.DATABASE_URL!)
    await sql`
      INSERT INTO monitored_endpoints (user_email, endpoint_url, api_key, tier)
      VALUES (${email}, ${endpointUrl}, ${apiKey}, ${tier ?? 'paid'})
    `

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to add endpoint.' }, { status: 500 })
  }
}
