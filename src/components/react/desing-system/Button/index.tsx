import type { FC } from 'react'

import { cls } from 'utils/string'

import type { ButtonProps } from './types'

const Button: FC<ButtonProps> = ({
  variant = 'contained',
  size = 'medium',
  className,
  ...props
}) => {
  const sizeStyles = {
    small: 'h-7 px-2 text text-sm font-bold',
    medium: 'h-8 px-3',
    large: 'h-10 px-4 text-lg',
  }

  const variantStyles = {
    contained: 'bg-primary-high text-object-high',
    text: 'text-primary-high bg-transparent disabled:bg-transparent',
  }

  return (
    <button
      className={cls(
        className ?? '',
        sizeStyles[size],
        variantStyles[variant],
        'prose-button grid items-center justify-center gap-1 rounded text-center active:hover:opacity-80 disabled:cursor-not-allowed disabled:bg-surface-disabled disabled:text-object-low',
      )}
      {...props}
    />
  )
}

export default Button
