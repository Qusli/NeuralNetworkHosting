import type { AxiosError } from 'axios'

import type { IWorkplace } from '../interfaces/workplace.interface'

export type WorkplaceGetByIdResponse = [
  workplaces: IWorkplace | null,
  error: AxiosError | null,
]
