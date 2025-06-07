import { Injectable } from '@nestjs/common';
import { RolePermissionsService } from './role-permissions.service';
import { UserPermissionsService } from './user-permissions.service';
import { EnumEntity } from '../enums/entity.enum';

@Injectable()
export class PermissionsService {
    constructor(
        private readonly rolePermissionService: RolePermissionsService,
        private readonly userPermissionService: UserPermissionsService,
    ) {}

    async canCreate(entity: EnumEntity, roleId: number, userId: number): Promise<boolean> {
        const canCreateByRole: boolean = await this.rolePermissionService.canCreate(entity, roleId)
        const canCreateByUser: boolean = await this.userPermissionService.canCreate(entity, userId)

        return canCreateByUser || canCreateByRole
    }

    async canRead(entity: EnumEntity, roleId: number, userId: number): Promise<boolean> {
        const canReadByRole: boolean = await this.rolePermissionService.canRead(entity, roleId)
        const canReadByUser: boolean = await this.userPermissionService.canRead(entity, userId)

        return canReadByRole || canReadByUser
    }

    async canUpdate(entity: EnumEntity, roleId: number, userId: number): Promise<boolean> {
        const canUpdateByRole: boolean = await this.rolePermissionService.canUpdate(entity, roleId)
        const canUpdateByUser: boolean = await this.userPermissionService.canUpdate(entity, userId)

        return canUpdateByRole || canUpdateByUser
    }

    async canDelete(entity: EnumEntity, roleId: number, userId: number): Promise<boolean> {
        const canDeleteByRole: boolean = await this.rolePermissionService.canDelete(entity, roleId)
        const canDeleteByUser: boolean = await this.userPermissionService.canDelete(entity, userId)

        return canDeleteByUser || canDeleteByRole
    }

    async deleteByWorkplaceId(workplaceId: number): Promise<void> {
        await this.userPermissionService.deleteByWorkpalceId(workplaceId)
        await this.rolePermissionService.deleteByWorkpalceId(workplaceId)
    }
}
