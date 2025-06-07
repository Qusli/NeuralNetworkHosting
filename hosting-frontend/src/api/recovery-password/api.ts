import type { AxiosError } from 'axios'

import { api } from '..'
import type { RecoveryPasswordDto } from './dto'
import type {
  ConfirmResponse,
  CreateByEmailResponse,
  RecoveryPasswordResponse,
} from './types'

const PREFIX = 'recovery-password'

export const RecoveryPasswordApi = {
  async createByEmail(email: string): Promise<CreateByEmailResponse> {
    try {
      await api.post(`${PREFIX}/create-by-email`, { email })
      return [true, null]
    } catch (error) {
      console.error(error)
      return [false, error as AxiosError]
    }
  },

  async confirm(code: number): Promise<ConfirmResponse> {
    try {
      await api.post(`${PREFIX}/confirm`, { code })
      return [true, null]
    } catch (error) {
      console.error(error)
      return [false, error as AxiosError]
    }
  },

  async recovery(dto: RecoveryPasswordDto): Promise<RecoveryPasswordResponse> {
    try {
      await api.post(`${PREFIX}/recovery`, dto)
      return [true, null]
    } catch (error) {
      console.error(error)
      return [false, error as AxiosError]
    }
  },
}
