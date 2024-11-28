import { ApiProperty } from "@nestjs/swagger"
import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateUserDto {
    @ApiProperty({
        description: 'Name of the user',
        example: 'Eshmat',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({
        description: 'Surname of the user',
        example: 'Toshmatov',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    surname: string

    @ApiProperty({
        description: 'Photo of the user',
        example: 'https://i.pinimg.com/736x/91/36/d5/9136d5fd9ef02d299e51986be545a10e.jpg',
        required: false
    })
    @IsString()
    @IsOptional()
    photo?: string

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
