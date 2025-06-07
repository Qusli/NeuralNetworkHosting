import { IsNotEmpty, IsNotEmptyObject, IsString, MaxLength, MinLength } from "class-validator"
import { Account } from "src/accounts/entities/account.entity"
import { Role } from "src/roles/entities/role.entity"
import { User } from "src/users/entities/user.entity"

export class CreateWorkplaceDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    @MaxLength(100)
    title: string
    
    roles?: Role[] | Pick<Role, "id">[]
    
    users?: User[] | Pick<User, "id">[]

    @IsNotEmptyObject()
    owner: Account
}