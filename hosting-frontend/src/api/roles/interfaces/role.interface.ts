import type { ERole, ERoleType } from '../enums/'

export interface IRole {
  id: number
  label: ERole
  type: ERoleType
}
