import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Add your path conditions here
  if (request.nextUrl.pathname === '/') {
    return NextResponse.next()
  }

  // For dynamic routes like /[id]
  if (request.nextUrl.pathname.match(/^\/[^/]+$/)) {
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/:id*',
  ],
}
