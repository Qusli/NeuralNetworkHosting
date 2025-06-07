import type { RouteRecordRaw } from 'vue-router'

import { ROUTES } from '@/constants'

export default [
  {
    path: '/authorization',
    component: () => import('@/templates/AuthorizationTemplate.vue'),
    meta: {
      isAuthPage: true,
    },
    children: [
      {
        path: ROUTES.AUTHORIZATION.SIGN_IN.PATH,
        name: ROUTES.AUTHORIZATION.SIGN_IN.NAME,
        component: () =>
          import('@/pages/Authorization/SignInPage/components/SignInPage.vue'),
      },
      {
        path: ROUTES.AUTHORIZATION.SIGN_UP.PATH,
        name: ROUTES.AUTHORIZATION.SIGN_UP.NAME,
        component: () =>
          import('@/pages/Authorization/SignUpPage/components/SignUpPage.vue'),
      },
      {
        path: ROUTES.AUTHORIZATION.CREATE_WORKPLACE.PATH,
        name: ROUTES.AUTHORIZATION.CREATE_WORKPLACE.NAME,
        component: () =>
          import(
            '@/pages/Authorization/CreateWorkplacePage/components/CreateWorkplacePage.vue'
          ),
      },
      {
        path: ROUTES.AUTHORIZATION.SELECT_WORKPLACE.PATH,
        name: ROUTES.AUTHORIZATION.SELECT_WORKPLACE.NAME,
        component: () =>
          import(
            '@/pages/Authorization/SelectWorkplacePage/components/SelectWorkplacePage.vue'
          ),
      },
      {
        path: ROUTES.AUTHORIZATION.PASSWORD_RECOVERY.PATH,
        name: ROUTES.AUTHORIZATION.PASSWORD_RECOVERY.NAME,
        component: () =>
          import(
            '@/pages/Authorization/PasswordRecoveryPage/components/PasswordRecoveryPage.vue'
          ),
      },
    ],
  },
] as RouteRecordRaw[]
