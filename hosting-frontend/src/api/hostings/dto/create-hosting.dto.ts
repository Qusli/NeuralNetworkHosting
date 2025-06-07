import type { IWorkplace } from "@/api/workplaces"

export interface CreateHostingDto {
  title: string
  description?: string
  host: string
  port: number
  workplace: IWorkplace | { id: number }
}