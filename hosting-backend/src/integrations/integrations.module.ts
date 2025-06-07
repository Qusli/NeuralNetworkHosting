import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { integrationsController } from './integratuins.controller';
import { integrationsService } from './integrations.service';
import { Integration } from './entities/integration.entity';
import { IntegrationContainer } from './entities/integration-container.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Integration, IntegrationContainer])],
  controllers: [integrationsController],
  providers: [integrationsService],
})
export class IntegrationsModule {}
