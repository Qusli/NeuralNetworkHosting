import { isEmail } from '@/utils'
import { defineStore } from 'pinia'
import { toast } from 'vue3-toastify'

import type { IErrorResponse, IValidation } from '@/types'

import { useAccountStore } from '@/store/account.store'
import { useTokenStore } from '@/store/token.store'
import { useWorkplacesStore } from '@/store/workplaces.store'

import { Validation } from '@/classes'

import { ROUTES } from '@/constants'

import { signIn } from '../api/api'
import type { ISignInState } from '../types'

export const useSignInStore = defineStore('sign-in-store', {
  state: (): ISignInState => ({
    data: {
      email: '',
      password: '',
      remember: false,
    },
    isLoadign: false,
  }),
  getters: {},
  actions: {
    _validation(): IValidation {
      if (!this.data.email) {
        return new Validation(false, "Email can't be empty")
      }

      if (!isEmail(this.data.email)) {
        return new Validation(false, 'This is not email')
      }

      if (!this.data.password) {
        return new Validation(false, "Password can't be empty")
      }

      return new Validation(true)
    },

    async signIn() {
      this.isLoadign = true

      const validation = this._validation()

      if (!validation.isValid()) {
        toast.error(validation.message)
        this.isLoadign = false
        return
      }

      const [data, err] = await signIn(this.data)

      if (!data || err) {
        const data = err?.response?.data as IErrorResponse

        toast.error(data?.message ?? 'An unexpected error has occurred')

        this.isLoadign = false
        return
      }

      const tokenStore = useTokenStore()

      if (this.data.remember) {
        tokenStore.setTokenInLocalStorage(data.token)
      } else {
        tokenStore.setTokenInSessionStorage(data.token)
      }

      const accountStore = useAccountStore()
      const workplacesStore = useWorkplacesStore()

      accountStore.setAccount(data.account)

      if (workplacesStore.currentWorkplaceEmpty) {
        workplacesStore.setWorkplaces(data.workplaces)
      }

      if (!workplacesStore.workplacesEmpty) {
        await this.$router.push(ROUTES.AUTHORIZATION.SELECT_WORKPLACE.PATH)
      } else {
        await this.$router.push(ROUTES.AUTHORIZATION.CREATE_WORKPLACE.PATH)
      }

      this.isLoadign = false
    },
  },
})
