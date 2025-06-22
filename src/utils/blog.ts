import { type SchemaContext, getCollection, z } from 'astro:content'

import { BLOG_CATEGORIES, BLOG_TAGS } from 'constants/blog'

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
    heroCredit: z.string(),
    heroAlt: z.string(),
    category: z.enum(BLOG_CATEGORIES).default('frontend'),
    tags: z.enum(BLOG_TAGS).array().default([]),
    draft: z.boolean().default(false),
  })

type GetPostOptions = {
  amount?: number | undefined
}
export const getPosts = async ({ amount }: GetPostOptions = {}) => {
  return (await getCollection('blog'))
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
    .slice(0, amount)
}
