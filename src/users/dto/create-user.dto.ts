import { ApiProperty } from "@nestjs/swagger"
import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateUserDto {
    @ApiProperty({
        description: 'Fullname of the user',
        example: 'Eshmat Toshmatov',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    fullname: string

    @ApiProperty({
        description: 'Birth date of the user',
        example: '25.09.2006',
        required: false
    })
    @IsNotEmpty()
    birthDate: string

    @ApiProperty({
        description: 'Phone number of the user',
        example: '+998975453270',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    phoneNumber: string

    @ApiProperty({
        description: 'Login of the user',
        example: 'eshmat@gmail.com',
        required: true
    })
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    login: string

    @ApiProperty({
        description: 'Password of the user',
        example: 'eshmat1111',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    password: string
}
