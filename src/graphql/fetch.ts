import { fetchGitHubUserApi } from 'pages/api/github-user-api'
import { fetchGitHubUserRefresh } from 'pages/api/github-user-refresh'
import { type GraphQLResponse, type RequestParameters, type Variables } from 'relay-runtime'

import type { FetchOptions } from 'types/relay'
import { isResponseInstance } from 'utils/api'
import { triggerPossibleCookieChangeEvent } from 'utils/event'

const fetchGitHubAsUser = async (request: RequestParameters, variables: Variables) => {
  let response = await fetchGitHubUserApi(request, variables)

  if (isResponseInstance(response) && response?.status === 401) {
    const refreshResponse = await fetchGitHubUserRefresh()
    triggerPossibleCookieChangeEvent()

    if (refreshResponse) {
      const headers = new Headers()
      headers.append('Authorization', `Bearer ${refreshResponse.accessToken}`)
      response = await fetchGitHubUserApi(request, variables, headers)
    }
  }

  if (isResponseInstance(response) && !response.ok) {
    return {
      data: {},
      errors: [
        {
          message: `GitHub API error: ${response.status} ${response.statusText}`,
        },
      ],
    }
  }

  return response
}

const fetchGitHubAsApp = async (
  request: RequestParameters,
  variables: Variables,
): Promise<GraphQLResponse | Response> => {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')

  const response = await fetch(`${import.meta.env.PUBLIC_WEBSITE_URL}/api/github-app-api`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query: request.text,
      variables,
    }),
  })

  return response
}

export const httpFetch = async (
  request: RequestParameters,
  variables: Variables,
  fetchOptions: FetchOptions | undefined,
) => {
  const { mode = 'app' } = fetchOptions || {}

  const fetchFunction = {
    user: fetchGitHubAsUser,
    app: fetchGitHubAsApp,
  }

  const response = await fetchFunction[mode](request, variables)

  // @ts-ignore TODO: check typings
  if (response.errors) {
    return response
  }

  // @ts-ignore TODO: check typings
  const json: GraphQLResponse = await response.json()

  return json
}
