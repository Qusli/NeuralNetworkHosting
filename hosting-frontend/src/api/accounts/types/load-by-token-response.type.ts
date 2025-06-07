import type { IAccount } from '../interfaces'

export type LoadByTokenResponse = [
  account: IAccount | null,
  error: unknown | null,
]
