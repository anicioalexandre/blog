import { z } from 'zod'

import type { CommentCreateForm } from './types'

export const INITIAL_VALUES: CommentCreateForm = {
  body: '',
}

export const VALIDATION_SCHEMA = z.object({
  body: z.string().min(1, 'Comment cannot be empty'),
})
