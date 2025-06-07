import { defineStore } from 'pinia'

import type { ITokenState } from '@/types/store/token.state'

export const useTokenStore = defineStore('token-store', {
  state: (): ITokenState => ({
    token: null,
  }),
  getters: {
    tokenEmpty: (state): boolean => {
      return !state.token
    },

    tokenInLocalStorage: (): boolean => {
      return !!localStorage.getItem('token')
    },

    tokenInSessionStorage: (): boolean => {
      return !!sessionStorage.getItem('token')
    },
  },
  actions: {
    loadTokenByStorage() {
      if (this.tokenInLocalStorage) {
        this.token = this.getTokenByLocalStorage()
      }

      if (this.tokenInSessionStorage) {
        this.token = this.getTokenBySessionStorage()
      }
    },

    clearTokenInStorage() {
      if (this.tokenInLocalStorage) {
        this.clearTokenInLocalStorage()
      }

      if (this.tokenInSessionStorage) {
        this.clearTokenInSessionStorage()
      }
    },

    /* LOCAL STORAGE */
    setTokenInLocalStorage(token: string): void {
      localStorage.setItem('token', token)
    },

    getTokenByLocalStorage(): string | null {
      return localStorage.getItem('token')
    },

    clearTokenInLocalStorage(): void {
      localStorage.removeItem('token')
    },
    /* END LOCAL STORAGE */

    /* SESSION STORAGE */
    setTokenInSessionStorage(token: string): void {
      sessionStorage.setItem('token', token)
    },

    getTokenBySessionStorage(): string | null {
      return sessionStorage.getItem('token')
    },

    clearTokenInSessionStorage(): void {
      sessionStorage.removeItem('token')
    },
    /* END SESSION STORAGE */
  },
})
