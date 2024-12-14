import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export default async function middleware(request: NextRequest) {
  const session = (await cookies()).get('access_token')

  if (!session) {
    return NextResponse.redirect(new URL('/', request.url))
  }
}

export const config = {
  matcher: ['/profile'],
}