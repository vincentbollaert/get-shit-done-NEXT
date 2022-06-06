import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const response = NextResponse.next();

  if (url.pathname === '/api/v1/user/signout') {
    response.clearCookie('authCookie', { path: '/' });
  }

  return response;
}
