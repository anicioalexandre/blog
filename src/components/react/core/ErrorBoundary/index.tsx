import type { FC } from 'react'

import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'

import DefaultFallback from './DefaultFallback'
import type { ErrorBoundaryProps } from './types'

const ErrorBoundary: FC<ErrorBoundaryProps> = ({ fallback, children }) => {
  const fallbackWithDefault = fallback ?? <DefaultFallback />

  return <ReactErrorBoundary fallback={fallbackWithDefault}>{children}</ReactErrorBoundary>
}

export default ErrorBoundary
