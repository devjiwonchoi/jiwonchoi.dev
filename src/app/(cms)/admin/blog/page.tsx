import { sql } from '@vercel/postgres'

export default async function BlogAdmin() {
  async function getPosts() {
    'use server'
    const { rows } =
      await sql`SELECT id, slug, title, created_at, updated_at FROM blogs`
    return { posts: rows }
  }

  const { posts } = await getPosts()
  return (
    <main className="mb-auto p-6">
      <article className="mb-6">
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-neutral-200 sm:text-3xl">
          Blog
        </h2>
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-neutral-200">ID</th>
              <th className="px-4 py-2 text-neutral-200">Slug</th>
              <th className="px-4 py-2 text-neutral-200">Title</th>
              <th className="px-4 py-2 text-neutral-200">Created At</th>
              <th className="px-4 py-2 text-neutral-200">Updated At</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td className="border px-4 py-2 text-neutral-200">{post.id}</td>
                <td className="border px-4 py-2 text-neutral-200">
                  {post.slug}
                </td>
                <td className="border px-4 py-2 text-neutral-200">
                  {post.title}
                </td>
                <td className="border px-4 py-2 text-neutral-200">
                  {new Date(post.created_at).toLocaleString('en', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: false,
                  })}
                </td>
                <td className="border px-4 py-2 text-neutral-200">
                  {new Date(post.updated_at).toLocaleString('en', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: false,
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </main>
  )
}
