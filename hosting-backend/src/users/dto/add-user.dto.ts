import { ERole } from "src/roles/enums/role.enum"

export class AddUserDto {
    lastname?: string
    firstname?: string
    surname?: string
    email: string
    role: ERole | string
}