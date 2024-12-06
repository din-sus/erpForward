import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateGroupDto {
    @ApiProperty({
        description: 'Name of the Group',
        example: 'N10',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    name:  string

    @ApiProperty({
        description: 'Level of the Group',
        example: 'Beginner',
        required: true
    })
    @IsNotEmpty()
    @IsString()
    level: string

    @ApiProperty({
        description: 'Teacher name of the Group',
        example: 'Fozilkhon Aliev',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    teacherName: string

    @ApiProperty({
        description: 'Lesson days of the Group',
        example: 'Mon, Wed, Fr',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    daysOfLessons: string

    @ApiProperty({
        description: 'Starting and ending time of the Group',
        example: '15:00-16:30',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    startingEndingTime: string

    @ApiProperty({
        description: 'Branch name of the Group',
        example: 'Chilonzor',
        required: true
    })
    @IsNotEmpty()
    @IsString()
    branch: string

    @ApiProperty({
        description: 'Status of the Group',
        example: 'Active | Deactive',
        required: true
    })
    @IsNotEmpty()
    @IsString()
    status: string

    @IsString()
    @IsNotEmpty()
    courseStartingDate: string

    @IsString()
    @IsNotEmpty()
    courseEndingDate: string
}
