import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

export async function GET(req: NextRequest) {
  try {
    const session = req.cookies.get('hr_session')?.value
    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }
    const { email } = JSON.parse(Buffer.from(session, 'base64').toString())
    const sql = neon(process.env.DATABASE_URL!)
    const audits = await sql`
      SELECT audit_id, timestamp, endpoint_url, risk_score, risk_level, total_probes, vulnerabilities_found
      FROM audits
      WHERE user_email = ${email}
      ORDER BY timestamp DESC
      LIMIT 20
    `
    return NextResponse.json(audits)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch audits.' }, { status: 500 })
  }
}
