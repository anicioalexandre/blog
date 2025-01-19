import { createAppAuth } from '@octokit/auth-app'

import { setCorsHeaders, verifyOrigin } from '../utils/api'

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
  verifyOrigin(request)

  if (request.method === 'OPTIONS') {
    const headers = new Headers()
    setCorsHeaders(headers)
    return new Response(null, {
      headers,
    })
  }

  if (request.method === 'POST') {
    const requestJson = await request.json()
    let tokenToUse = ''

    const cachedToken = await env.GH_APP.get('gh-app-access-token')
    const cachedExpiry = await env.GH_APP.get('gh-app-access-token-expiry')

    if (cachedToken && cachedExpiry && Date.now() < new Date(cachedExpiry).valueOf()) {
      tokenToUse = cachedToken
    } else {
      const auth = createAppAuth({
        appId: env.GITHUB_APP_ID,
        privateKey: env.GITHUB_APP_PRIVATE_KEY,
        installationId: Number(env.GITHUB_INSTALLATION_ID),
      })
      const { token, expiresAt } = await auth({ type: 'installation' })

      await env.GH_APP.put('gh-app-access-token', token, { expirationTtl: 3600 })
      await env.GH_APP.put('gh-app-access-token-expiry', expiresAt, { expirationTtl: 3600 })

      tokenToUse = token
    }
    const graphqlHeaders = new Headers()
    graphqlHeaders.append('Authorization', `Bearer ${tokenToUse}`)
    graphqlHeaders.append('Accept', 'application/vnd.github.v4+json')
    graphqlHeaders.append('Content-Type', 'application/json')
    graphqlHeaders.append('User-Agent', 'GitHub-App-GraphQL-Proxy')

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
    setCorsHeaders(workerHeaders)
    workerHeaders.append('Content-Type', 'application/json')

    return new Response(JSON.stringify(workerJson), {
      headers: workerHeaders,
    })
  }

  return new Response('Method not allowed', { status: 405 })
}
