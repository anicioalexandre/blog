import React, { type FC } from 'react'

import { graphql } from 'babel-plugin-relay/macro'
import Relay from 'react-relay'

import type { CommentItemFragment$key } from '__generated__/CommentItemFragment.graphql'
import { formatRelativeDate } from 'utils/date'

import MarkdownViewer from './MarkdownViewer'
import type { CommentsItemProps } from './types'

const CommentItemFragmentQuery = graphql`
  fragment CommentItemFragment on DiscussionComment {
    id
    body
    author {
      login
      avatarUrl
    }
    createdAt
  }
`

const CommentsItem: FC<CommentsItemProps> = ({ commentRef, children, isReply = false }) => {
  const comment = Relay.useFragment<CommentItemFragment$key>(CommentItemFragmentQuery, commentRef)

  if (isReply) {
    return (
      <li className="reply-timeline rounded-lg pl-4 pt-0 last:pb-3">
        <div className="flex items-center justify-start space-x-3 py-3 pr-3">
          <img
            src={comment.author?.avatarUrl}
            alt={`${comment.author?.login}'s avatar`}
            className="z-10 h-[30px] w-[30px] rounded-full"
          />
          <div className="grid grid-cols-[1fr_max-content] items-end gap-2">
            <p className="prose-subtitle2">{comment.author?.login}</p>
            <p className="prose-caption text-object-low">{formatRelativeDate(comment.createdAt)}</p>
          </div>
        </div>
        <div className="pl-[42px]">
          <MarkdownViewer>{comment.body}</MarkdownViewer>
        </div>
        {children}
      </li>
    )
  }

  return (
    <li className="rounded-lg border border-surface-border bg-surface-active">
      <div className="flex items-center justify-start space-x-3 p-4">
        <img
          src={comment.author?.avatarUrl}
          alt={`${comment.author?.login}'s avatar`}
          className="z-10 h-8 w-8 rounded-full"
        />
        <div className="grid grid-cols-[1fr_max-content] items-end gap-2">
          <p className="prose-subtitle2">{comment.author?.login}</p>
          <p className="prose-caption text-object-low">{formatRelativeDate(comment.createdAt)}</p>
        </div>
      </div>
      <div className="px-4 pb-4">
        <MarkdownViewer>{comment.body}</MarkdownViewer>
      </div>
      {children}
    </li>
  )
}

export default CommentsItem
