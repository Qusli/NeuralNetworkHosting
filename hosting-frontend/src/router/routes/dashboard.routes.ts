import type { RouteRecordRaw } from 'vue-router'

import { ROUTES } from '@/constants'

export default [
  {
    path: '/dashborad',
    component: () => import('@/templates/MainTempalte.vue'),
    meta: {
      isAuthPage: false,
    },
    children: [
      {
        path: ROUTES.DASHBOARD.HOSTING_LIST.PATH,
        name: ROUTES.DASHBOARD.HOSTING_LIST.NAME,
        component: () =>
          import(
            '@/pages/Dashboard/HostingListPage/components/HostingListPage.vue'
          ),
      },
      {
        path: ROUTES.DASHBOARD.HOSTING.PATH,
        name: ROUTES.DASHBOARD.HOSTING.NAME,
        component: () =>
          import(
            '@/pages/Dashboard/HostingPage/components/HostingPage.vue'
          ),
      },
      {
        path: ROUTES.DASHBOARD.INTEGRATION_LIST.PATH,
        name: ROUTES.DASHBOARD.INTEGRATION_LIST.NAME,
        component: () =>
          import(
            '@/pages/Dashboard/IntegrationListPage/components/IntegrationListPage.vue'
          ),
      },
      {
        path: ROUTES.DASHBOARD.SETTINGS.PATH,
        name: ROUTES.DASHBOARD.SETTINGS.NAME,
        component: () =>
          import('@/pages/Dashboard/SettingsPage/components/SettingsPage.vue'),
      },
      {
        path: ROUTES.DASHBOARD.PROFILE.PATH,
        name: ROUTES.DASHBOARD.PROFILE.NAME,
        component: () =>
          import('@/pages/Dashboard/ProfilePage/components/ProfilePage.vue'),
      },
    ],
  },
] as RouteRecordRaw[]
