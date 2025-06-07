import { IsNotEmpty, IsString, MaxLength } from "class-validator"
import { Workplace } from "src/workplaces/entities/workplace.entiy"

export class CreateIntegrationDto {
    @IsNotEmpty()
    @IsString()
    uuid: string

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    title: string

    @IsString()
    description?: string

    @IsNotEmpty()
    workplace: Workplace | { id: number }
}