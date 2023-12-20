import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ProfileCard } from '@/components'
import { Header, Footer, NavBar } from '@/components/layouts'
import { getDictionary, i18n } from '@/utils/i18n'

export default async function LangRootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  const dictionary = await getDictionary(lang)
  return (
    <html className={`${GeistSans.variable} bg-neutral-950`} lang={lang}>
      <body className="container mx-auto flex h-screen max-w-4xl flex-col">
        <Header dict={dictionary} />
        <ProfileCard dict={dictionary} />
        <NavBar dict={dictionary} />
        {children}
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: string }
}): Promise<Metadata> {
  const { metadata } = await getDictionary(lang)

  return {
    title: {
      default: metadata.title.default,
      template: metadata.title.template,
    },
    openGraph: {
      type: 'website',
      locale: metadata.locale,
      siteName: metadata.openGraph.siteName,
      images: [
        {
          url: '/me-logo800x600.png',
          width: 800,
          height: 600,
          alt: metadata.openGraph.images[0].alt,
        },
      ],
    },
    keywords: ['Jiwon Choi', 'devjiwonchoi', 'jiwonchoi.dev'],
  }
}

export async function generateStaticParams() {
  return i18n.langs.map((lang) => ({ lang }))
}
