/// <reference types="astro/client" />

type Runtime = import('@astrojs/cloudflare').Runtime<Env>

interface ImportMetaEnv {
  readonly PUBLIC_GITHUB_OAUTH_API_URL: string
  readonly PUBLIC_GITHUB_GRAPHQL_API_URL: string
  readonly GITHUB_PERSONAL_TOKEN: string
  readonly GITHUB_APP_CLIENT_SECRET: string
  readonly GITHUB_APP_CLIENT_ID: string
  readonly GITHUB_APP_ID: string
  readonly GITHUB_INSTALLATION_ID: string
  readonly GITHUB_APP_REDIRECT_URI: string
  readonly GITHUB_APP_PRIVATE_KEY: string
  readonly PUBLIC_WEBSITE_URL: string
  readonly PUBLIC_WEBSITE_DOMAIN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare namespace App {
  interface Locals extends Runtime {}
}
