import type { IAccount } from '@/api/accounts'

export interface CreateWorkplaceDto {
  title: string
  owner: IAccount | { id: number }
}
