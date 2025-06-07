import type { IUser } from '@/api/users/interfaces/user.interface'

export interface IUsersState {
  users: {
    items: IUser[]
    current: IUser | null
  }
  isLoading: boolean
}
