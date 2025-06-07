import type { AxiosError } from 'axios'
import type { IUser } from '../interfaces/user.interface'

export type LoadUsersResponse = [users: IUser[] | null, error: AxiosError | null]
