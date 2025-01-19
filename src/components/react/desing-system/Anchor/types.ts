import type { AnchorHTMLAttributes } from 'react'

type AnchorVariants = 'contained'
type AnchorSizes = 'small' | 'medium' | 'large'

export interface AnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  size?: AnchorSizes
  variant?: AnchorVariants
}
