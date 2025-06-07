import type { IAccount } from '@/api/accounts'
import type { IWorkplace } from '@/api/workplaces'
import type { AxiosError } from 'axios'

export interface ISignInResponse {
  account: IAccount
  workplaces: IWorkplace[]
  token: string
}

export type SignInResponse = [
  data: ISignInResponse | null,
  error: AxiosError | null,
]
