import { Logger, Module } from '@nestjs/common';
import { WorkplacesModule } from './workplaces/workplaces.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsModule } from './accounts/accounts.module';
import { AuthorizationModule } from './authorization/authorization.module';
import configuration from 'config/configuration';
import { MailerModule } from '@nestjs-modules/mailer';
import { ScheduleModule } from '@nestjs/schedule';
import { RolesModule } from './roles/roles.module';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { HostingsModule } from './hostings/hostings.module';
import { IntegrationsModule } from './integrations/integrations.module';
import { PermissionsModule } from './permissions/permissions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get("database"),
      inject: [ConfigService],
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        return addTransactionalDataSource(new DataSource(options));
      },
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.get('smtp.host'),
          port: config.get('smtp.port'),
          secure: true,
          auth: {
            user: config.get('smtp.user'),
            pass: config.get('smtp.password'),
          },
        }
      }),
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    AccountsModule,
    AuthorizationModule,
    WorkplacesModule, 
    RolesModule,
    UsersModule, 
    HostingsModule, 
    IntegrationsModule, 
    PermissionsModule,
  ],
})
export class AppModule {}
