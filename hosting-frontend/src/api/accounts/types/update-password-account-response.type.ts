import type { AxiosError } from 'axios'

export type UpdatePasswordAccountResponse = [
  ok: boolean,
  error: AxiosError | null,
]
