import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Skip middleware for static files and API routes that don't need auth
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/api/') ||
    request.nextUrl.pathname.includes('.') ||
    request.nextUrl.pathname === '/admin-login'
  ) {
    return NextResponse.next()
  }

  let supabaseResponse = NextResponse.next({
    request,
  })

  // Only run auth checks for admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    try {
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            getAll() {
              return request.cookies.getAll()
            },
            setAll(cookiesToSet) {
              cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
              supabaseResponse = NextResponse.next({
                request,
              })
              cookiesToSet.forEach(({ name, value, options }) =>
                supabaseResponse.cookies.set(name, value, options)
              )
            },
          },
        }
      )

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        const url = request.nextUrl.clone()
        url.pathname = '/admin-login'
        return NextResponse.redirect(url)
      }

      // Check if user is admin (with error handling)
      try {
        const { data: role } = await supabase
          .rpc('get_user_role', { user_id: user.id })

        if (!role || role !== 'admin') {
          const url = request.nextUrl.clone()
          url.pathname = '/admin-login'
          return NextResponse.redirect(url)
        }
      } catch (error) {
        // If profiles table doesn't exist or there's an error, redirect to login
        const url = request.nextUrl.clone()
        url.pathname = '/admin-login'
        return NextResponse.redirect(url)
      }
    } catch (error) {
      // If there's any error with Supabase, allow the request to continue
      console.error('Middleware error:', error)
      return NextResponse.next()
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/admin/:path*'
  ],
}