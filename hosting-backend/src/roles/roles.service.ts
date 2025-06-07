import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { ERole } from './enums/role.enum';
import { RolePermissionsService } from 'src/permissions/services/role-permissions.service';
import { CreateRolePermissionDto } from 'src/permissions/dto/role-permission/create-role-permission.dto';
import { EnumEntity } from 'src/permissions/enums/entity.enum';
import { ERoleType } from './enums/role-type.enum';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role) private readonly rep: Repository<Role>,
        private readonly rolePermissionService: RolePermissionsService,
    ) {}

    async getAllByWorkplaceId(workplaceId: number): Promise<Role[]> {
        return this.rep.findBy({
            workplace: {
                id: workplaceId
            }
        })
    }

    async get(workplaceId: number, role: ERole | string): Promise<Role> {
        const _role = await this.rep.findOneBy({
            label: role,
            workplace: {
                id: workplaceId
            }
        })
        
        if (!role) {
            throw new HttpException("Role not found", HttpStatus.NOT_FOUND)
        }

        return _role
    }

    async create(dto: CreateRoleDto): Promise<number> {
        const role = this.rep.create(dto)

        const result = await this.rep.insert(role)
    
        return result.identifiers[0].id
    }

    async initRolesByWorkplaceId(workplaceId: number): Promise<void> {
        const exists = await this.rep.existsBy({ workplace: { id: workplaceId } })
    
        if (exists) {
            throw new HttpException("Roles exists", HttpStatus.BAD_REQUEST)
        }

        const admin: CreateRoleDto = {
            label: ERole.ADMINSTRATOR,
            type: ERoleType.SYSTEM,
            workplace: {
                id: workplaceId
            }
        } 

        const moderator: CreateRoleDto = {
            label: ERole.MODERATOR,
            type: ERoleType.SYSTEM,
            workplace: {
                id: workplaceId
            }
        }

        const user: CreateRoleDto = {
            label: ERole.USER,
            type: ERoleType.SYSTEM,
            workplace: {
                id: workplaceId
            }
        }

        const roles = await this.rep.save([admin, moderator, user])

        const promises = []

        for (const role of roles) {
            promises.push(this.createPermissions(role))
        }

        await Promise.all(promises)
    }

    async deleteByWorkplaceId(workplaceId: number): Promise<void> {
        await this.rep.delete({ workplace: { id: workplaceId } })
    }

    private async createPermissions(role: Role) {
        // Создаём права для сущностей хостингов и интеграций
        for (const entity of [EnumEntity.HOSTINGS, EnumEntity.INTEGRATIONS]) {
            const permission = {} as CreateRolePermissionDto

            if (role.label === ERole.ADMINSTRATOR) {
                permission.create = true
                permission.read = true
                permission.update = true
                permission.delete = true
            }
    
            if (role.label === ERole.MODERATOR) {
                permission.create = true
                permission.read = true
                permission.update = true
                permission.delete = false
            }
    
            if (role.label === ERole.USER) {
                permission.create = false
                permission.read = true
                permission.update = false
                permission.delete = false
            }
    
            permission.entity = entity
            permission.role = role

            await this.rolePermissionService.create(permission)
        }

        // Создаём парава для сущностей пользователей и ролей
        for (const entity of [EnumEntity.USERS, EnumEntity.ROLES]) {
            const permission = {} as CreateRolePermissionDto

            if (role.label === ERole.ADMINSTRATOR) {
                permission.create = true
                permission.read = true
                permission.update = true
                permission.delete = true
            }
    
            if (role.label === ERole.MODERATOR) {
                permission.create = entity === EnumEntity.USERS
                permission.read = true
                permission.update = entity === EnumEntity.USERS
                permission.delete = entity === EnumEntity.USERS
            }
    
            if (role.label === ERole.USER) {
                permission.create = false
                permission.read = false
                permission.update = false
                permission.delete = false
            }
    
            permission.entity = entity
            permission.role = role

            await this.rolePermissionService.create(permission)
        }
    }
}
