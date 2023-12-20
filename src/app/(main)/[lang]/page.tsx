import type { Metadata, ResolvingMetadata } from 'next'
import Link from 'next/link'
// import { headers } from 'next/headers'
import { getDictionary } from '@/utils/i18n'

export default async function Bio({
  params: { lang },
}: {
  params: { lang: string }
}) {
  // ['en-US', 'en;q=0.9'] -> 'en-US'
  // const primaryLang = headers().get('Accept-Language')?.split(',')[0]
  //TODO: if !isPrimaryLang, suggest to redirect to primaryLang
  // const isPrimaryLang = primaryLang ? validateLang(primaryLang, lang) : false

  const { bio, common } = await getDictionary(lang)
  return (
    <main className="mb-auto p-6">
      <article className="mb-6">
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-neutral-200 sm:text-3xl">
          {bio.h2}
        </h2>
        <blockquote className="mb-6 border-l-2 border-solid border-neutral-500 pl-2.5 italic text-neutral-400">
          &quot;{bio.quote}&quot;
        </blockquote>
        <h3 className="mb-4 text-xl font-bold tracking-tight text-neutral-200 sm:text-2xl">
          {bio.h3_1}
        </h3>
        <p className="text-base text-neutral-200 sm:text-base">
          {bio.p_1}
          <strong className="text-neutral-50">{bio.strong_1}</strong>
        </p>
        <p className="text-base text-neutral-200 sm:text-base">
          {bio.p_2}
          <Link
            className="underline hover:text-neutral-50"
            href="https://github.com/vercel/next.js"
            target="_blank"
          >
            {common.nextjs}
          </Link>
          ,{' '}
          <Link
            className="underline hover:text-neutral-50"
            href="https://github.com/microsoft/TypeScript"
            target="_blank"
          >
            {common.typescript}
          </Link>
          , {common.and}{' '}
          <Link
            className="underline hover:text-neutral-50"
            href="https://github.com/huozhi/bunchee"
            target="_blank"
          >
            {common.bunchee}
          </Link>
          .
        </p>
      </article>
      <article className="mb-6">
        <h3 className="mb-4 text-xl font-bold tracking-tight text-neutral-200 sm:text-2xl">
          {bio.h3_2}
        </h3>
        <p className="text-base text-neutral-200 sm:text-base">
          {bio.p_3_1}
          <strong className="text-neutral-50">{bio.strong_2}</strong>
          {bio.p_3_2}
        </p>
        <p className="text-base text-neutral-200 sm:text-base">{bio.p_4}</p>
        <p className="text-base text-neutral-200 sm:text-base">
          {bio.p_5_1}
          <strong className="text-neutral-50">{bio.strong_3}</strong>
        </p>
      </article>
      <article className="mb-6">
        <h3 className="mb-4 text-xl font-bold tracking-tight text-neutral-200 sm:text-2xl">
          {bio.h3_3}
        </h3>
        <p className="text-base text-neutral-200 sm:text-base">
          {bio.p_6}
          <Link
            className="underline hover:text-neutral-50"
            href="https://en.wikipedia.org/wiki/Brazilian_jiu-jitsu"
            target="_blank"
          >
            {common.bjj}
          </Link>{' '}
          {common.and}{' '}
          <Link
            className="underline hover:text-neutral-50"
            href="https://www.chess.com/member/devjiwonchoi"
            target="_blank"
          >
            {common.chess}
          </Link>
          .
        </p>
      </article>
      <article>
        <h3 className="mb-4 text-xl font-bold tracking-tight text-neutral-200 sm:text-2xl">
          {bio.h3_4}
        </h3>
        <ul className="list-inside list-disc text-neutral-200">
          <li>
            <Link
              className="underline hover:text-neutral-50"
              href="https://www.credly.com/badges/acf8b0bc-2952-4ee1-ac3b-7ab91478ddbb"
              target="_blank"
            >
              {common.awsCertDev}
            </Link>
          </li>
          <li>
            <Link
              className="underline hover:text-neutral-50"
              href="https://en.wikipedia.org/wiki/Commendation_Medal"
              target="_blank"
            >
              {common.arcom}
            </Link>{' '}
            x 2
          </li>
        </ul>
      </article>
    </main>
  )
}

// function validateLang(primaryLang: string, lang: string) {
//   let locale = primaryLang
//   if (primaryLang.includes('-')) {
//     // ko-KR -> ko; zh-CN -> zh
//     locale = primaryLang.split('-')[0]
//   }

//   return locale === lang
// }

export async function generateMetadata(
  {
    params: { lang },
  }: {
    params: { lang: string }
  },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const {
    bio: { metadata },
  } = await getDictionary(lang)
  const { openGraph, keywords } = await parent

  return {
    description: metadata.description,
    openGraph: {
      ...openGraph,
      url: metadata.openGraph.url,
    },
    keywords: keywords?.concat(metadata.keywords) ?? metadata.keywords,
  }
}
