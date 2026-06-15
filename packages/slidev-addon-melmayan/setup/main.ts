import type { AppContext } from '@slidev/types'
import type { RouteLocationRaw, Router } from 'vue-router'

/**
 * Slidev's getSlidePath() returns `${BASE_URL}${no}` (e.g. `/clickjacking/2`), but the
 * router is already created with createWebHistory(BASE_URL). Passing the prefixed path
 * to router.push/replace produces `/clickjacking/clickjacking/2`.
 */
function stripBaseFromRoute(to: RouteLocationRaw, basePath: string): RouteLocationRaw {
  const base = basePath.replace(/\/$/, '')
  if (!base || base === '/')
    return to

  const prefix = `${base}/`

  if (typeof to === 'string') {
    return to.startsWith(prefix) ? to.slice(base.length) || '/' : to
  }

  if (!to.path?.startsWith(prefix))
    return to

  const path = to.path.slice(base.length) || '/'
  return { ...to, path }
}

function patchRouterNavigation(router: Router, basePath: string) {
  for (const method of ['push', 'replace'] as const) {
    const navigate = router[method].bind(router)
    router[method] = ((to, ...args) =>
      navigate(stripBaseFromRoute(to, basePath), ...args)) as Router[typeof method]
  }
}

function withBaseUrl(path: string, basePath: string) {
  const base = basePath.replace(/\/$/, '')
  if (!base || base === '/')
    return path
  return `${base}${path}`
}

/**
 * Presenter notes load from `/__slidev/slides/:no.json`, but Slidev's client
 * omits BASE_URL. Under `pnpm dev` (home proxy) or `--base /<slug>/` that 404s.
 */
function patchSlidevApiFetch(basePath: string) {
  const base = basePath.replace(/\/$/, '')
  if (!base || base === '/')
    return

  const originalFetch = window.fetch.bind(window)
  window.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
    if (typeof input === 'string' && input.startsWith('/__slidev/'))
      return originalFetch(withBaseUrl(input, basePath), init)

    if (input instanceof Request) {
      const url = new URL(input.url)
      if (url.pathname.startsWith('/__slidev/')) {
        const prefixed = withBaseUrl(url.pathname, basePath) + url.search
        return originalFetch(new Request(prefixed, input), init)
      }
    }

    return originalFetch(input, init)
  }
}

export default async function fixSubpathNavigation({ router }: AppContext) {
  const base = import.meta.env.BASE_URL
  patchRouterNavigation(router, base)
  patchSlidevApiFetch(base)
}
