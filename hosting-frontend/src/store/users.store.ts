import { ERole, ERoleType } from '@/api/roles'
import { UsersApi } from '@/api/users'
import type { IUser } from '@/api/users/interfaces/user.interface'
import { defineStore } from 'pinia'

import { type IErrorResponse, type IUsersState } from '@/types'

import { useWorkplacesStore } from './workplaces.store'
import { NotifyErrorResponse } from '@/classes'
import type { EnumEntity, IPermission } from '@/api/permissions'

const ROLE_LABEL = {
  [ERole.ADMINSTRATOR]: 'Администратор',
  [ERole.MODERATOR]: 'Модератор',
  [ERole.USER]: 'Пользователь',
}

export const useUsersStore = defineStore('users-store', {
  state: (): IUsersState => ({
    users: {
      items: [],
      current: null,
    },
    isLoading: false,
  }),
  getters: {
    roleLabel: (state): string => {
      return state.users.current?.role
        ? ROLE_LABEL[state.users.current.role.label]
        : 'Неизвестно'
    },

    currentUserEmpty: (state): boolean => {
      return !state.users.current
    },

    currentUser: (state): IUser | null => {
      return state.users.current
    },

    isAdministrator: (state): boolean => {
      return state.users.current?.role?.label === ERole.ADMINSTRATOR
    },

    isModerator: (state): boolean => {
      return state.users.current?.role?.label === ERole.MODERATOR
    },

    isUser: (state): boolean => {
      return state.users.current?.role?.label === ERole.USER
    },

    isSystemRole: (state): boolean => {
      return state.users.current?.role?.type === ERoleType.SYSTEM
    },

    isCustomRole: (state): boolean => {
      return state.users.current?.role?.type === ERoleType.CUSTOM
    },
  },
  actions: {
    getPermissionByEntity(entity: EnumEntity): IPermission | null {
      for (const permission of this.currentUser?.permissions ?? []) {
        if (permission.entity === entity) {
          return permission
        }
      }

      return null
    },

    canCreate(entity: EnumEntity): boolean {
      const permission = this.getPermissionByEntity(entity)

      if (permission) {
        return permission.create
      } else {
        return false
      }
    },

    canRead(entity: EnumEntity): boolean {
      const permission = this.getPermissionByEntity(entity)

      if (permission) {
        return permission.read
      } else {
        return false
      }
    },

    canUpdate(entity: EnumEntity): boolean {
      const permission = this.getPermissionByEntity(entity)

      if (permission) {
        return permission.update
      } else {
        return false
      }
    },

    canDelete(entity: EnumEntity): boolean {
      const permission = this.getPermissionByEntity(entity)

      if (permission) {
        return permission.delete
      } else {
        return false
      }
    },

    isFullPermissionByEntity(entity: EnumEntity): boolean {
      const permission = this.getPermissionByEntity(entity)

      if (permission) {
        return permission.create && permission.read && permission.update && permission.delete
      } else {
        return false
      }
    },

    /* API */
    async loadUsers(notify = false) {
      this.isLoading = true

      const workplaceStore = useWorkplacesStore()

      const [users, error] = await UsersApi.loadUsers(
        workplaceStore.workplaces.current!.id,
      )

      if (error && notify) {
        NotifyErrorResponse.init(error?.response?.data as IErrorResponse).sendNotifyError()
      }

      if (users) {
        this.users.items = users
      }

      this.isLoading = true
    },

    async loadCurrentUser(notify = false) {
      this.isLoading = true

      const workplaceStore = useWorkplacesStore()

      const [user, error] = await UsersApi.loadCurrentUser(
        workplaceStore.workplaces.current!.id,
      )

      if (error && notify) {
        NotifyErrorResponse.init(error?.response?.data as IErrorResponse).sendNotifyError()
      }

      if (user) {
        this.users.current = user
      }

      this.isLoading = false
    },
    /* END API */
  },
})
