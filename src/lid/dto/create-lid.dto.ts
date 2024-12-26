import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class CreateLidDto {
    @ApiProperty({
        description: 'fullname of the user',
        example: 'Eshmat Toshmatov',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    fullname: string

    @ApiProperty({
        description: 'Phone number of the user',
        example: '+998975453232',
        required: true
    })
    @IsNotEmpty()
    @IsString()
    phoneNumber: string

    @ApiProperty({
        description: 'Branch where user studies',
        example: 'Chilonzor',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    branch: string

    @ApiProperty({
        description: 'The status of the user',
        example: "Waiting | Inquires",
        required: true
    })
    @IsString()
    @IsNotEmpty()
    status: string
}
