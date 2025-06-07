import type { AxiosError } from 'axios'

import { api } from '..'
import type { CreateWorkplaceDto } from './dto'
import type {
  CreateWorkplaceResponse,
  WorkplaceGetByIdResponse,
  WorkplacesGetAllResponse,
} from './types'
import type { DeleteResponse } from './types/delete-response.type'

const PREFIX: string = 'workplaces'

export const WorkplacesApi = {
  async getAll(accountId: number): Promise<WorkplacesGetAllResponse> {
    try {
      const workplaces = await api
        .get(`${PREFIX}/all`, {
          params: {
            accountId,
          },
        })
        .then((r) => r.data)

      return [workplaces, null]
    } catch (error) {
      console.error(error)

      return [null, error as AxiosError]
    }
  },

  async getById(id: number): Promise<WorkplaceGetByIdResponse> {
    try {
      const workplace = await api
        .get(`${PREFIX}/by-workplace-id`, {
          params: { workplaceId: id },
        })
        .then((r) => r.data)

      return [workplace, null]
    } catch (error) {
      console.error(error)

      return [null, error as AxiosError]
    }
  },

  async create(dto: CreateWorkplaceDto): Promise<CreateWorkplaceResponse> {
    try {
      const workplaceId: number = await api
        .post(`${PREFIX}/create`, dto)
        .then((r) => r.data)

      return [workplaceId, null]
    } catch (error) {
      console.error(error)
      return [null, error as AxiosError]
    }
  },

  async update() {},

  async delete(workplaceId: number): Promise<DeleteResponse> {
    try {
      await api.delete(`${PREFIX}/delete`, {
        params: { workplaceId }
      })
      return [true, null]
    } catch (error) {
      console.error(error)
      return [false, error as AxiosError]
    }
  },
}
