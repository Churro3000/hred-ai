import { NextRequest, NextResponse } from 'next/server'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { createToken } from '@/lib/auth'
import { hashPassword } from '@/lib/password'

export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required.' }, { status: 400 })
    }

    const uid = email.toLowerCase().replace(/[^a-z0-9]/g, '_')
    const userRef = doc(db, 'users', uid)
    const existing = await getDoc(userRef)

    if (existing.exists()) {
      return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 400 })
    }

    const hashedPassword = await hashPassword(password)

    await setDoc(userRef, {
      uid,
      email: email.toLowerCase(),
      name: name ?? email.split('@')[0],
      password: hashedPassword,
      plan: 'free',
      baaSigned: false,
      createdAt: new Date().toISOString(),
    })

    const token = await createToken({ uid, email: email.toLowerCase(), name: name ?? email.split('@')[0] })

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
    return NextResponse.json({ error: 'Sign up failed. Please try again.' }, { status: 500 })
  }
}
