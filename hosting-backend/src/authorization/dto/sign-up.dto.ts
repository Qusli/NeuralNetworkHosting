import { IsNotEmpty, IsEmail, IsString, MinLength } from "class-validator"

export class SignUpDto {
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