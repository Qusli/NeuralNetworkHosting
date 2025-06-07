import { IsNotEmpty, IsNotEmptyObject, IsString } from "class-validator"
import { Account } from "src/accounts/entities/account.entity"

export class CreateActiveTokenDto {
    @IsNotEmpty()
    @IsString()
    jti: string

    @IsNotEmptyObject()
    account: Account | Pick<Account, "id">
}