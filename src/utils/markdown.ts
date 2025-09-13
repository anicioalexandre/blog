import { toString } from 'mdast-util-to-string'
import getReadingTime from 'reading-time'

export const remarkReadingTime = () => {
  // @ts-ignore no types for this :)
  return (tree, { data }) => {
    const textOnPage = toString(tree)
    const readingTime = getReadingTime(textOnPage)

    // Ensure the astro and frontmatter objects exist
    data.astro = data.astro || {}
    data.astro.frontmatter = data.astro.frontmatter || {}

    // Add reading time to frontmatter
    data.astro.frontmatter.minutesRead = readingTime.text
  }
}
