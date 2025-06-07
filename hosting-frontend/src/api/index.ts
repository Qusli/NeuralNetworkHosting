import router from '@/router'
import axios from 'axios'

import { useTokenStore } from '@/store/token.store'

import { ROUTES } from '@/constants'

const config = {
  baseURL: `http://${import.meta.env.VITE_SERVER_IP}:${import.meta.env.VITE_SERVER_PORT}`,
  validateStatus(status: number) {
    return status >= 200 && status < 400
  },
}

const api = axios.create(config)

api.interceptors.request.use((request) => {
  const tokenStore = useTokenStore()

  if (tokenStore.tokenEmpty) {
    tokenStore.loadTokenByStorage()
  }

  if (!tokenStore.tokenEmpty) {
    request.headers.Authorization = `Bearer ${tokenStore.token}`
  }

  return request
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.status === 401) {
      const tokenStore = useTokenStore()

      tokenStore.clearTokenInStorage()
      localStorage.removeItem('workplace-id')

      tokenStore.$reset()

      router.push(ROUTES.AUTHORIZATION.SIGN_IN.PATH)
    }

    return Promise.reject(err)
  },
)

export { api }
