import { IsNotEmpty, IsNotEmptyObject, IsNumber } from "class-validator"
import { Account } from "src/accounts/entities/account.entity"

export class CreateVerifyCode {
    @IsNotEmpty()
    @IsNumber()
    code: number

    @IsNotEmptyObject()
    account: Account | Pick<Account, "id">
}