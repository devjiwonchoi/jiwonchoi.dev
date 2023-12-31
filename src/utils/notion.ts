// import { Client } from '@notionhq/client'

// export const NOTION_BLOG_PAGE_SIZE = 7

// export const notionClient = new Client({
//   auth: process.env.NOTION_TOKEN,
// })

// export function generateSlug(title: string, id: string): string {
//   return `${title.toLowerCase().replace(/ /g, '-')}-${id.replace(/-/g, '')}`
// }

// export function getPostsInfo(data: any) {
//   const postData = data.map((postData: any) => {
//     const postProperties = postData.properties

//     const id = postData.id
//     const title = postProperties.Page.title[0].text.content
//     const categories = postProperties.Category.multi_select
//     const slug = generateSlug(title, id)
//     const updatedAt = new Date(
//       postProperties.Date.last_edited_time,
//     ).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//     })

//     return {
//       id,
//       title,
//       categories,
//       slug,
//       updatedAt,
//     }
//   })
//   return [{ posts: postData }, { nextCursor: postData[postData.length - 1].id }]
// }

export function refinePosts(data: any) {
  return data
    .flat()
    .flatMap((obj: any) => obj.posts || [])
    .filter(
      (post: any, index: number, self: any) =>
        index === self.findIndex((p: any) => p.id === post.id),
    )
}
