import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class SelfTeacherUpdateDto {
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
    @IsString()
    age: string

    @ApiProperty({
        description: 'Phone number of Teacher',
        example: '+998973333333',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    phoneNumber: string

    // role: string

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
