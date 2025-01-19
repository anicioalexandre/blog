import {
  type CacheConfig,
  Environment,
  Network,
  QueryResponseCache,
  RecordSource,
  type RequestParameters,
  Store,
  type UploadableMap,
  type Variables,
} from 'relay-runtime'

import type { FetchOptions } from '../../types/relay'
import { httpFetch } from './fetch'

const CACHE_TTL = 5 * 1000
const createQueryCache = () => {
  return new QueryResponseCache({
    size: 100,
    ttl: CACHE_TTL,
  })
}

const createNetwork = (responseCache: QueryResponseCache) => {
  const fetchResponse = async (
    request: RequestParameters,
    variables: Variables,
    cacheConfig: CacheConfig,
    uploadables?: UploadableMap | null,
  ) => {
    const isQuery = request.operationKind === 'query'
    const cacheKey = request.id ?? request.cacheID
    const forceFetch = cacheConfig && cacheConfig.force
    if (responseCache != null && isQuery && !forceFetch) {
      const fromCache = responseCache.get(cacheKey, variables)
      if (fromCache != null) {
        return Promise.resolve(fromCache)
      }
    }

    const fetchOptions = cacheConfig.metadata as FetchOptions | undefined

    return httpFetch(request, variables, fetchOptions)
  }

  // @ts-ignore TODO: check typings
  const network = Network.create(fetchResponse)
  return network
}

const responseCacheByEnvironment = new WeakMap<Environment, QueryResponseCache>()

export const createEnvironment = () => {
  const cache = createQueryCache()
  const network = createNetwork(cache)
  const store = new Store(RecordSource.create())

  const environment = new Environment({
    network,
    store,
    isServer: typeof window === typeof undefined,
  })

  responseCacheByEnvironment.set(environment, cache)

  return environment
}
