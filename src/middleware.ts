import { type NextRequest, NextResponse } from 'next/server'
import { i18n } from '@/utils/i18n'

function rewriteToDefaultLang(pathname: string, url: string) {
  return NextResponse.rewrite(new URL(`/${i18n.defaultLang}${pathname}`, url))
}

export function middleware({ url, nextUrl: { pathname } }: NextRequest) {
  const defaultRoutes = ['/blog', '/request']
  const isDefaultRoute =
    pathname === '/' ||
    defaultRoutes.some((route) => pathname.startsWith(route))
  if (isDefaultRoute) {
    return rewriteToDefaultLang(pathname, url)
  }

  const startsWithLang = i18n.langs.some((lang) =>
    pathname.startsWith(`/${lang}`),
  )

  const hasLang = isDefaultRoute || startsWithLang
  if (hasLang) {
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL(`/`, url))
}

// TODO: find a better way to skip route from public directory
export const config = {
  matcher: [
    '/((?!api|admin|_next/static|_next/image|.*.ico$|.*.svg$|.*.png$|sitemap|robots).*)',
  ],
}
