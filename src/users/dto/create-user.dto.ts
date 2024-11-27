import { IsDate, IsNotEmpty, IsString } from "class-validator"
import { Date } from "mongoose"

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    surname: string

    @IsString()
    photo: string

    @IsDate()
    @IsNotEmpty()
    birthDate: Date

    @IsString()
    @IsNotEmpty()
    phoneNumber: number

    @IsString()
    @IsNotEmpty()
    login: string

    @IsString()
    @IsNotEmpty()
    password: string
}
