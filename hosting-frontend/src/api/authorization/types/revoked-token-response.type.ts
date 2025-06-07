import type { AxiosError } from 'axios'

export type LogoutResponse = [ok: boolean, error: AxiosError | null]
