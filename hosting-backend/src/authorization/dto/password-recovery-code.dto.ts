import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator"

export class PasswordRecoveryCodeDto {
    @IsNotEmpty()
    @IsNumber()
    code: number

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    password: string

    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    repeatPassword: string
}