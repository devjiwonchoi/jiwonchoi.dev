import { compileMDX } from 'next-mdx-remote/rsc'
import { components } from '@/utils/mdx-components'

export default async function BlogPost({
  params: { slug },
}: {
  params: { slug: string }
}) {
  const res = await fetch(`${process.env.API_URL}/blog/${slug}`)
  const { post } = await res.json()
  const { frontmatter, content } = await compileMDX<{
    title: string
    description: string
  }>({
    source: post.source,
    components,
    options: { parseFrontmatter: true },
  })
  return (
    <main className="mb-auto p-6">
      <h1 className="mb-4 text-2xl font-bold tracking-tight text-neutral-200 sm:text-3xl">
        {frontmatter.title}
      </h1>
      {/* {post.tags.split(',').map((tag: string, index: number) => (
        <span
          className="mr-2 mt-2 inline-block rounded bg-neutral-700 px-2 py-1 text-xs font-medium text-neutral-100"
          key={index}
        >
          {tag}
        </span>
      ))} */}
      {content}
    </main>
  )
}

export async function generateStaticParams() {
  const res = await fetch(`${process.env.API_URL}/blog`)
  const { posts } = await res.json()

  return posts.map((post: { slug: string }) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string }
}) {
  const res = await fetch(`${process.env.API_URL}/blog/${slug}`)
  const { post } = await res.json()
  const { frontmatter } = await compileMDX<{
    title: string
    description: string
  }>({
    source: post.source,
    options: { parseFrontmatter: true },
  })
  return {
    title: frontmatter.title,
    description: frontmatter.description,
  }
}
