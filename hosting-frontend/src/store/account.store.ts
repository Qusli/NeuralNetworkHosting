import { AccountsApi, type IAccount } from '@/api/accounts'
import { defineStore } from 'pinia'

import type { IAccountState } from '@/types'
import { useWorkplacesStore } from './workplaces.store'

export const useAccountStore = defineStore('account-store', {
  state: (): IAccountState => ({
    account: null,
  }),
  getters: {
    accountEmpty: (state): boolean => {
      return !state.account?.id
    },

    firstUpperWordEmail: (state): string => {
      return state.account?.email[0]?.toUpperCase() || ''
    },

    isOwner: (state): boolean => {
      return state.account?.id === useWorkplacesStore().currentWorkplace?.owner.id
    }
  },
  actions: {
    setAccount(account: IAccount): void {
      this.account = account
    },

    /* API */
    async loadByToken(): Promise<void> {
      const [account, error] = await AccountsApi.loadByToken()

      if (error) {
        return
      }

      this.account = account
    },

    async loadAccount(id: number): Promise<void> {
      const [account, error] = await AccountsApi.getById(id)

      if (error) {
        return
      }

      this.account = account
    },
    /* END API */
  },
})
