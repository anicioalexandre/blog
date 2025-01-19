import React, { type FC } from 'react'

import Markdown, { type Options as ReactMarkdownProps } from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'

const MarkdownViewer: FC<ReactMarkdownProps> = (props) => {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
      className="markdown prose grid overflow-auto"
      {...props}
    />
  )
}

export default MarkdownViewer
