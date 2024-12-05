import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateTeacherDto {
    @IsString()
    @IsNotEmpty()
    fullname: string

    @IsNotEmpty()
    @IsNumber()
    age: number

    @IsString()
    @IsNotEmpty()
    phoneNumber: string

    @IsString()
    @IsNotEmpty()
    login: string

    @IsString()
    @IsNotEmpty()
    password: string

    // role: string
    @IsNotEmpty()
    @IsString()
    IELTSscore: string

    @IsString()
    @IsNotEmpty()
    IELTSscoreImg: string

    @IsString()
    @IsNotEmpty()
    teacherImg: string

    @IsString()
    @IsNotEmpty()
    workingBranch: string

    @IsString()
    @IsNotEmpty()
    countryAddress: string
    //groups: Groups[]
}
