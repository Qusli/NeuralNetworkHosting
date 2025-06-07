import type { AxiosError } from "axios"
import { api } from ".."
import type { CreateHostingDto } from "./dto"
import type { IHosting } from "./interfaces"

const PREFIX = "hostings"

export const HostingsApi = {

  async loadHostingsByWorkplaceId(workplaceId: number): Promise<[ hostings: IHosting[] | null, error: AxiosError | null ]> {
    try {
      const hostings = await api.get(`/${PREFIX}/by-workplace-id`, {
        params: { workplaceId }
      }).then(r => r.data)

      return [hostings, null]
    } catch (error) {
      console.error(error)
      return [null, error as AxiosError]
    }
  },

  async loadHostingById(hostingId: number, workplaceId: number): Promise<[ hosting: IHosting | null, error: AxiosError | null ]> {
    try {
      const hosting = await api.get(`/${PREFIX}/by-hosting-id`, {
        params: {
          hostingId,
          workplaceId,
        }
      }).then(r => r.data)

      return [hosting, null]
    } catch (error) {
      console.error(error)
      return [null, error as AxiosError]
    }
  },

  async create(dto: CreateHostingDto): Promise<[ hosting: IHosting | null, error: AxiosError | null ]> {
    try {
      const hosting = await api.post(`/${PREFIX}/create`, dto).then(r => r.data)
      return [hosting, null]
    } catch (error) {
      console.log(error)
      return [null, error as AxiosError]
    }
  }

}