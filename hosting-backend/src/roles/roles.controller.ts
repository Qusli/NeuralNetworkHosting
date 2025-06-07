import { Body, Controller, Get, Query, UseGuards } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { Role } from "./entities/role.entity";
import { TokenGuard } from "src/authorization/guard/token.guard";

@UseGuards(TokenGuard)
@Controller("roles")
export class RolesController {
    constructor(private readonly service: RolesService) {}

    @Get("all/by-workplace-id")
    async getAll(@Query("workplaceId") workplaceId: number): Promise<Role[]> {
        return this.service.getAllByWorkplaceId(workplaceId)
    }
}