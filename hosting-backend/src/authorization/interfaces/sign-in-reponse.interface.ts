import { Account } from "src/accounts/entities/account.entity"
import { Workplace } from "src/workplaces/entities/workplace.entiy"

export interface ISignInResponse {
    account: Account,
    workplaces: Workplace[],
    token: string
}