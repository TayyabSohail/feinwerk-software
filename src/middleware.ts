import { type NextRequest, NextResponse } from 'next/server';

import { updateSession } from '@/lib/supabase/middleware';

import { isSupabaseConfigured } from '@/env';

export async function middleware(request: NextRequest) {
  // The marketing site has no authenticated surface; the session refresh only
  // runs once Supabase is configured so the site works with zero env vars.
  if (!isSupabaseConfigured) return NextResponse.next({ request });
  return await updateSession(request);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml)$).*)',
  ],
};
