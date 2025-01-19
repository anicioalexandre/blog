import { type FC } from 'react'

import ReactRelayProvider from 'graphql/ReactRelayProvider'

import ErrorBoundary from '../ErrorBoundary'

const withProviders = <Props extends object>(Component: FC<Props>) => {
  return (props: Props) => {
    return (
      <ErrorBoundary>
        <ReactRelayProvider>
          <Component {...props} />
        </ReactRelayProvider>
      </ErrorBoundary>
    )
  }
}

export default withProviders
