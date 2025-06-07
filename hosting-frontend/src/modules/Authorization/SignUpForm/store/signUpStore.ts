import { isEmail } from '@/utils'
import { defineStore } from 'pinia'
import { toast } from 'vue3-toastify'

import type { IErrorResponse, IValidation } from '@/types'

import { useAccountStore } from '@/store/account.store'
import { useTokenStore } from '@/store/token.store'

import { NotifyErrorResponse, Validation } from '@/classes'

import { ROUTES } from '@/constants'

import { signUp } from '../api/api'
import type { ISignUpState } from '../types'

export const useSignUpStore = defineStore('sign-up-store', {
  state: (): ISignUpState => ({
    data: {
      email: '',
      password: '',
      repeatPassword: '',
    },
    isLoading: false,
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

      if (!this.data.repeatPassword) {
        return new Validation(false, "Repeat password can't be empty")
      }

      if (this.data.password !== this.data.repeatPassword) {
        return new Validation(false, 'Password is not compare')
      }

      return new Validation(true)
    },

    async signUp() {
      this.isLoading = true

      const validation = this._validation()

      if (!validation.isValid()) {
        toast.error(validation.message)
        this.isLoading = false
        return
      }

      const [data, error] = await signUp(this.data)

      if (!data || error) {
        NotifyErrorResponse.init(error?.response?.data as IErrorResponse).sendNotifyError()

        this.isLoading = false
        return
      }

      useTokenStore().setTokenInLocalStorage(data.token)
      useAccountStore().setAccount(data.account)

      await this.$router.push(ROUTES.AUTHORIZATION.CREATE_WORKPLACE.PATH)

      this.isLoading = false
    },
  },
})
