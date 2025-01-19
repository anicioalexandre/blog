import type { z } from 'astro:content'

import type { getBlogSchema, getPosts } from 'utils/blog'

export type BlogPost = Awaited<ReturnType<typeof getPosts>>[0]

export type BlogPostData = z.infer<ReturnType<typeof getBlogSchema>>
