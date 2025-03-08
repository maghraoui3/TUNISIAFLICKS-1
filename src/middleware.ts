import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import type { NextRequest } from 'next/server'

export default withAuth(
  function middleware(req: NextRequest) {
    const res = NextResponse.next()

    // Clean up any chunked session cookies that might exist
    const cookies = req.cookies.getAll()
    cookies.forEach((cookie) => {
      if (cookie.name.startsWith('__Secure-next-auth.session-token.')) {
        res.cookies.delete(cookie.name)
      }
    })

    const isAuthPage = req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/signup')

    if (isAuthPage) {
      // We don't need to check for authentication here because withAuth will handle it
      return res
    }

    return res
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/login',
    },
  }
)

export const config = { 
  matcher: ['/dashboard/:path*', '/profile/:path*', '/login', '/signup', '/:path*']
}

