import type { IAccount } from '@/api/accounts'
import type { AxiosError } from 'axios'

interface ISignUpResponse {
  account: IAccount
  token: string
}

export type SignUpResponse = [
  data: ISignUpResponse | null,
  error: AxiosError | null,
]
