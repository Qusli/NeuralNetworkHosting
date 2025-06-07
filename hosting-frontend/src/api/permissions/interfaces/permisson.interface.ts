import type { EnumEntity } from "../enums"

export interface IPermission {
  id: number
  create: boolean
  read: boolean
  update: boolean
  delete: boolean
  entity: EnumEntity
}