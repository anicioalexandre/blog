import type { DetailedHTMLProps, PropsWithChildren, TextareaHTMLAttributes } from 'react'

import type { GetInputProps } from 'hooks/useReactForm/types'

type TextareaMode = 'default' | 'compact'

export interface TextareaProps
  extends PropsWithChildren,
    Omit<
      DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>,
      'onChange' | 'value' | 'onBlur'
    >,
    GetInputProps<string> {
  isLoading: boolean
  showError?: boolean
  isFocused?: boolean
  mode?: TextareaMode
}
