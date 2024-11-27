import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RegisterUserDto {
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    login: string

    @IsNotEmpty()
    @IsString()
    password: string
}