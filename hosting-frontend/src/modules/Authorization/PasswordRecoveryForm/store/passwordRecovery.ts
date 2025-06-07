import { defineStore } from 'pinia'

import { Validation } from '@/classes'

import type { PasswordRecoveryState } from '../types'

export const usePasswordRecoveryStore = defineStore('password-recovery-store', {
  state: (): PasswordRecoveryState => ({
    data: {
      code: 0,
      email: '',
      password: '',
      repeatPassword: '',
    },
  }),
  getters: {},
  actions: {
    passwordValidation() {
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
  },
})
