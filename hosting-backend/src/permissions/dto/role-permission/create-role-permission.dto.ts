import { Role } from "src/roles/entities/role.entity"
import { EnumEntity } from "../../enums/entity.enum"
import { IsBoolean, IsEnum, IsNotEmpty, IsNotEmptyObject, isNotEmptyObject } from "class-validator"

export class CreateRolePermissionDto {
    @IsNotEmpty()
    @IsBoolean()
    create: boolean
    
    @IsNotEmpty()
    @IsBoolean()
    read: boolean
    
    @IsNotEmpty()
    @IsBoolean()
    update: boolean
    
    @IsNotEmpty()
    @IsBoolean()
    delete: boolean
    
    @IsNotEmpty()
    @IsEnum(EnumEntity)
    entity: EnumEntity

    @IsNotEmptyObject()
    role: Role | Pick<Role, "id">
}