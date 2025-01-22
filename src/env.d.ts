/// <reference types="astro/client" />

type Runtime = import('@astrojs/cloudflare').Runtime<Env>

interface ImportMeta {
  readonly env: Env
}

declare namespace App {
  interface Locals extends Runtime {}
}
