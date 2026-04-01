import { NextRequest, NextResponse } from 'next/server'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { createToken } from '@/lib/auth'
import { verifyPassword } from '@/lib/password'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required.' }, { status: 400 })
    }

    const uid = email.toLowerCase().replace(/[^a-z0-9]/g, '_')
    const userRef = doc(db, 'users', uid)
    const userSnap = await getDoc(userRef)

    if (!userSnap.exists()) {
      return NextResponse.json({ error: 'Incorrect email or password.' }, { status: 401 })
    }

    const userData = userSnap.data()
    const valid = await verifyPassword(password, userData.password)

    if (!valid) {
      return NextResponse.json({ error: 'Incorrect email or password.' }, { status: 401 })
    }

    const token = await createToken({ uid, email: userData.email, name: userData.name })

    const response = NextResponse.json({ success: true })
    response.cookies.set('hr_session', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })

    return response
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Sign in failed. Please try again.' }, { status: 500 })
  }
}
