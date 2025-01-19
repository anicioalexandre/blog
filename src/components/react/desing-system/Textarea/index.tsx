import React, { type FC } from 'react'

import { cls } from 'utils/string'

import type { TextareaProps } from './types'

const Textarea: FC<TextareaProps> = ({
  children,
  className,
  error,
  isLoading,
  showError = false,
  isFocused,
  mode = 'default',
  ...props
}) => {
  const modeStyles = {
    default: 'min-h-24',
    compact: 'min-h-[unset] h-[28px] resize-none py-0',
  }

  const modeStylesWithIsFocused = isFocused ? modeStyles.default : modeStyles[mode]

  return (
    <div className="flex rounded border border-surface-border bg-surface-default px-1 pt-2 focus-within:border-surface-active">
      <textarea
        disabled={isLoading}
        {...props}
        className={cls(
          className ?? '',
          modeStylesWithIsFocused,
          'w-full rounded border-none bg-transparent p-2 text-object-high outline-none placeholder:text-sm focus:outline-none disabled:cursor-not-allowed disabled:bg-surface-default disabled:text-surface-disabled',
        )}
      />
    </div>
  )
}

export default Textarea
