import { useMemo, useRef } from 'react'

import { createEnvironment } from 'graphql/enviroment'
import type { Environment } from 'relay-runtime'

const useEnvironment = () => {
  const relayEnvironment = useRef<Environment | null>(null)

  const initEnvironment = () => {
    // For SSR always return new environment;
    if (typeof window === typeof undefined) {
      return createEnvironment()
    }

    // For client, reuse existing environment or create new one
    if (!relayEnvironment.current) {
      relayEnvironment.current = createEnvironment()
    }

    return relayEnvironment.current
  }

  const env = useMemo(initEnvironment, [])

  return env
}

export default useEnvironment
