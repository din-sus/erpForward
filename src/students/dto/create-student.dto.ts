import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateStudentDto {
    @ApiProperty({
        description: 'Name of the student',
        example: "Eshamat Toshmatov",
        required: true
    })
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({
        description: 'Phone number of the student',
        example: "+998997777777",
        required: true
    })
    @IsString()
    @IsNotEmpty()
    phoneNumber: string

    @ApiProperty({
        description: 'Level of the student',
        example: "Beginner",
        required: false
    })
    @IsString()
    @IsOptional()
    level?: string

    @ApiProperty({
        description: 'Branch of the student',
        example: "Chilonzor",
        required: false
    })
    @IsString()
    @IsOptional()
    branch?: string

    @ApiProperty({
        description: 'Balance of the student',
        example: "10000",
        required: false
    })
    @IsNumber()
    @IsOptional()
    balance?: number

    @ApiProperty({
        description: 'Group name of the student',
        example: "N9",
        required: true
    })
    @IsString()
    @IsNotEmpty()
    groupName: string

    @ApiProperty({
        description: 'Birth date of the student',
        example: "12.12.2012",
        required: true
    })
    @IsString()
    @IsNotEmpty()
    birthDate: string

    @ApiProperty({
        description: 'Gender of the student',
        example: "male",
        required: true
    })
    @IsString()
    @IsNotEmpty()
    gender: string

    @ApiProperty({
        description: 'Course started date of the student',
        example: "12.12.2024",
        required: false
    })
    @IsString()
    @IsOptional()
    courseStartingDate?: string

    @ApiProperty({
        description: 'Course ended date of the student',
        example: "12.12.2025",
        required: false
    })
    @IsString()
    @IsOptional()
    courseEndingDate?: string
}
