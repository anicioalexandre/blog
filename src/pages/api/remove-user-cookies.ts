import type { APIRoute } from 'astro'

import {
  GITHUB_USER_LOGGED_IN,
  GITHUB_USER_REFRESH_TOKEN,
  GITHUB_USER_TOKEN,
} from 'constants/cookie'
import { deleteAstroSecureCookie } from 'utils/api'

export const POST: APIRoute = async ({ cookies }) => {
  deleteAstroSecureCookie(cookies, GITHUB_USER_TOKEN)
  deleteAstroSecureCookie(cookies, GITHUB_USER_REFRESH_TOKEN)
  deleteAstroSecureCookie(cookies, GITHUB_USER_LOGGED_IN)

  return new Response('Successfully removed user cookies')
}

export const removeUserCookies = async () => {
  const response = await fetch(`${import.meta.env.PUBLIC_WEBSITE_URL}/api/remove-user-cookies`, {
    method: 'POST',
  })

  return response
}
