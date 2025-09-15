import type { FC } from 'react'

import { cls } from 'utils/string'

import type { AnchorProps } from './types'

const Anchor: FC<AnchorProps> = ({
  variant = 'contained',
  size = 'medium',
  rel: customRel,
  className,
  ...props
}) => {
  const sizeStyles = {
    small: 'h-6 px-2',
    medium: 'h-8 px-3',
    large: 'h-10 px-4',
  }

  const variantStyles = {
    contained: 'rounded bg-primary-high text-object-high',
  }

  const externalLink = props.href?.startsWith('http') || props.href?.startsWith('//')
  const rel = externalLink ? 'noopener noreferrer' : undefined

  return (
    <a
      className={cls(
        className ?? '',
        sizeStyles[size],
        variantStyles[variant],
        'prose-button grid items-center justify-center gap-1 text-center active:hover:opacity-80 disabled:cursor-not-allowed disabled:bg-surface-disabled disabled:text-object-low',
      )}
      rel={cls(rel ?? '', customRel ?? '')}
      {...props}
    />
  )
}

export default Anchor
