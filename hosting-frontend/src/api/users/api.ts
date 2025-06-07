import type { AxiosError } from 'axios'

import { api } from '..'
import type { UpdateUserDto } from './dto'
import type { IUser } from './interfaces/user.interface'
import type { LoadCurrentUserResponse, LoadUserResponse, LoadUsersResponse, SearchByEmailResponse, UpdateUserResponse } from './types'

const PREFIX = 'users'

export const UsersApi = {
  async loadUsers(workplaceId: number): Promise<LoadUsersResponse> {
    try {
      const users: IUser[] = await api
        .get(`${PREFIX}/all/by-workplace-id`, {
          params: { workplaceId },
        })
        .then((r) => r.data)

      return [users, null]
    } catch (error) {
      console.error(error)
      return [null, error as AxiosError]
    }
  },

  async loadUserById(userId: number): Promise<LoadUserResponse> {
    try {
      const user: IUser = await api
        .get(`${PREFIX}/by-user-id`, {
          params: { userId },
        })
        .then((r) => r.data)

      return [user, null]
    } catch (error) {
      console.error(error)
      return [null, error as AxiosError]
    }
  },

  async searchByEmail(email: string): Promise<SearchByEmailResponse> {
    try {
      const users: IUser[] = await api.get(`${PREFIX}/search/by-email`, {
        params: { email }
      }).then(r => r.data)

      return [users, null]
    } catch (error) {
      console.error(error)
      return [null, error as AxiosError]
    }
  },

  async loadCurrentUser(workplaceId: number): Promise<LoadCurrentUserResponse> {
    try {
      const user: IUser = await api
        .get(`${PREFIX}/current`, {
          params: { workplaceId },
        })
        .then((r) => r.data)

      return [user, null]
    } catch (error) {
      console.error(error)
      return [null, error as AxiosError]
    }
  },

  async update(dto: UpdateUserDto): Promise<UpdateUserResponse> {
    try {
      await api.put(`${PREFIX}/update`, dto)
      return [true, null]
    } catch (error) {
      console.error(error)
      return [false, error as AxiosError]
    }
  },
}
