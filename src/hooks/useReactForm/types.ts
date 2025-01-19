import type { ChangeEvent } from 'react'

export type GetInputProps<T> = {
  value: T
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onBlur: () => void
  error?: string
}
