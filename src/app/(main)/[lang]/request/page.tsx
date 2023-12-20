import type { Metadata } from 'next'
import { getServerSession } from 'next-auth/next'
import { AuthForm, RequestForm } from '@/components'
import { getDictionary } from '@/utils/i18n'
import { authOptions } from '@/utils'

export default async function Request({
  params: { lang },
}: {
  params: { lang: string }
}) {
  const session = await getServerSession(authOptions)
  const dictionary = await getDictionary(lang)

  return (
    <main className="mb-auto p-6">
      {/* TODO: Convert them to parallel routes */}
      {session ? (
        <RequestForm dictionary={dictionary} email={session.user?.email} />
      ) : (
        <AuthForm dictionary={dictionary} />
      )}
    </main>
  )
}

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: string }
}): Promise<Metadata> {
  const {
    req: { title, description },
  } = await getDictionary(lang)
  return {
    title,
    description,
  }
}
