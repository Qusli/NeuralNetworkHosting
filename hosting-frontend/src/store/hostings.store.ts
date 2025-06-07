import {
  type CreateHostingDto,
  HostingsApi,
  type IHosting,
} from '@/api/hostings'
import { defineStore } from 'pinia'

import { useWorkplacesStore } from '@/store/workplaces.store'
import { ROUTES } from '@/constants'
import { NotifyErrorResponse } from '@/classes'
import type { IErrorResponse } from '@/types'

interface State {
  hostings: {
    items: IHosting[]
    current: IHosting | null
  }
  dto: {
    create: CreateHostingDto
  }
  isLoading: boolean
}

interface CreateOptions {
  notifyError: boolean
  redirectToNewHosting: boolean
}

const getEmptyCreateDto = (): CreateHostingDto => ({
  title: '',
  description: '',
  host: '',
  port: 0,
  workplace: {
    id: useWorkplacesStore().currentWorkplace!.id,
  }
})

export const useHostingsStore = defineStore('hostings-store', {
  state: (): State => ({
    hostings: {
      items: [],
      current: null,
    },
    dto: {
      create: {} as CreateHostingDto,
    },
    isLoading: false,
  }),
  getters: {
    currentHosting: (state): IHosting | null => {
      return state.hostings.current
    },

    hostingStatusLabel: (state): { color: string; label: string } => {
      if (state.hostings.current?.status === 1) {
        return {
          color: 'var(--accent-color--hex)',
          label: 'Запускается',
        }
      }

      if (
        state.hostings.current?.status === 2 ||
        state.hostings.current?.status === 4
      ) {
        return {
          color: 'var(--red-color--hex)',
          label: 'Остановлен',
        }
      }

      if (
        state.hostings.current?.status === 3
      ) {
        return {
          color: 'var(--success-color--hex)',
          label: 'Запущен',
        }
      }

      return {
        color: 'var(--red-color--hex)',
        label: 'Неизвестный статус',
      }
    },
  },
  actions: {
    init() {
      const workplacesStore = useWorkplacesStore()

      if (workplacesStore.currentWorkplace?.id) {
        this.dto.create = getEmptyCreateDto()
      }
    },

    getStatusByHosting(hosting: IHosting) {
      if (hosting.status === 1) {
        return {
          color: 'var(--accent-color--hex)',
          label: 'Запускается',
        }
      }

      if (
        hosting.status === 2 ||
        hosting.status === 4
      ) {
        return {
          color: 'var(--red-color--hex)',
          label: 'Остановлен',
        }
      }

      if (
        hosting.status === 3
      ) {
        return {
          color: 'var(--success-color--hex)',
          label: 'Запущен',
        }
      }

      return {
        color: 'var(--red-color--hex)',
        label: 'Неизвестный статус',
      }
    },

    /* API */
    async load() {
      this.isLoading = true

      const workplacesStore = useWorkplacesStore()

      const [hostings] = await HostingsApi.loadHostingsByWorkplaceId(
        workplacesStore.currentWorkplace!.id,
      )

      if (hostings) {
        this.hostings.items = hostings
      }

      this.isLoading = false
    },

    async loadById(hostingId: number) {
      this.isLoading = true

      const workplacesStore = useWorkplacesStore()

      const [hosting] = await HostingsApi.loadHostingById(
        hostingId,
        workplacesStore.currentWorkplace!.id,
      )

      if (hosting) {
        this.hostings.current = hosting
      }

      this.isLoading = false
    },

    async create(options?: Partial<CreateOptions>) {
      this.isLoading = true

      const [hosting, error] = await HostingsApi.create(this.dto.create)

      if (error && options?.notifyError) {
        NotifyErrorResponse.init(error?.response?.data as IErrorResponse).sendNotifyError()
        this.isLoading = false
        return;
      }

      if (hosting) {
        this.hostings.items.push(hosting)
      }

      if (hosting && options?.redirectToNewHosting) {
        this.hostings.current = hosting
        await this.$router.push({ name: ROUTES.DASHBOARD.HOSTING.NAME, query: {
            hostingId: hosting.id
          }
        })
      }

      this.isLoading = false
    },
    /* END API */
  },
})
