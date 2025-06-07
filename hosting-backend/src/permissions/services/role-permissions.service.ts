import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RolePermission } from '../entities/role-permission.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EnumEntity } from '../enums/entity.enum';
import { CreateRolePermissionDto } from '../dto/role-permission/create-role-permission.dto';
import { UpdateRolePermissionDto } from '../dto/role-permission/update-role-permission.dto';

@Injectable()
export class RolePermissionsService {
    constructor(
        @InjectRepository(RolePermission) private readonly rep: Repository<RolePermission>
    ) {}

    async create(dto: CreateRolePermissionDto): Promise<number> {
        const entity = this.rep.create(dto)

        const result = await this.rep.insert(entity)

        return result.identifiers[0].id
    }

    async update(dto: UpdateRolePermissionDto): Promise<void> {
        const entity = this.rep.create(dto)
        await this.rep.update(entity.id, entity)
    }

    async canCreate(entity: EnumEntity, roleId: number): Promise<boolean> {
        return this.rep.existsBy({
            create: true,
            entity: entity,
            role: {
                id: roleId
            }
        })
    }

    async canRead(entity: EnumEntity, roleId: number): Promise<boolean> {
        return this.rep.existsBy({
            read: true,
            entity: entity,
            role: {
                id: roleId
            }
        })
    }

    async canUpdate(entity: EnumEntity, roleId: number): Promise<boolean> {
        return this.rep.existsBy({
            update: true,
            entity: entity,
            role: {
                id: roleId
            }
        })
    }

    async canDelete(entity: EnumEntity, roleId: number): Promise<boolean> {
        return this.rep.existsBy({
            delete: true,
            entity: entity,
            role: {
                id: roleId
            }
        })
    }

    async deleteByWorkpalceId(workplaceId: number): Promise<void> {
        await this.rep.createQueryBuilder("rp")
            .leftJoinAndSelect("rp.role" , "r")
            .leftJoinAndSelect("r.workplace", "w")
            .where("w.id = :workplaceId", { workplaceId })
            .delete()
            .execute()
    }
}
