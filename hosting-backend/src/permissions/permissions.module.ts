import { Module } from '@nestjs/common';
import { PermissionsService } from './services/permissions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolePermission } from './entities/role-permission.entity';
import { UserPermission } from './entities/user-permission';
import { RolePermissionsService } from './services/role-permissions.service';
import { UserPermissionsService } from './services/user-permissions.service';

@Module({
  imports: [TypeOrmModule.forFeature([RolePermission, UserPermission])],
  providers: [PermissionsService, RolePermissionsService, UserPermissionsService],
  exports: [PermissionsService, RolePermissionsService, UserPermissionsService]
})
export class PermissionsModule {}
