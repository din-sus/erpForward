import { IsNotEmpty, IsString } from "class-validator";

export class CreateGroupDto {
    @IsString()
    @IsNotEmpty()
    name:  string

    @IsNotEmpty()
    @IsString()
    level: string

    @IsString()
    @IsNotEmpty()
    teacherName: string

    @IsString()
    @IsNotEmpty()
    daysOfLessons: string

    @IsNotEmpty()
    @IsString()
    branch: string

    @IsNotEmpty()
    @IsString()
    status: string
}
