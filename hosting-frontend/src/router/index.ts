import { createRouter, createWebHashHistory } from 'vue-router'

import { useTokenStore } from '@/store/token.store'

import { ROUTES } from '@/constants'

import routes from './routes'
import { useInitAuthorization, useInitWorkplace } from '@/api/composables'

const router = createRouter({
  history: createWebHashHistory('#'),
  routes,
})

router.beforeEach(async (to) => {
  const tokenStore = useTokenStore()

  if (tokenStore.tokenEmpty) {
    tokenStore.loadTokenByStorage()
  }

  const isAuthPage = to.meta.isAuthPage as boolean

  console.log('to: ', to.name)

  console.log('isAuthPage: ', isAuthPage)

  // Если текущий роут НЕ является страницей авторизации и пользователь НЕ авторизован, то перебрасываем его на страницу входа.
  if (!isAuthPage && tokenStore.tokenEmpty) {
    return { name: ROUTES.AUTHORIZATION.SIGN_IN.NAME }
  }

  if (isAuthPage) {
    await useInitAuthorization()
  } else {
    await useInitWorkplace()
  }
})

export default router
