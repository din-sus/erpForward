import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
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
