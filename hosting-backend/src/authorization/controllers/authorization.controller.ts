import { Body, Controller, HttpCode, HttpException, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthorizationService } from '../services/authorization.service';
import { SignInDto } from '../dto/sign-in.dto';
import { SignUpDto } from '../dto/sign-up.dto';
import { ISignUpResponse } from '../interfaces/sign-up-response.interface';
import { TokenGuard } from '../guard/token.guard';
import { ActiveTokensService } from '../services/active-tokens.service';
import { ISignInResponse } from '../interfaces/sign-in-reponse.interface';
import { ITokenPayload } from '../interfaces/token-payload.interface';
import { GetAccount } from 'decorator/account.decorator';

@Controller('authorization')
export class AuthorizationController {
  constructor(
    private readonly service: AuthorizationService,
    private readonly revokedTokenService: ActiveTokensService
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post("sign-in")
  async signIn(@Body() dto: SignInDto): Promise<ISignInResponse> {
    return this.service.signIn(dto)
  }

  @HttpCode(HttpStatus.OK)
  @Post("sign-up")
  async signUp(@Body() dto: SignUpDto): Promise<ISignUpResponse> {
    return this.service.signUp(dto)
  }

  @UseGuards(TokenGuard)
  @HttpCode(HttpStatus.OK)
  @Post("logout")
  async revokedToken(@GetAccount() account: ITokenPayload): Promise<void> {
    if (!account.jti) {
      throw new HttpException("jti is empty", HttpStatus.BAD_REQUEST)
    } 
    
    await this.revokedTokenService.delete(account.jti)
  }
}
