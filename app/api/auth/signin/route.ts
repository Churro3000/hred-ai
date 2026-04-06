import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { neon } from '@neondatabase/serverless'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required.' }, { status: 400 })
    }

    const sql = neon(process.env.DATABASE_URL!)

    const rows = await sql`SELECT * FROM users WHERE email = ${email}`
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Incorrect email or password.' }, { status: 401 })
    }

    const user = rows[0]
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      return NextResponse.json({ error: 'Incorrect email or password.' }, { status: 401 })
    }

    const response = NextResponse.json({ success: true })
    response.cookies.set('hr_session', Buffer.from(JSON.stringify({ email, name: user.name })).toString('base64'), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })
    return response
  } catch {
    return NextResponse.json({ error: 'Sign in failed.' }, { status: 500 })
  }
}
