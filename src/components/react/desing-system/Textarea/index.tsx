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
    <div className="win-sunken flex px-1 pt-2">
      <textarea
        disabled={isLoading}
        {...props}
        className={cls(
          className ?? '',
          modeStylesWithIsFocused,
          'w-full rounded-none border-none bg-transparent p-2 text-object-high outline-none placeholder:text-sm focus:outline-none disabled:cursor-not-allowed disabled:bg-transparent disabled:text-surface-disabled',
        )}
      />
    </div>
  )
}

export default Textarea
