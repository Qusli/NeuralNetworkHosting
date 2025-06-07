import { UsersApi } from '@/api/users'
import type { UpdateUserDto } from '@/api/users/dto'
import { defineStore } from 'pinia'
import { toast } from 'vue3-toastify'

import type { IErrorResponse } from '@/types'

import { useUsersStore } from '@/store/users.store'

import type { ICurrentUserSettings } from '../types/interfaces/current-user-settings.interface'
import { NotifyErrorResponse } from '@/classes'

interface State {
  data: ICurrentUserSettings
  isLoading: boolean
}

export const useProfileCurrentUser = defineStore('profile-current-user', {
  state: (): State => ({
    data: {
      lastname: '',
      firstname: '',
      surname: '',
    },
    isLoading: false,
  }),
  getters: {},
  actions: {
    init() {
      const usersStore = useUsersStore()

      if (usersStore.currentUser?.lastname) {
        this.data.lastname = usersStore.currentUser?.lastname
      }

      if (usersStore.currentUser?.firstname) {
        this.data.firstname = usersStore.currentUser?.firstname
      }

      if (usersStore.currentUser?.surname) {
        this.data.surname = usersStore.currentUser?.surname
      }
    },

    /* API */
    async save(): Promise<void> {
      this.isLoading = true

      const usersStore = useUsersStore()

      const dto: UpdateUserDto = {
        id: usersStore.users.current!.id,
        ...this.data,
      }

      const [result, error] = await UsersApi.update(dto)

      if (error) {
        NotifyErrorResponse.init(error?.response?.data as IErrorResponse).sendNotifyError()
      }

      if (result) {
        toast.success('User has been updated')
      }

      this.isLoading = false
    },
    /* END API */
  },
})
