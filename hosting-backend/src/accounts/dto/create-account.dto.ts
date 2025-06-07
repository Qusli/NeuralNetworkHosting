import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"

export class CreateAccountDto {
    @IsNotEmpty()
    @IsEmail()
    email: string
    
    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    password: string
}