import { Query, Controller, Get, UseGuards, Put, Body, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { TokenGuard } from 'src/authorization/guard/token.guard';
import { GetAccount } from 'decorator/account.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { AddUserDto } from './dto/add-user.dto';

@UseGuards(TokenGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get("all/by-workplace-id")
  async getAllByWorkplaceId(@Query("workplaceId") workplaceId: number): Promise<User[]> {
    return this.service.getAllByWorkplaceId(workplaceId)
  }

  @Get("by-user-id")
  async getById(@Query("userId") userId: number): Promise<User> {
    return this.service.getById(userId)
  }

  @Get("search/by-email")
  async searchByEmail(@Query("email") email: string): Promise<User[]> {
    return this.service.searchByEmail(email)
  } 

  @Get("current")
  async getCurrentUser(@Query("workplaceId") workplaceId: number, @GetAccount() account): Promise<User> {
    return this.service.getCurrent(workplaceId, account.id)
  }

  @Post("add")
  async addUser(@Query("workplaceId") workplaceId: number, @GetAccount() account, @Body() dto: AddUserDto): Promise<void> {
    return this.service.addUser(workplaceId, account.id, dto)
  }

  @Put("update")
  async update(@Body() dto: UpdateUserDto) {
    return this.service.update(dto)
  }
}
