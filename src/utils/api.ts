import type { AstroCookies } from 'astro'
import type { ErrorCode } from 'types/error'

type SetCookieParams = {
  headers: Headers
  key: string
  value: string
}

export const setSecureCookie = ({ headers, key, value }: SetCookieParams) => {
  headers.append('Set-Cookie', `${key}=${value}; HttpOnly; Secure; Path=/; SameSite=Lax`)
}

export const setCookie = ({ headers, key, value }: SetCookieParams) => {
  headers.append('Set-Cookie', `${key}=${value}; Secure; Path=/; SameSite=Lax`)
}

type DeleteSecureCookieParams = {
  headers: Headers
  key: string
}
export const deleteSecureCookie = ({ headers, key }: DeleteSecureCookieParams) => {
  headers.append(
    'Set-Cookie',
    `${key}=deleted; HttpOnly; Secure; Path=/; SameSite=Lax; Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
  )
}

export const deleteAstroSecureCookie = (cookies: AstroCookies, key: string) => {
  cookies.delete(key, { httpOnly: true, sameSite: 'lax', secure: true, path: '/' })
}

export const setCorsHeaders = (headers: Headers) => {
  headers.append('Access-Control-Allow-Origin', '*')
  headers.append('Access-Control-Allow-Methods', 'POST, OPTIONS')
  headers.append('Access-Control-Allow-Headers', 'Content-Type')
}

export const verifyOrigin = (request: Request) => {
  if (request.headers.get('Origin') !== process.env.PUBLIC_WEBSITE_URL) {
    return new Response('Forbidden', { status: 403 })
  }
}

export const parseCookies = (request: Request) => {
  const cookieHeader = request.headers.get('Cookie')

  const cookies: Record<string, string> = {}

  if (!cookieHeader) return cookies

  cookieHeader.split(';').forEach((cookie) => {
    const [key, value] = cookie.split('=').map((part) => part.trim())
    if (key && value) {
      cookies[key] = decodeURIComponent(value)
    }
  })

  return cookies
}

export const isResponseInstance = (response: any): response is Response =>
  response instanceof Response

type CreateErrorRedirectParams = {
  errorCode: ErrorCode
  baseUrl?: string
  headers?: Headers
}
export const createErrorRedirect = ({
  errorCode,
  baseUrl = '',
  headers = new Headers(),
}: CreateErrorRedirectParams): Response => {
  const errorUrl = new URL('/error', baseUrl || 'http://localhost')
  errorUrl.searchParams.set('code', errorCode)

  headers.set('Location', errorUrl.toString())
  return new Response(null, { status: 302, headers })
}
