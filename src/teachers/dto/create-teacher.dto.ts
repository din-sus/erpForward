import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateTeacherDto {
    @ApiProperty({
        description: 'Fullname of Teacher',
        example: 'Eshmat Teshamatov',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    fullname: string

    @ApiProperty({
        description: 'Age of Teacher',
        example: 22,
        required: true
    })
    @IsNotEmpty()
    @IsNumber()
    age: number

    @ApiProperty({
        description: 'Phone number of Teacher',
        example: '+998973333333',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    phoneNumber: string

    @ApiProperty({
        description: 'Login of Teacher',
        example: 'eshmat@gmail.com',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    login: string

    @ApiProperty({
        description: 'Password of Teacher',
        example: '1111',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    password: string

    // role: string
    @ApiProperty({
        description: 'IELTS score of Teacher',
        example: '7.5',
        required: true
    })
    @IsNotEmpty()
    @IsString()
    IELTSscore: string

    @ApiProperty({
        description: 'IELTS score image of Teacher',
        example: 'link',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    IELTSscoreImg: string

    @ApiProperty({
        description: 'Teacher image of Teacher',
        example: 'link',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    teacherImg: string

    @ApiProperty({
        description: 'Working branch of Teacher',
        example: 'Chilonzor',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    workingBranch: string

    @ApiProperty({
        description: 'Country address of Teacher',
        example: 'Tashkent',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    countryAddress: string
    //groups: Groups[]
}
