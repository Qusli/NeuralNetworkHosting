import { Body, Controller, Delete, Get, Headers, HttpException, HttpStatus, Post, Query, UseGuards } from '@nestjs/common';
import { WorkplacesService } from './workplaces.service';
import { Workplace } from './entities/workplace.entiy';
import { CreateWorkplaceDto } from './dto/create-workplace.dto';
import { TokenGuard } from 'src/authorization/guard/token.guard';
import { GetAccount } from 'decorator/account.decorator';

@UseGuards(TokenGuard)
@Controller('workplaces')
export class WorkplacesController {
  constructor(private readonly service: WorkplacesService) {}

  @Get("all")
  async getAllByAccountId(@Query("accountId") accountId: number): Promise<Workplace[]> {
    return this.service.getAllByAccountId(accountId)
  }

  @Get("by-workplace-id")
  async getById(@Query("workplaceId") workplaceId: number, @GetAccount() account): Promise<Workplace> {
    const existsAccountInWorkplace = await this.service.existsAccountInWorkplace(workplaceId, account)
    
    if (!existsAccountInWorkplace) {
      throw new HttpException("Account not exists in workplace", HttpStatus.FORBIDDEN)
    }
    
    return this.service.getById(workplaceId)
  }

  @Post("create")
  async create(@Body() dto: CreateWorkplaceDto): Promise<number> {
    return this.service.create(dto)
  }

  @Delete("delete")
  async delete(@GetAccount() account, @Body("workplaceId") workplaceId: number): Promise<void> {
    return this.service.delete(account.id, workplaceId)
  }
}
