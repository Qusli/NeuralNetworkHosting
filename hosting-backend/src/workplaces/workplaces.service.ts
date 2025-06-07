import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateWorkplaceDto } from './dto/create-workplace.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Workplace } from './entities/workplace.entiy';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { RolesService } from 'src/roles/roles.service';
import {  } from 'src/roles/dto/create-role.dto';
import { ERole } from 'src/roles/enums/role.enum';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Transactional } from 'typeorm-transactional';
import { PermissionsService } from 'src/permissions/services/permissions.service';

@Injectable()
export class WorkplacesService {
    private _select = {
        users: {
            id: true,
            firstname: true,
            lastname: true,
            surname: true,
            role: {
                label: true,
                type: true,
            },
            account: {
                id: true,
                email: true
            }
        },
        owner: {
            id: true,
            email: true
        }
    }

    private _relations = {
        roles: true,
        users: {
            role: true,
            account: true
        },
        owner: true
    }

    constructor(
        @InjectRepository(Workplace) private readonly rep: Repository<Workplace>,
        private readonly rolesService: RolesService,
        private readonly usersService: UsersService,
        private readonly permissionsService: PermissionsService,
    ) {}

    async getAllByAccountId(accountId: number): Promise<Workplace[]> {
        if (!accountId) {
            throw new HttpException("accountId is null or undefined", HttpStatus.BAD_REQUEST)
        }

        return this.rep.find({
            where: {
                owner: {
                    id: accountId
                }
            },
            select: this._select,
            relations: this._relations,
        })
    }

    async getById(workplaceId: number): Promise<Workplace> {
        if (!workplaceId) {
            throw new HttpException("workpalceId is null or undefined", HttpStatus.BAD_REQUEST)
        }

        const workplace = await this.rep.findOne({
            where: { id: workplaceId },
            select: this._select,
            relations: this._relations,
        })

        if (!workplace) {
            throw new HttpException("Workplace not found", HttpStatus.NOT_FOUND)
        }

        return workplace
    }

    async existsAccountInWorkplace(workpalceId: number, account): Promise<boolean> {
        return this.rep.existsBy({
            id: workpalceId,
            users: {
                account: {
                    id: account.id
                }
            }
        })
    }

    @Transactional()
    async create(dto: CreateWorkplaceDto): Promise<number> {
        if (!dto.owner) {
            throw new HttpException("Owner is null or undefined", HttpStatus.BAD_REQUEST)
        }

        const workplace = this.rep.create(dto)

        const result = await this.rep.insert(workplace)

        workplace.id = result.identifiers[0].id

        // Создаём роли
        await this.rolesService.initRolesByWorkplaceId(workplace.id)

        // Получаем роль администратора
        const role = await this.rolesService.get(workplace.id, ERole.ADMINSTRATOR)

        const user: CreateUserDto = {
            workplace: workplace,
            role: role,
            account: {
                id: dto.owner.id,
            }
        }

        // Создаём администратора в системе
        await this.usersService.create(user)

        return workplace.id
    }

    async delete(accountId:number, workplaceId: number): Promise<void> {
        const isOwner = await this.isOwner(accountId, workplaceId)

        if (!isOwner) {
            throw new HttpException("Account is not workplace owner", HttpStatus.FORBIDDEN)
        }

        const workplace = await this.rep.findOneBy({ id: workplaceId })

        // Удаление рабочей области
        const result = await this.rep.remove(workplace)
    
        console.log(result)

        if (!result) {
            throw new HttpException("Server error", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async isOwner(accountId: number, workplaceId: number): Promise<boolean> {
        return this.rep.existsBy({
            id: workplaceId,
            owner: {
                id: accountId
            }
        })
    }
}
