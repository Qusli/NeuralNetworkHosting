import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserPermissionsService } from 'src/permissions/services/user-permissions.service';
import { CreateUserPermissionDto } from 'src/permissions/dto/user-permission.dto.ts/create-user-permission.dto';
import { EnumEntity } from 'src/permissions/enums/entity.enum';
import { ERole } from 'src/roles/enums/role.enum';
import { AddUserDto } from './dto/add-user.dto';
import { AccountsService } from 'src/accounts/accounts.service';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {
    private _select = {
        role: {
            label: true,
            type: true,
        },
        account: {
            id: true,
            email: true
        }
    }

    private _relations = {
        role: true,
        account: true,
        permissions: true
    }

    constructor(
        @InjectRepository(User) private readonly rep: Repository<User>,
        private readonly accountsService: AccountsService,
        private readonly rolesService: RolesService,
        private readonly userPermissionsService: UserPermissionsService,
    ) {}

    async getAllByWorkplaceId(workplaceId: number): Promise<User[]> {
        return this.rep.find({
            where: {
                workplace: {
                    id: workplaceId
                }
            },
            select: this._select,
            relations: this._relations,
        })
    }

    async getById(userId: number): Promise<User> {
        return this.rep.findOne({
            where: {
                id: userId
            },
            select: this._select,
            relations: this._relations,
        })
    }

    async getCurrent(workplaceId: number, accountId: number): Promise<User> {
        return this.rep.findOne({
            where: {
                workplace: {
                    id: workplaceId,
                    users: {
                        account: {
                            id: accountId
                        }
                    }
                }
            },
            select: this._select,
            relations: this._relations,
        })
    }

    async searchByEmail(email: string): Promise<User[]> {
        console.log(email)
        return this.rep.createQueryBuilder("u")
            .leftJoinAndSelect("u.account", "a")
            .where("a.email LIKE :email", { email: `${email || ''}%` })
            .getMany()
    }

    async create(dto: CreateUserDto): Promise<number> {
        const user = this.rep.create(dto)

        const newUser = await this.rep.save(user)

        await this.createPermissions(newUser)

        return newUser.id
    }

    async addUser(workpalceId: number, currentAccountId: number, dto: AddUserDto): Promise<void> {
        const user = await this.getCurrent(workpalceId, currentAccountId)
        const permission = await this.userPermissionsService.canCreate(EnumEntity.USERS, user.id)
     
        if (!permission) {
            throw new HttpException("You don't have enough rights", HttpStatus.FORBIDDEN)
        }

        const account = await this.accountsService.getByEmail(dto.email)
        const userExists = this.existsByAccountEmail(workpalceId, dto.email)

        if (userExists) {
            throw new HttpException("The user is already in your workspace", HttpStatus.BAD_REQUEST)
        }

        const role = await this.rolesService.get(workpalceId, dto.role)

        const createUserDto: CreateUserDto = {
            lastname: dto.lastname,
            firstname: dto.firstname,
            surname: dto.surname,
            account: account,
            role: role,
            workplace: {
                id: workpalceId
            },
        }

        const userEntity = this.rep.create(createUserDto)

        const _user = await this.rep.save(userEntity)

        await this.createPermissions(_user)
    }

    async update(dto: UpdateUserDto): Promise<void> {
        const user = this.rep.create(dto)
        await this.rep.update(user.id, user)
    }

    async deleteByWorkplaceId(workplaceId: number): Promise<void> {
        await this.rep.delete({ workplace: { id: workplaceId } })
    }

    async existsByAccountEmail(workpalceId: number, email: string): Promise<boolean> {
        return this.rep.existsBy({
            workplace: {
                id: workpalceId
            },
            account: {
                email: email
            }
        })
    }

    private async createPermissions(user: User) {
        // Создаём права для сущностей хостингов и интеграций
        for (const entity of [EnumEntity.HOSTINGS, EnumEntity.INTEGRATIONS]) {
            const permission = {} as CreateUserPermissionDto

            if (user.role.label === ERole.ADMINSTRATOR) {
                permission.create = true
                permission.read = true
                permission.update = true
                permission.delete = true
            }
    
            if (user.role.label === ERole.MODERATOR) {
                permission.create = true
                permission.read = true
                permission.update = true
                permission.delete = false
            }
    
            if (user.role.label === ERole.USER) {
                permission.create = false
                permission.read = true
                permission.update = false
                permission.delete = false
            }
    
            permission.entity = entity
            permission.user = user

            await this.userPermissionsService.create(permission)
        }

        // Создаём парава для сущностей пользователей и ролей
        for (const entity of [EnumEntity.USERS, EnumEntity.ROLES]) {
            const permission = {} as CreateUserPermissionDto

            if (user.role.label === ERole.ADMINSTRATOR) {
                permission.create = true
                permission.read = true
                permission.update = true
                permission.delete = true
            }
    
            if (user.role.label === ERole.MODERATOR) {
                permission.create = entity === EnumEntity.USERS
                permission.read = true
                permission.update = entity === EnumEntity.USERS
                permission.delete = entity === EnumEntity.USERS
            }
    
            if (user.role.label === ERole.USER) {
                permission.create = false
                permission.read = false
                permission.update = false
                permission.delete = false
            }
    
            permission.entity = entity
            permission.user = user

            await this.userPermissionsService.create(permission)
        }
    }
}
