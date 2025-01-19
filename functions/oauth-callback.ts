import {
  GITHUB_USER_LOGGED_IN,
  GITHUB_USER_REFRESH_TOKEN,
  GITHUB_USER_TOKEN,
} from '../constants/cookie'
import type { GitHubOauthSuccessResponse } from '../types/api'
import { deleteSecureCookie, setCookie, setSecureCookie, verifyOrigin } from '../utils/api'

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  verifyOrigin(request)

  const url = new URL(request.url)
  const code = url.searchParams.get('code') ?? ''
  const stateParam = url.searchParams.get('state') ?? ''

  let state
  try {
    state = JSON.parse(decodeURIComponent(stateParam))
  } catch (e) {
    return new Response('Invalid state parameter', { status: 400 })
  }
  const { csrfToken, redirectTo } = state

  const tokenInStore = await env.CSRF_TOKENS.get(csrfToken)
  if (!tokenInStore || tokenInStore !== 'valid') {
    return new Response('Invalid or expired CSRF token', { status: 403 })
  }

  await env.CSRF_TOKENS.delete(csrfToken)

  const response = await fetch(`${env.PUBLIC_GITHUB_OAUTH_API_URL}/access_token`, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: env.GITHUB_APP_CLIENT_ID,
      client_secret: env.GITHUB_APP_CLIENT_SECRET,
      code,
      redirect_uri: env.GITHUB_APP_REDIRECT_URI,
      state: stateParam,
    }),
  })

  if (!response.ok) {
    const headers = new Headers()
    deleteSecureCookie({ headers, key: GITHUB_USER_TOKEN })
    deleteSecureCookie({ headers, key: GITHUB_USER_LOGGED_IN })
    return new Response(`GitHub OAuth error: ${response.statusText}`, {
      status: response.status,
      headers,
    })
  }
  const tokenJson: GitHubOauthSuccessResponse = await response.json()

  const { access_token: userAccessToken, refresh_token: userRefreshToken } = tokenJson

  const headers = new Headers()
  setSecureCookie({ headers, key: GITHUB_USER_TOKEN, value: userAccessToken })
  setSecureCookie({ headers, key: GITHUB_USER_REFRESH_TOKEN, value: userRefreshToken })
  setCookie({ headers, key: GITHUB_USER_LOGGED_IN, value: '1' })

  const redirectUrl = `${env.PUBLIC_WEBSITE_URL}${redirectTo ?? '/'}`
  headers.set('Location', redirectUrl || '/')
  return new Response(null, { status: 302, headers })
}
