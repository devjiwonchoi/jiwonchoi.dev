import Link from 'next/link'
import { Console } from '@/utils/browser-console'

export default function Bio() {
  return (
    <main className="mb-auto p-6">
      <article className="mb-6">
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-neutral-200 sm:text-3xl">
          Biography
        </h2>
        <blockquote className="mb-6 border-l-2 border-solid border-neutral-500 pl-2.5 italic text-neutral-400">
          &quot;Don&apos;t let the comment speak for your code.&quot; - Jiwon
          Choi
        </blockquote>
        <h3 className="mb-4 text-xl font-bold tracking-tight text-neutral-200 sm:text-2xl">
          DevLife
        </h3>
        <p className="text-base text-neutral-300 sm:text-base">
          I enjoy to{' '}
          <strong className="text-neutral-50">
            automate, document, and minimalize
          </strong>{' '}
          the development process, focusing on the essentials.
        </p>
        <p className="text-base text-neutral-300 sm:text-base">
          I write my code to be{' '}
          <strong className="text-neutral-50">
            self-explanatory and precise
          </strong>
          , minimizing the need for extensive comments.
        </p>
      </article>
      <article className="mb-6">
        <h3 className="mb-4 text-xl font-bold tracking-tight text-neutral-200 sm:text-2xl">
          Goal & Interests
        </h3>
        <p className="text-base text-neutral-300 sm:text-base">
          I believe that{' '}
          <strong className="text-neutral-50">
            saving time and effort for developers
          </strong>{' '}
          will eventually make the world a bit better place to live.
        </p>
        <p className="text-base text-neutral-300 sm:text-base">
          This is why I chose DevOps, and for the same reason I am interested in
          compilers.
        </p>
      </article>
      <article className="mb-6">
        <h3 className="mb-4 text-xl font-bold tracking-tight text-neutral-200 sm:text-2xl">
          Dependencies
        </h3>
        <p className="text-base text-neutral-300 sm:text-base">
          I am an{' '}
          <Link
            href="https://www.credly.com/badges/acf8b0bc-2952-4ee1-ac3b-7ab91478ddbb"
            target="_blank"
            className="underline hover:text-neutral-50"
          >
            AWS Certified Developer - Associate
          </Link>
          .
        </p>
        <p className="text-base text-neutral-300 sm:text-base">
          Apart from coding, I actively contribute to Next.js -{' '}
          <Link
            href="https://github.com/vercel/next.js/discussions"
            target="_blank"
            className="underline hover:text-neutral-50"
          >
            Discussions
          </Link>
          , and I also enjoy BJJ and{' '}
          <Link
            href="https://www.chess.com/member/devjiwonchoi"
            target="_blank"
            className="underline hover:text-neutral-50"
          >
            chess
          </Link>
          .
        </p>
      </article>
      <Console />
    </main>
  )
}