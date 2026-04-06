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

    const existing = await sql`SELECT id FROM users WHERE email = ${email}`
    if (existing.length > 0) {
      return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 400 })
    }

    const hashed = await bcrypt.hash(password, 10)
    const name = email.split('@')[0]
    await sql`INSERT INTO users (email, password, name) VALUES (${email}, ${hashed}, ${name})`

    const response = NextResponse.json({ success: true })
    response.cookies.set('hr_session', Buffer.from(JSON.stringify({ email, name })).toString('base64'), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })
    return response
  } catch {
    return NextResponse.json({ error: 'Sign up failed.' }, { status: 500 })
  }
}
