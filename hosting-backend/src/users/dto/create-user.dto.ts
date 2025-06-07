import { IsNotEmptyObject, IsString, MaxLength, MinLength } from "class-validator"
import { Account } from "src/accounts/entities/account.entity"
import { Role } from "src/roles/entities/role.entity"
import { Workplace } from "src/workplaces/entities/workplace.entiy"

export class CreateUserDto {
    @IsString()
    @MaxLength(40)
    lastname?: string

    @IsString()
    @MaxLength(30)
    firstname?: string

    @IsString()
    @MaxLength(40)
    surname?: string

    @IsNotEmptyObject()
    role: Role | Pick<Role, "id">
    
    @IsNotEmptyObject()
    workplace: Workplace | Pick<Workplace, "id">
    
    @IsNotEmptyObject()
    account: Account | Pick<Account, "id">
}
