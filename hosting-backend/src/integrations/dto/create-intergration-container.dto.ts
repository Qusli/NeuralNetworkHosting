import { IsNotEmpty, IsNotEmptyObject } from "class-validator"
import { Integration } from "../entities/integration.entity"

export class CreateIntegrationContainerDto {
    @IsNotEmpty()
    containerUuid: string

    @IsNotEmptyObject()
    integration: Integration | { uuid: string }
}