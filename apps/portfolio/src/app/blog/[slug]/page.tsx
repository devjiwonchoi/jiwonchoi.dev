import { NotionAPI } from 'notion-client'
import NotionPage from '@/components/NotionPage'
import { refinePosts } from '@/lib/notion'
import 'react-notion-x/src/styles.css'
import 'prismjs/themes/prism-tomorrow.css'

export default async function BlogPost({
  params,
}: {
  params: { slug: string }
}) {
  const notion = new NotionAPI()
  const blockId = params.slug.split('-').pop() ?? ''
  const recordMap = await notion.getPage(blockId)

  return (
    <main className="mb-auto p-6">
      <NotionPage recordMap={recordMap} />
    </main>
  )
}