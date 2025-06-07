import type { IAccount } from '@/api/accounts'
import type { IPermission } from '@/api/permissions'
import type { IRole } from '@/api/roles'

export interface IUser {
  id: number
  lastname: string | null
  firstname: string | null
  surname: string | null
  role: Omit<IRole, 'id'>
  permissions: IPermission[]
  account: IAccount
}
