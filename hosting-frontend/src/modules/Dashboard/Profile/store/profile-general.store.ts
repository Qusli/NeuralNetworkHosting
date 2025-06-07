import { AccountsApi, type UpdatePasswordAccountDto } from '@/api/accounts'
import { defineStore } from 'pinia'
import { toast } from 'vue3-toastify'

import type { IErrorResponse } from '@/types'

import { useAccountStore } from '@/store/account.store'
import { useAppStore } from '@/store/app.store'

import { NotifyErrorResponse, Validation } from '@/classes'

import type { IGeneralSettings } from '../types'

interface State {
  data: IGeneralSettings
  isLoading: boolean
}

export const useProfileGeneralStore = defineStore('profile-general-store', {
  state: (): State => ({
    data: {
      currentPassword: '',
      newPassword: '',
    },
    isLoading: false,
  }),
  getters: {
    canSave: (state): boolean => {
      return !state.data.currentPassword || !state.data.newPassword
    },
  },
  actions: {
    validation(): Validation {
      if (!this.data.currentPassword) {
        return new Validation(false, "Current password can't be empty")
      }

      if (!this.data.newPassword) {
        return new Validation(false, "New password can't be empty")
      }

      return new Validation(true)
    },

    /* API */
    async save(): Promise<void> {
      this.isLoading = true

      const validation = this.validation()

      if (!validation.isValid()) {
        toast.error(validation.message)
        this.isLoading = false
        return
      }

      const appStore = useAppStore()
      const accountStore = useAccountStore()

      const dto: UpdatePasswordAccountDto = {
        id: accountStore.account!.id,
        currentPassword: this.data.currentPassword,
        newPassword: this.data.newPassword,
      }

      const [result, error] = await AccountsApi.updatePassword(dto)

      if (error) {
        NotifyErrorResponse.init(error?.response?.data as IErrorResponse).sendNotifyError()
      }

      if (result) {
        await appStore.logout()
      }

      this.isLoading = false
    },
    /* END API */
  },
})
