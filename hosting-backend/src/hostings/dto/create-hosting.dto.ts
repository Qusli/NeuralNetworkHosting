import { IsNotEmpty, IsNotEmptyObject, IsNumber, IsString, MaxLength } from "class-validator"
import { Workplace } from "src/workplaces/entities/workplace.entiy"

export class CreateHostingDto {
    @IsNotEmpty()
    @IsNumber()
    id: number

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    title: string

    @IsString()
    description?: string
    
    @IsNotEmpty()
    @IsString()
    host: string

    @IsNotEmpty()
    @IsNumber()
    port: number

    @IsNotEmptyObject()
    workplace: Workplace | Pick<Workplace, "id">
}
