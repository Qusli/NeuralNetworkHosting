import type { IAccount } from '@/api/accounts'
import type { IRole } from '@/api/roles'
import type { IUser } from '@/api/users/interfaces/user.interface'

export interface IWorkplace {
  id: number
  title: string
  roles: IRole[]
  users: IUser[]
  owner: IAccount
}
