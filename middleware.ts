import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function unauthorized() {
  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      // Böngésző be fog dobni egy natív felhasználónév/jelszó promptot:
      'WWW-Authenticate': 'Basic realm="Admin Area"',
    },
  });
}

export function middleware(req: NextRequest) {
  // Csak az /admin alatti útvonalakat védjük
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  const auth = req.headers.get('authorization');
  if (!auth) return unauthorized();

  const [type, credentials] = auth.split(' ');
  if (type !== 'Basic' || !credentials) return unauthorized();

  // Edge runtime-on használd atob-ot a dekódoláshoz
  const decoded = atob(credentials);
  const [user, pass] = decoded.split(':');

  // Statikus cred: admin / admin
  if (user === 'forrasfernanda' && pass === 'password1234') {
    return NextResponse.next();
  }

  return unauthorized();
}

export const config = {
  matcher: ['/admin/:path*'],
};