import { PartialType } from "@nestjs/mapped-types";
import { CreateUserPermissionDto } from "./create-user-permission.dto";
import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateUserPermissionDto extends PartialType(CreateUserPermissionDto) {
    @IsNotEmpty()
    @IsNumber()
    id: number
}