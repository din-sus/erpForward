import { IsDate, IsEmail, IsNotEmpty, IsString } from "class-validator"

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    surname: string

    @IsString()
    photo: string

    @IsNotEmpty()
    birthDate: string

    @IsString()
    @IsNotEmpty()
    phoneNumber: string

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    login: string

    @IsString()
    @IsNotEmpty()
    password: string
}
