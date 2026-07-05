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
    small: 'h-7 px-2 text-[11px]',
    medium: 'h-8 px-3 text-[11px]',
    large: 'h-10 px-5 text-base',
  }

  const variantStyles = {
    contained: 'bg-primary-main text-object-contrast',
    text: 'bg-surface-default text-object-high',
  }

  return (
    <button
      className={cls(
        className ?? '',
        sizeStyles[size],
        variantStyles[variant],
        'grid select-none items-center justify-center gap-1 rounded-none border-2 border-ink text-center text-xs font-bold shadow-retro-sm transition-none focus-visible:outline-dotted focus-visible:outline-1 focus-visible:outline-offset-[-4px] focus-visible:outline-ink active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:translate-x-0 disabled:translate-y-0 disabled:cursor-not-allowed disabled:border-object-disabled disabled:bg-surface-disabled disabled:text-object-disabled disabled:shadow-none',
      )}
      {...props}
    />
  )
}

export default Button
