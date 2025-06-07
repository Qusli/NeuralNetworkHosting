import type { AxiosError } from 'axios'

import type { IWorkplace } from '../interfaces/workplace.interface'

export type WorkplacesGetAllResponse = [
  workplaces: IWorkplace[] | null,
  error: AxiosError | null,
]
