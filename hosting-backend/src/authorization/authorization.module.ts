import { Global, Module } from '@nestjs/common';
import { AuthorizationService } from './services/authorization.service';
import { AuthorizationController } from './controllers/authorization.controller';
import { JwtModule } from '@nestjs/jwt';
import { AccountsModule } from 'src/accounts/accounts.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActiveToken } from './entities/active-token.entity';
import { TokenGuard } from './guard/token.guard';
import { PasswordRecoveryCode } from './entities/password-recovery-code.entity';
import { PasswordRecoverController } from './controllers/password-recovery.controller';
import { PasswordRecoveryService } from './services/password-recovery.service';
import { WorkplacesModule } from 'src/workplaces/workplaces.module';
import { ActiveTokensService } from './services/active-tokens.service';
import { PassportModule } from '@nestjs/passport';

@Global()
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    TypeOrmModule.forFeature([ActiveToken, PasswordRecoveryCode]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        secret: config.get("jwt.secret"),
        signOptions: {
          expiresIn: config.get("jwt.expiresTime") + config.get("jwt.expiresPerfomance")
        }
      }),
      inject: [ConfigService],
    }),
    AccountsModule, 
    WorkplacesModule,
    ConfigModule,
  ],
  controllers: [AuthorizationController, PasswordRecoverController],
  providers: [AuthorizationService, PasswordRecoveryService, ActiveTokensService, TokenGuard],
  exports: [AuthorizationService, ActiveTokensService]
})
export class AuthorizationModule {}
