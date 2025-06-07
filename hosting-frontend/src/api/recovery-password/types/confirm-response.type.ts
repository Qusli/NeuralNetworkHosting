import type { AxiosError } from 'axios'

export type ConfirmResponse = [ok: boolean, error: AxiosError | null]
