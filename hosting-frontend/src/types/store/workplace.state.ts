import type { IWorkplace } from '@/api/workplaces/interfaces/workplace.interface'

export interface IWorkplaceState {
  workplaces: {
    items: IWorkplace[]
    current: IWorkplace | null
  }
  isLoading: boolean
}
