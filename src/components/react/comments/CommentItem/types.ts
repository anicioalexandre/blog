import type { PropsWithChildren } from 'react'

import type { CommentItemFragment$key } from '__generated__/CommentItemFragment.graphql'

export interface CommentsItemProps extends PropsWithChildren {
  commentRef: CommentItemFragment$key
  isReply?: boolean
}
