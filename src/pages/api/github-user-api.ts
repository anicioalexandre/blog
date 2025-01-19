import type { APIRoute } from 'astro'
import type { GraphQLResponse, RequestParameters, Variables } from 'relay-runtime'

import { GITHUB_USER_TOKEN } from '../../../constants/cookie'

export const POST: APIRoute = async ({ cookies, locals, request }) => {
  const { env } = locals.runtime

  const graphqlHeaders = new Headers()

  const headerAuth = request.headers.get('Authorization')

  if (headerAuth) {
    graphqlHeaders.append('Authorization', headerAuth)
  } else {
    const accessToken = cookies.get(GITHUB_USER_TOKEN)?.value
    graphqlHeaders.append('Authorization', `Bearer ${accessToken}`)
  }

  graphqlHeaders.append('Accept', 'application/vnd.github.v4+json')
  graphqlHeaders.append('Content-Type', 'application/json')
  graphqlHeaders.append('User-Agent', 'GitHub-App-GraphQL-Proxy')

  const requestJson = await request.json()

  const graphqlResponse = await fetch(env.PUBLIC_GITHUB_GRAPHQL_API_URL, {
    method: 'POST',
    headers: graphqlHeaders,
    body: JSON.stringify(requestJson),
  })

  if (!graphqlResponse.ok) {
    return new Response(`GitHub API error: ${graphqlResponse.statusText}`, {
      status: graphqlResponse.status,
    })
  }

  const workerJson = await graphqlResponse.json()

  const workerHeaders = new Headers()
  // setCorsHeaders(workerHeaders)
  workerHeaders.append('Content-Type', 'application/json')

  return new Response(JSON.stringify(workerJson), {
    headers: workerHeaders,
  })
}

export const fetchGitHubUserApi = async (
  request: RequestParameters,
  variables: Variables,
  customHeaders?: Headers,
): Promise<GraphQLResponse | Response> => {
  const headers = customHeaders ?? new Headers()
  headers.append('Content-Type', 'application/json')

  const response = await fetch(`${import.meta.env.PUBLIC_WEBSITE_URL}/api/github-user-api`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query: request.text,
      variables,
    }),
  })

  return response
}
