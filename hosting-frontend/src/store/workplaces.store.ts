import { type IWorkplace, WorkplacesApi } from '@/api/workplaces'
import { defineStore } from 'pinia'

import type { IWorkplaceState } from '@/types'

import { useAccountStore } from './account.store'
import { useUsersStore } from './users.store'

export const useWorkplacesStore = defineStore('workplaces-store', {
  state: (): IWorkplaceState => ({
    workplaces: {
      items: [],
      current: null,
    },
    isLoading: false,
  }),
  getters: {
    workplacesEmpty: (state): boolean => {
      return !state.workplaces.items.length
    },

    currentWorkplaceEmpty: (state): boolean => {
      return !state.workplaces.current?.id
    },

    workplaceIdLocalStorageEmpty: (): boolean => {
      return !localStorage.getItem('workplace-id')
    },

    currentWorkplace: (state): IWorkplace | null => {
      return state.workplaces.current
    }
  },
  actions: {
    async init() {
      this.isLoading = true

      await useUsersStore().loadCurrentUser()

      this.isLoading = false
    },

    selectWorkplace(workplace: IWorkplace): void {
      this.setWorkplace(workplace)
      this.setWorkplaceIdInLocalStorage(workplace.id)
    },

    setWorkplaces(workplaces: IWorkplace[]): void {
      this.workplaces.items = workplaces
    },

    setWorkplace(workplace: IWorkplace): void {
      this.workplaces.current = workplace
    },

    setWorkplaceIdInLocalStorage(id: number): void {
      localStorage.setItem('workplace-id', JSON.stringify(id))
    },

    clearWorkplaceIdInLocalStorage(): void {
      localStorage.removeItem('workplace-id')
    },

    /* API */
    async loadWorkplaces(): Promise<void> {
      this.isLoading = true

      const accountStore = useAccountStore()

      const [workplaces, error] = await WorkplacesApi.getAll(
        accountStore.account!.id,
      )

      if (!workplaces || error) {
        this.isLoading = false
        return
      }

      this.setWorkplaces(workplaces)

      this.isLoading = false
    },

    async loadWorkplaceByLocalStorage(): Promise<void> {
      this.isLoading = true

      const id: number = +JSON.parse(
        localStorage.getItem('workplace-id') || '0',
      )

      const [workplace, error] = await WorkplacesApi.getById(id)

      if (error) {
        const status = error?.status

        if (status === 403) {
          this.clearWorkplaceIdInLocalStorage()
        }

        this.isLoading = false
        return
      }

      this.setWorkplace(workplace as IWorkplace)

      this.isLoading = false
    },

    async deleteWorkplace(): Promise<void> {},
    /* END API */
  },
})
