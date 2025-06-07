import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPermission } from '../entities/user-permission';
import { EnumEntity } from '../enums/entity.enum';
import { CreateUserPermissionDto } from '../dto/user-permission.dto.ts/create-user-permission.dto';
import { UpdateUserPermissionDto } from '../dto/user-permission.dto.ts/update-user-permission.dto';

@Injectable()
export class UserPermissionsService {
    constructor(
        @InjectRepository(UserPermission) private readonly rep: Repository<UserPermission>
    ) {}

    async create(dto: CreateUserPermissionDto): Promise<number> {
        const entity = this.rep.create(dto)

        const result = await this.rep.insert(entity)

        return result.identifiers[0].id
    }

    async update(dto: UpdateUserPermissionDto): Promise<void> {
        const entity = this.rep.create(dto)
        await this.rep.update(entity.id, entity)
    }

    async canCreate(entity: EnumEntity, userId: number): Promise<boolean> {
        return this.rep.existsBy({
            create: true,
            entity: entity,
            user: {
                id: userId
            }
        })
    }

    async canRead(entity: EnumEntity, userId: number): Promise<boolean> {
        return this.rep.existsBy({
            read: true,
            entity: entity,
            user: {
                id: userId
            }
        })
    }

    async canUpdate(entity: EnumEntity, userId: number): Promise<boolean> {
        return this.rep.existsBy({
            update: true,
            entity: entity,
            user: {
                id: userId
            }
        })
    }

    async canDelete(entity: EnumEntity, userId: number): Promise<boolean> {
        return this.rep.existsBy({
            delete: true,
            entity: entity,
            user: {
                id: userId
            }
        })
    }

    async deleteByWorkpalceId(workplaceId: number): Promise<void> {
        await this.rep.delete({
            user: {
                workplace: {
                    id: workplaceId
                }
            }
        })
    }
}
