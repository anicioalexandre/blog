import { glob } from 'astro/loaders'
import { defineCollection } from 'astro:content'

import { getBlogSchema } from 'utils/blog'

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: getBlogSchema,
})

export const collections = { blog }
