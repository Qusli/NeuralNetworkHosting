import { IsBoolean, IsEnum, IsNotEmpty, IsNotEmptyObject } from "class-validator"
import { EnumEntity } from "../../enums/entity.enum"
import { User } from "src/users/entities/user.entity"

export class CreateUserPermissionDto {
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
    user: User | Pick<User, "id">
}