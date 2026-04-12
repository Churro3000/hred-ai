import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

export async function GET(req: NextRequest) {
  try {
    const session = req.cookies.get('hr_session')?.value
    if (!session) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    const { email } = JSON.parse(Buffer.from(session, 'base64').toString())

    const sql = neon(process.env.DATABASE_URL!)
    const findings = await sql`
      SELECT f.*, e.endpoint_url
      FROM monitoring_findings f
      JOIN monitored_endpoints e ON f.endpoint_id = e.id
      WHERE f.user_email = ${email}
      ORDER BY f.discovered_at DESC
      LIMIT 50
    `
    return NextResponse.json(findings)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch findings.' }, { status: 500 })
  }
}
