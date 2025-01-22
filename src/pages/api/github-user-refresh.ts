import type { APIRoute } from 'astro'

import {
  GITHUB_USER_LOGGED_IN,
  GITHUB_USER_REFRESH_TOKEN,
  GITHUB_USER_TOKEN,
} from 'constants/cookie'
import type { GitHubOauthErrorResponse, GitHubOauthSuccessResponse } from 'types/api'
import { deleteAstroSecureCookie, setCookie, setSecureCookie } from 'utils/api'

export const POST: APIRoute = async ({ cookies, locals }) => {
  const { env } = locals.runtime

  const refreshToken = cookies.get(GITHUB_USER_REFRESH_TOKEN)?.value

  if (!refreshToken) {
    return new Response('Missing refreshToken cookie', { status: 401 })
  }

  const gitHubHeaders = new Headers()
  gitHubHeaders.append('Content-Type', 'application/json')
  gitHubHeaders.append('Accept', 'application/json')

  const response = await fetch(`${env.PUBLIC_GITHUB_OAUTH_API_URL}/access_token`, {
    method: 'POST',
    headers: gitHubHeaders,
    body: JSON.stringify({
      client_id: env.GITHUB_APP_CLIENT_ID,
      client_secret: env.GITHUB_APP_CLIENT_SECRET,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  })

  if (!response.ok) {
    deleteAstroSecureCookie(cookies, GITHUB_USER_TOKEN)
    deleteAstroSecureCookie(cookies, GITHUB_USER_REFRESH_TOKEN)
    deleteAstroSecureCookie(cookies, GITHUB_USER_LOGGED_IN)

    return new Response(`GitHub OAuth refresh error: ${response.statusText}`, {
      status: response.status,
    })
  }

  const json: GitHubOauthSuccessResponse | GitHubOauthErrorResponse = await response.json()

  const isErrorResponse = (
    json: GitHubOauthSuccessResponse | GitHubOauthErrorResponse,
  ): json is GitHubOauthErrorResponse => {
    return (json as GitHubOauthErrorResponse).error !== undefined
  }

  if (isErrorResponse(json)) {
    if (json.error === 'bad_refresh_token') {
      deleteAstroSecureCookie(cookies, GITHUB_USER_TOKEN)
      deleteAstroSecureCookie(cookies, GITHUB_USER_REFRESH_TOKEN)
      deleteAstroSecureCookie(cookies, GITHUB_USER_LOGGED_IN)
      return new Response('Invalid refresh token', { status: 401 })
    }
    return new Response(`GitHub OAuth refresh error: ${json.error}`)
  }

  const { access_token: newAccessToken, refresh_token: newRefreshToken } = json

  const responseHeaders = new Headers()

  setSecureCookie({ headers: responseHeaders, key: GITHUB_USER_TOKEN, value: newAccessToken })
  setSecureCookie({
    headers: responseHeaders,
    key: GITHUB_USER_REFRESH_TOKEN,
    value: newRefreshToken,
  })
  setCookie({ headers: responseHeaders, key: GITHUB_USER_LOGGED_IN, value: '1' })
  responseHeaders.append('Content-Type', 'application/json')

  return new Response(
    JSON.stringify({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    }),
    { headers: responseHeaders },
  )
}

type RefreshTokenResponse = {
  accessToken: string
  refreshToken: string
} | null

export const fetchGitHubUserRefresh = async (): Promise<RefreshTokenResponse> => {
  const response = await fetch(`${import.meta.env.PUBLIC_WEBSITE_URL}/api/github-user-refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  })

  if (!response.ok) {
    return null
  }

  return response.json()
}
