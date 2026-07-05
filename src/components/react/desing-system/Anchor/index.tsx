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
    small: 'h-6 px-2 text-[11px]',
    medium: 'h-8 px-3 text-[11px]',
    large: 'h-10 px-5 text-base',
  }

  const variantStyles = {
    contained: 'bg-primary-main text-object-contrast',
  }

  const externalLink = props.href?.startsWith('http') || props.href?.startsWith('//')
  const rel = externalLink ? 'noopener noreferrer' : undefined

  return (
    <a
      className={cls(
        className ?? '',
        sizeStyles[size],
        variantStyles[variant],
        'grid select-none items-center justify-center gap-1 rounded-none border-2 border-ink text-center text-xs font-bold no-underline shadow-retro-sm transition-none focus-visible:outline-dotted focus-visible:outline-1 focus-visible:outline-offset-[-4px] focus-visible:outline-ink active:translate-x-[2px] active:translate-y-[2px] active:shadow-none',
      )}
      rel={cls(rel ?? '', customRel ?? '')}
      {...props}
    />
  )
}

export default Anchor
