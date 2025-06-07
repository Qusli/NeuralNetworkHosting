export interface IAccount {
  id: number
  email: string
  lastname: string | null
  firstname: string | null
  patronymic: string | null
  phone?: string
}
