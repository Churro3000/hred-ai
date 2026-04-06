import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

const users: Record<string, { email: string; password: string; name: string }> = {}

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required.' }, { status: 400 })
    }
    const user = users[email]
    if (!user) {
      return NextResponse.json({ error: 'Incorrect email or password.' }, { status: 401 })
    }
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      return NextResponse.json({ error: 'Incorrect email or password.' }, { status: 401 })
    }

    const response = NextResponse.json({ success: true })
    response.cookies.set('hr_session', Buffer.from(JSON.stringify({ email, name: user.name })).toString('base64'), {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })
    return response
  } catch {
    return NextResponse.json({ error: 'Sign in failed.' }, { status: 500 })
  }
}
