import { Module } from '@nestjs/common';
import { HostingsService } from './hostings.service';
import { HostingsController } from './hostings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hosting } from './entities/hosting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hosting])],
  controllers: [HostingsController],
  providers: [HostingsService],
})
export class HostingsModule {}
