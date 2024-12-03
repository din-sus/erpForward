import { IsNotEmpty, IsString } from "class-validator"

export class CreateLidDto {
    @IsString()
    @IsNotEmpty()
    fullname: string

    @IsNotEmpty()
    @IsString()
    phoneNumber: string

    @IsString()
    @IsNotEmpty()
    branch: string
}
