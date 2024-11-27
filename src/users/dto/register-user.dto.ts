import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RegisterUserDto {
    @ApiProperty({
        description: 'Login of the user',
        example: 'eshmat@gmail.com',
        required: true
    })
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    login: string

    @ApiProperty({
        description: 'Password of the user',
        example: 'eshmat1111',
        required: true
    })
    @IsNotEmpty()
    @IsString()
    password: string
}