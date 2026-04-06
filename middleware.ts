import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const session = req.cookies.get('hr_session')?.value
  const { pathname } = req.nextUrl

  // If trying to access dashboard without a session, redirect to signin
  if (pathname.startsWith('/dashboard') && !session) {
    return NextResponse.redirect(new URL('/signin', req.url))
  }

  // If already signed in and hitting signin/signup, redirect to dashboard
  if ((pathname === '/signin' || pathname === '/signup') && session) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/signin', '/signup'],
}
