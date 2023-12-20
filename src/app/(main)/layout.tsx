import type { Metadata } from 'next'
import '@/globals.css'

export default function ContentsRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.jiwonchoi.dev'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
      'ko-KR': '/ko',
      'zh-CN': '/zh',
      en: '/',
      ko: '/ko',
      zh: '/zh',
    },
  },
  twitter: {
    creator: '@devjiwonchoi',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  // TODO: viewport for dark mode
}
