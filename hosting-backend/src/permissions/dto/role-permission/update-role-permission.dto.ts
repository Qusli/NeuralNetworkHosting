import { PartialType } from "@nestjs/mapped-types";
import { CreateRolePermissionDto } from "./create-role-permission.dto";
import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateRolePermissionDto extends PartialType(CreateRolePermissionDto) {
    @IsNotEmpty()
    @IsNumber()
    id: number
}