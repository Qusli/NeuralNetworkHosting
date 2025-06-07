import { Body, Controller, Get, Put, UseGuards, Query } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { Account } from './entities/account.entity';
import { UpdateAccountDto } from './dto/update-account.dto';
import { TokenGuard } from 'src/authorization/guard/token.guard';
import { GetAccount } from 'decorator/account.decorator';
import { UpdateAccountPasswordDto } from './dto/update-account-password.dto';

@UseGuards(TokenGuard)
@Controller('accounts')
export class AccountsController {
  constructor(private readonly service: AccountsService) {}

  @Get("load-by-token")
  async loadByToken(@GetAccount() account): Promise<Account> {
    return this.service.getById(account.id)
  }

  @Get("by-account-id")
  async getById(@Query("accountId") id: number): Promise<Account> {
    return this.service.getById(id)
  }

  @Put("update")
  async update(@Body() dto: UpdateAccountDto): Promise<void> {
    return this.service.update(dto)
  }

  @Put("update/password")
  async updatePassword(@Body() dto: UpdateAccountPasswordDto): Promise<void> {
    return this.service.updatePasswordById(dto)
  }
}
