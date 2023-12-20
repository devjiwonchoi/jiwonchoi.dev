import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import '@/globals.css'

export default function ManagementRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={`${GeistSans.variable} bg-neutral-950`} lang="en">
      <body className="container mx-auto flex h-screen max-w-4xl flex-col">
        {children}
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}
