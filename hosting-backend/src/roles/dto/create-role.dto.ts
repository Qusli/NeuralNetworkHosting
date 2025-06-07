import { Workplace } from "src/workplaces/entities/workplace.entiy";
import { ERole } from "../enums/role.enum";
import { ERoleType } from "../enums/role-type.enum";
import { IsEnum, IsNotEmpty, IsNotEmptyObject, IsString, MaxLength, MinLength } from "class-validator";

export class CreateRoleDto {
    @IsString()
    @MaxLength(20)
    label: string

    @IsNotEmpty()
    @IsEnum(ERoleType)
    type: ERoleType

    @IsNotEmptyObject()
    workplace: Workplace | Pick<Workplace, "id">
}