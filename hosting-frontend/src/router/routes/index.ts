import type { RouteRecordRaw } from 'vue-router'

import authorizationRoutes from './authorization.routes'
import dashboardRoutes from './dashboard.routes'

export default [
  ...authorizationRoutes,
  ...dashboardRoutes,
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () => import('@/pages/NotFoundPage.vue'),
  },
] as RouteRecordRaw[]
