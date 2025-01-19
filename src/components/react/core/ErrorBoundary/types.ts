import type { ReactNode } from 'react'

import type { ErrorBoundaryProps as ReactErrorBoundaryProps } from 'react-error-boundary'

export type ErrorBoundaryProps = Omit<ReactErrorBoundaryProps, 'children'> & {
  children: ReactNode
}
