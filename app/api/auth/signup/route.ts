import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

const users: Record<string, { email: string; password: string; name: string }> = {}

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required.' }, { status: 400 })
    }
    if (users[email]) {
      return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 400 })
    }
    const hashed = await bcrypt.hash(password, 10)
    users[email] = { email, password: hashed, name: email.split('@')[0] }

    const response = NextResponse.json({ success: true })
    response.cookies.set('hr_session', Buffer.from(JSON.stringify({ email, name: email.split('@')[0] })).toString('base64'), {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })
    return response
  } catch {
    return NextResponse.json({ error: 'Sign up failed.' }, { status: 500 })
  }
}
