import * as bcrypt from "bcrypt"
import * as dayjs from "dayjs"
import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PasswordRecoveryCode } from "../entities/password-recovery-code.entity";
import { Repository } from "typeorm";
import { AccountsService } from "src/accounts/accounts.service";
import { PasswordRecoveryCodeDto } from "../dto/password-recovery-code.dto";
import { PasswordNotCompareException } from "../exceptions/password-not-compare.exception";
import { MailerService } from "@nestjs-modules/mailer";
import { ConfigService } from "@nestjs/config";
import { CreateVerifyCode } from "../dto/create-verify-code.dto";
import { generateNumber } from "../utils/generate-number.utils";
import { Cron, CronExpression } from "@nestjs/schedule";
import { ActiveTokensService } from "./active-tokens.service";

@Injectable()
export class PasswordRecoveryService {
    private readonly logger = new Logger(PasswordRecoveryService.name)

    constructor(
        @InjectRepository(PasswordRecoveryCode) private readonly rep: Repository<PasswordRecoveryCode>,
        private readonly activeTokensService: ActiveTokensService,
        private readonly accountService: AccountsService,
        private readonly mailerService: MailerService,
        private readonly configService: ConfigService,
    ) {
    }

    async recovery(dto: PasswordRecoveryCodeDto): Promise<void> {
        if (dto.password !== dto.repeatPassword) {
            throw new PasswordNotCompareException()
        }

        const _code = await this.rep.findOne({ 
            where: {
                code: dto.code
            },
            relations: {
                account: true
            }
        })

        if (!_code) {
            throw new HttpException("Code not found", HttpStatus.BAD_REQUEST)
        }

        if (!_code.confirm) {
            throw new HttpException("Code not confirm", HttpStatus.BAD_REQUEST)
        }

        const account = await this.accountService.getByEmail(dto.email, {
            password: true
        })

        const compare = await bcrypt.compare(dto.password, account.password)

        if (compare) {
            throw new HttpException("The new password may not match the old one", HttpStatus.BAD_REQUEST)
        }

        if (account.id !== _code.account.id) {
            throw new HttpException("Different accounts", HttpStatus.BAD_REQUEST)
        }

        account.password = dto.password

        await Promise.all([
            this.accountService.update(account),
            this.rep.remove(_code),
        ])

        await this.activeTokensService.deleteAllByAccounId(account.id)

        this.logger.log("Account password recovered", "Account id: " + account.id)
        this.logger.log("Verify code deleted", "Verify code: " + dto.code)
    }

    async confirm(code: number): Promise<void> {
        const _code = await this.rep.findOne({ 
            where: {
                code
            },
            relations: {
                account: true
            }
        })

        if (!_code) {
            throw new HttpException("Code not found", HttpStatus.BAD_REQUEST)
        }

        _code.confirm = true

        await this.rep.save(_code)

        this.logger.log("Confirm code", "Account id: " + _code.account.id)
    }

    async createByEmail(email: string): Promise<void> {
        const account = await this.accountService.getByEmail(email)

        const verifyCode: CreateVerifyCode = {
            code: generateNumber(),
            account: account,
        }

        await this.rep.insert(verifyCode)

        this.logger.log("Verify code saved", verifyCode)

        try {
            await this.mailerService.sendMail({
                subject: "Код подтверждения",
                text: `Код для подтверждения ${verifyCode.code}`,
                from: `NeuroNetworkHosting <${this.configService.get('smtp.from')}>`,
                to: email
            })

            this.logger.log("Send mail", `To email: ${email}`)
        } catch(e) {
            this.logger.error("Send mail error", e)
            throw new HttpException("Send mail error", HttpStatus.BAD_REQUEST)
        }
    }

    @Cron(CronExpression.EVERY_5_MINUTES)
    private async clearCodes(): Promise<void> {
        const date = dayjs().subtract(5, 'm').toDate()

        const qb = await this.rep.createQueryBuilder()
        .delete()
        .where("password_recovery_codes.created_at < :date", { date })
        .execute()

        this.logger.log("Codes clear", qb.affected.toString())
    }
}