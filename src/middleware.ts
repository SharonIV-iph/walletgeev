import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isPrivatePath = path === '/dashboard'
  const isAuthPath = path === '/login' || path === '/signup'
  const token = request.cookies.get('token')?.value || ''

  if (isPrivatePath && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  if (isAuthPath && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  if (isPrivatePath && token) {
    try {
        console.log("token",token)
        

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/verify`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      if (!data["status"]) {
        throw new Error('Invalid token')
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
} 