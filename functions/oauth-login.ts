import { verifyOrigin } from '../utils/api'

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  verifyOrigin(request)

  const clientId = env.GITHUB_APP_CLIENT_ID
  const redirectUri = env.GITHUB_APP_REDIRECT_URI
  const redirectTo = new URL(request.url).searchParams.get('redirect_to') || '/'
  const csrfToken = crypto.randomUUID()

  await env.CSRF_TOKENS.put(csrfToken, 'valid', { expirationTtl: 3600 })

  const state = encodeURIComponent(
    JSON.stringify({
      csrfToken,
      redirectTo,
    }),
  )

  const githubAuthUrl = new URL(`${env.GITHUB_OAUTH_API_URL}/authorize`)
  githubAuthUrl.searchParams.set('client_id', clientId)
  githubAuthUrl.searchParams.set('redirect_uri', redirectUri)
  githubAuthUrl.searchParams.set('scope', 'read:discussion write:discussion')
  githubAuthUrl.searchParams.set('state', state)

  return Response.redirect(githubAuthUrl.toString(), 302)
}
