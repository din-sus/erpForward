import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginUserDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    login: string

    @IsNotEmpty()
    @IsString()
    password: string
}