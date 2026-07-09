import rss from '@astrojs/rss'
import type { APIRoute } from 'astro'

import { config } from 'constants/site'
import { getPosts } from 'utils/blog'

export const prerender = true

export const GET: APIRoute = async (context) => {
  const posts = await getPosts()

  return rss({
    title: config.title,
    description: config.description,
    site: context.site ?? config.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.id}/`,
    })),
    customData: `<language>${config.lang}</language>`,
  })
}
