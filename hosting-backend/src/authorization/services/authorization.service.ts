import { Injectable, Logger } from '@nestjs/common';
import { AccountsService } from 'src/accounts/accounts.service';
import { SignInDto } from '../dto/sign-in.dto';
import { SignUpDto } from '../dto/sign-up.dto';
import { ISignUpResponse } from '../interfaces/sign-up-response.interface';
import { CreateAccountDto } from 'src/accounts/dto/create-account.dto';
import { JwtService } from '@nestjs/jwt';
import { Account } from 'src/accounts/entities/account.entity';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from "bcrypt"
import * as uuid from "uuid" 
import { PasswordNotCompareException } from '../exceptions/password-not-compare.exception';
import { WorkplacesService } from 'src/workplaces/workplaces.service';
import { ISignInResponse } from '../interfaces/sign-in-reponse.interface';
import { ActiveTokensService } from './active-tokens.service';

@Injectable()
export class AuthorizationService {
    private readonly logger = new Logger()

    constructor(
        private readonly accountsService: AccountsService,
        private readonly workplacesService: WorkplacesService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly activeTokensService: ActiveTokensService
    ) {}

    async signIn(dto: SignInDto): Promise<ISignInResponse> {
        const account = await this.accountsService.getByEmail(dto.email, {
            password: true
        });

        const compare = await bcrypt.compare(dto.password, account.password)

        if (!compare) {
            throw new PasswordNotCompareException()
        }

        this.logger.log("Account id: " + account.id, "Account signIn")

        const workplaces = await this.workplacesService.getAllByAccountId(account.id)

        delete account.password

        return { 
            account: account,
            workplaces: workplaces,
            token: await this.createToken(account),
        } 
    }

    async signUp(dto: SignUpDto): Promise<ISignUpResponse> {
        if (dto.password !== dto.repeatPassword) {
            throw new PasswordNotCompareException()
        }

        const createAccountDto: CreateAccountDto = {
            email: dto.email,
            password: dto.password
        }

        const accountId = await this.accountsService.create(createAccountDto)

        this.logger.log("Account id: " + accountId, "Account signUp")

        const account = {
            id: accountId,
            email: dto.email
        } as Account

        return {
            account: account,
            token: await this.createToken(account)
        }
    }

    async verifyJwtToken(token: string): Promise<object> {
        return this.jwtService.verifyAsync(token, {
            secret: this.configService.get("jwt.secret")
        })
    }

    private async createToken(account: Account): Promise<string> {
        const payload = {
            accountId: account.id,
            accountEmail: account.email,
            jti: uuid.v4()
        }

        await this.activeTokensService.create({ jti: payload.jti, account })

        return this.jwtService.signAsync(payload, {
            secret: this.configService.get("jwt.secret"),
            expiresIn: this.configService.get("jwt.expiresTime") + this.configService.get("jwt.expiresPerfomance")
        })
    }
}
