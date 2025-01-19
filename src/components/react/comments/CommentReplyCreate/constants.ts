import { z } from 'zod'

import type { CommentReplyCreateForm } from './types'

export const INITIAL_VALUES: CommentReplyCreateForm = {
  body: '',
}

export const VALIDATION_SCHEMA = z.object({
  body: z.string().min(1, 'Comment reply cannot be empty'),
})
