import type { AxiosError } from 'axios'

import { api } from '..'
import type { RevokedTokenResponse } from './types'

export const AuthorizationApi = {
  async logout(): Promise<RevokedTokenResponse> {
    try {
      await api.post('/authorization/logout')
      return [true, null]
    } catch (error) {
      console.error(error)
      return [false, error as AxiosError]
    }
  },
}
