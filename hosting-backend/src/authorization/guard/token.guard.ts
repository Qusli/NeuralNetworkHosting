import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthorizationService } from "../services/authorization.service";
import { ITokenPayload } from "../interfaces/token-payload.interface";
import { Request, Response } from "express";
import { ActiveTokensService } from "../services/active-tokens.service";

@Injectable()
export class TokenGuard implements CanActivate {
    constructor(
        private readonly service: AuthorizationService,
        private readonly activeTokensService: ActiveTokensService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest()

        const token = this.extractTokenFromHeader(request)

        if (!token) {
            throw new UnauthorizedException()
        }
        
        try {
            const decode = await this.service.verifyJwtToken(token) as ITokenPayload

            const exists = await this.activeTokensService.existsByJti(decode.jti)

            if (!exists) {
                throw new UnauthorizedException()
            }

            request['account'] = {
                id: decode.accountId,
                email: decode.accountEmail,
                jti: decode.jti
            }
        } catch {
            throw new UnauthorizedException()
        }

        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}