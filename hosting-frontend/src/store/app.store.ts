import { AuthorizationApi } from '@/api/authorization/api'
import { defineStore, getActivePinia } from 'pinia'

import type { IErrorResponse } from '@/types'

import { ROUTES } from '@/constants'

import { useAccountStore } from './account.store'
import { useTokenStore } from './token.store'
import { useWorkplacesStore } from './workplaces.store'
import { useHostingsStore } from './hostings.store'
import { NotifyErrorResponse } from '@/classes'

export const useAppStore = defineStore('app-store', {
  state: () => ({
    isLoading: false,
    initited: false,
  }),
  getters: {
    isLoggined: (): boolean => {
      return (
        !useAccountStore().accountEmpty &&
        !useWorkplacesStore().currentWorkplaceEmpty
      )
    },
  },
  actions: {
    async init(): Promise<void> {
      this.isLoading = true

      const tokenStore = useTokenStore()
      const accountStore = useAccountStore()
      const workplacesStore = useWorkplacesStore()
      const hostingsStore = useHostingsStore()

      if (tokenStore.tokenEmpty) {
        tokenStore.loadTokenByStorage()
      }

      if (!tokenStore.tokenEmpty) {
        await accountStore.loadByToken()
      }

      if (!accountStore.accountEmpty) {
        await workplacesStore.loadWorkplaces()
      }

      if (
        !accountStore.accountEmpty &&
        !workplacesStore.workplaceIdLocalStorageEmpty
      ) {
        await workplacesStore.loadWorkplaceByLocalStorage()
      }

      hostingsStore.init()

      this.initited = true

      this.isLoading = false
    },

    async logout(): Promise<void> {
      const [OK, error] = await AuthorizationApi.logout()

      if (error) {
        NotifyErrorResponse.init(error?.response?.data as IErrorResponse).sendNotifyError()
      }

      if (OK) {
        const activePinia = getActivePinia()

        const tokenStore = useTokenStore()
        const workplaceStore = useWorkplacesStore()

        workplaceStore.clearWorkplaceIdInLocalStorage()

        tokenStore.clearTokenInStorage()

        if (activePinia) {
          Object.entries(activePinia.state.value).forEach(
            ([storeName, state]) => {
              const storeDefinition = defineStore(storeName, state)
              const store = storeDefinition(activePinia)
              store.$reset()
            },
          )
        }

        await this.$router.push(ROUTES.AUTHORIZATION.SIGN_IN.PATH)
      }
    },
  },
})
