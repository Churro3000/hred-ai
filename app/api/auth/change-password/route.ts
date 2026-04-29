import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    const session = req.cookies.get('hr_session')?.value
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const { email } = JSON.parse(Buffer.from(session, 'base64').toString())

    const { currentPassword, newPassword } = await req.json()
    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const sql = neon(process.env.DATABASE_URL!)
    const rows = await sql`SELECT password FROM users WHERE email = ${email} LIMIT 1`
    if (!rows.length) return NextResponse.json({ error: 'User not found' }, { status: 404 })

    const valid = await bcrypt.compare(currentPassword, rows[0].password)
    if (!valid) return NextResponse.json({ error: 'Current password is incorrect.' }, { status: 401 })

    const hashed = await bcrypt.hash(newPassword, 12)
    await sql`UPDATE users SET password = ${hashed} WHERE email = ${email}`

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Change password error:', err)
    return NextResponse.json({ error: 'Failed to change password.' }, { status: 500 })
  }
}