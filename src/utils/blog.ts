import { type SchemaContext, getCollection, render, z } from 'astro:content'

import { BLOG_TAGS } from 'constants/blog'

export const getBlogSchema = ({ image }: SchemaContext) =>
  z.object({
    title: z.string().max(80),
    description: z.string(),
    discussionId: z.string().optional(),
    date: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    hero: image(),
    heroPublicUrl: z.string(),
    heroCredit: z.string(),
    heroAlt: z.string(),
    tags: z.enum(BLOG_TAGS).array().default([]),
    draft: z.boolean().default(false),
    minutesRead: z.string().optional(),
  })

type GetPostOptions = {
  amount?: number | undefined
}
export const getPosts = async ({ amount }: GetPostOptions = {}) => {
  const posts = (await getCollection('blog'))
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
    .slice(0, amount)

  const postsWithReadingTime = await Promise.all(
    posts.map(async (post) => {
      const { remarkPluginFrontmatter } = await render(post)
      return {
        ...post,
        data: {
          ...post.data,
          minutesRead: remarkPluginFrontmatter?.minutesRead || undefined,
        },
      }
    }),
  )

  return postsWithReadingTime
}
