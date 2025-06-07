import type { AxiosError } from "axios";

export type CreateWorkplaceResponse = [
  workplaceid: number | null,
  error: AxiosError | null,
]
