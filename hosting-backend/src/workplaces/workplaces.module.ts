import { Module } from '@nestjs/common';
import { WorkplacesService } from './workplaces.service';
import { WorkplacesController } from './workplaces.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workplace } from './entities/workplace.entiy';
import { UsersModule } from 'src/users/users.module';
import { RolesModule } from 'src/roles/roles.module';
import { PermissionsModule } from 'src/permissions/permissions.module';

@Module({
  imports: [TypeOrmModule.forFeature([Workplace]), RolesModule, UsersModule, PermissionsModule],
  controllers: [WorkplacesController],
  providers: [WorkplacesService],
  exports: [WorkplacesService],
})
export class WorkplacesModule {}
