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

export default async function fixSubpathNavigation({ router }: AppContext) {
  patchRouterNavigation(router, import.meta.env.BASE_URL)
}
