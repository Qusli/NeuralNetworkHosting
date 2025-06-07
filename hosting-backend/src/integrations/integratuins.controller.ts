import { Body, Controller, Param, Post } from "@nestjs/common";
import { integrationsService } from "./integrations.service";

@Controller("integrations")
export class integrationsController {
    constructor(private readonly service: integrationsService) {}
    
    @Post("create")
    async create(@Body() body: any) {
        return this.service.create(body.integration, body.integrationContainers ?? [])
    }

    @Post("post-data/:uuid")
    async postData(@Param("uuid") uuid: string, @Body() body: any) {

    }
}