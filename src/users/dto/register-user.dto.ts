import { IsNotEmpty, IsString } from "class-validator";

export class RegisterUserDto {
    @IsNotEmpty()
    @IsString()
    login: string

    @IsNotEmpty()
    @IsString()
    password: string
}