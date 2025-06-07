import type { AxiosError } from 'axios'

import { api } from '..'
import type { UpdateAccountDto } from './dto/update-account.dto'
import type {
  GetByIdResponse,
  LoadByTokenResponse,
  UpdateResponse,
} from './types'
import type { UpdatePasswordAccountResponse } from './types/update-password-account-response.type'

const PREFIX: string = 'accounts'

export const AccountsApi = {
  async loadByToken(): Promise<LoadByTokenResponse> {
    try {
      const account = await api
        .get(`/${PREFIX}/load-by-token`)
        .then((r) => r.data)

      return [account, null]
    } catch (error) {
      console.error(error)

      return [null, error]
    }
  },

  async getById(id: number): Promise<GetByIdResponse> {
    try {
      const account = await api
        .get(`/${PREFIX}/by-account-id`, {
          params: {
            accountId: id,
          },
        })
        .then((r) => r.data)

      return [account, null]
    } catch (error) {
      console.error(error)

      return [null, error]
    }
  },

  async update(dto: UpdateAccountDto): Promise<UpdateResponse> {
    try {
      await api.put(`/${PREFIX}/update`, dto)

      return [true, null]
    } catch (error) {
      console.error(error)

      return [false, error]
    }
  },

  async updatePassword(
    dto: UpdateAccountDto,
  ): Promise<UpdatePasswordAccountResponse> {
    try {
      await api.put(`/${PREFIX}/update/password`, dto)

      return [true, null]
    } catch (error) {
      console.error(error)

      return [false, error as AxiosError]
    }
  },
}
