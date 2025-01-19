export type CommentReplyCreateForm = {
  body: string
}

export interface CommentReplyCreateProps {
  replyToId: string
  discussionId: string
}
