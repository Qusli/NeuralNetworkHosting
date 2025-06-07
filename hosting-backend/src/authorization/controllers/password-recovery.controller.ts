import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { PasswordRecoveryService } from "../services/password-recovery.service";
import { PasswordRecoveryCodeDto } from "../dto/password-recovery-code.dto";

@Controller('recovery-password')
export class PasswordRecoverController {
    constructor(
        private readonly service: PasswordRecoveryService,
      ) {}

    @HttpCode(HttpStatus.OK)
    @Post("create-by-email")
    async createByEmail(@Body("email") email: string) {
      return this.service.createByEmail(email)
    }

    @HttpCode(HttpStatus.OK)
    @Post("confirm")
    async confirm(@Body("code") code: number) {
      return this.service.confirm(code)
    }

    @HttpCode(HttpStatus.OK)
    @Post("recovery")
    async recoveryPassword(@Body() dto: PasswordRecoveryCodeDto) {
      return this.service.recovery(dto)
    }
}