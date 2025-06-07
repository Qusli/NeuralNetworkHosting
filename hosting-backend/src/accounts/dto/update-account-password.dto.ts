import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';
export class UpdateAccountPasswordDto {
    @IsNotEmpty()
    @IsNumber()
    id: number

    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    currentPassword: string

    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    newPassword: string
}