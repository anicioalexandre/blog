import type { ButtonHTMLAttributes } from 'react'

type ButtonVariants = 'contained' | 'text'
type ButtonSizes = 'small' | 'medium' | 'large'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSizes
  variant?: ButtonVariants
}
