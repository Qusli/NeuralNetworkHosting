import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ERole } from "../enums/role.enum";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<ERole[]>("roles", [
            context.getHandler(),
            context.getClass(),
        ])

        if (!requiredRoles) {
            return true
        }

        const { role } = context.switchToHttp().getRequest()

        return requiredRoles.some(_role => role === _role)
    }
}