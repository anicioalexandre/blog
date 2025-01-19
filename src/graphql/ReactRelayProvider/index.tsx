import React, { type FC, type PropsWithChildren } from 'react'

import useEnvironment from 'graphql/useEnviroment'
import Relay from 'react-relay'

const ReactRelayProvider: FC<PropsWithChildren> = ({ children }) => {
  const environment = useEnvironment()

  return (
    <Relay.RelayEnvironmentProvider environment={environment}>
      {children}
    </Relay.RelayEnvironmentProvider>
  )
}

export default ReactRelayProvider
