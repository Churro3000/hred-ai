import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

export async function GET(req: NextRequest) {
  try {
    const session = req.cookies.get('hr_session')?.value
    if (!session) return NextResponse.json({ plan: 'free' })
    const { email } = JSON.parse(Buffer.from(session, 'base64').toString())

    const sql = neon(process.env.DATABASE_URL!)
    const rows = await sql`
      SELECT plan, status FROM subscriptions
      WHERE user_email = ${email}
      AND status = 'active'
      LIMIT 1
    `

    if (!rows.length) return NextResponse.json({ plan: 'free' })
    return NextResponse.json({ plan: rows[0].plan, status: rows[0].status })
  } catch {
    return NextResponse.json({ plan: 'free' })
  }
}