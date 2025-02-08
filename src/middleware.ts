import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(req: NextRequest): NextResponse {
  const url = req.nextUrl.clone();
  const response = NextResponse.next();

  if (url.pathname === '/api/v1/user/signout') {
    response.cookies.delete('authCookie');
  }

  return response;
}

export const config = {
  matcher: '/api/v1/user/:path*'
};
