import * as bcrypt from "bcrypt"
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountNotFoundException } from './exceptions/account-not-found.exception';
import { IGetOptions } from './interfaces/get-options.interfaces';
import { UpdateAccountPasswordDto } from './dto/update-account-password.dto';

@Injectable()
export class AccountsService {
    constructor(@InjectRepository(Account) private readonly rep: Repository<Account>) {}

    async getById(id: number, options: IGetOptions = {}): Promise<Account> {
        if (options?.password === undefined) {
            options['password'] = false        
        }
        
        const account = await this.rep.findOne({
            where: {
                id
            },
            select: {
                id: true,
                email: true,
                password: options.password
            }
        })

        if (!account) {
            throw new AccountNotFoundException()
        }

        return account
    }

    async getByEmail(email: string, options: IGetOptions = {}): Promise<Account> {
        if (options?.password === undefined) {
            options['password'] = false
        }

        const account = await this.rep.findOne({ 
            where: {
                email
            },
            select: {
                id: true,
                email: true,
                password: options.password
            }
        })
    
        if (!account) {
            throw new AccountNotFoundException()
        }

        return account
    }

    async create(dto: CreateAccountDto): Promise<number> {
        const account = this.rep.create(dto)

        const accountEntity = await this.rep.findOneBy({ email: dto.email })

        if (accountEntity) {
            throw new HttpException("Account already exists", HttpStatus.BAD_REQUEST)
        }

        const result = await this.rep.insert(account)

        return result.identifiers[0].id
    }

    async update(dto: UpdateAccountDto): Promise<void> {
        await this.rep.update(dto.id, this.rep.create(dto))
    }

    async updatePasswordById(dto: UpdateAccountPasswordDto): Promise<void> {
        const account = await this.getById(dto.id, {
            password: true
        })

        const compare = await bcrypt.compare(dto.currentPassword, account.password)

        if (!compare) {
            throw new HttpException("The current password is not an account password", HttpStatus.BAD_REQUEST)
        }

        account.password = dto.newPassword;

        await this.rep.update(dto.id, account) 
    }

    async existByEmail(email: string) {
        return this.rep.existsBy({ email })
    }

    createaEntity(dto: CreateAccountDto | UpdateAccountDto): Account {
        return this.rep.create(dto)
    }
}
