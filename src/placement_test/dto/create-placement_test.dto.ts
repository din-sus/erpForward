import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreatePlacementTestDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    surname: string

    @IsString()
    @IsNotEmpty()
    phoneNumber: string

    @IsNumber()
    @IsOptional()
    module1?: number
    
    @IsNumber()
    @IsOptional()
    module2?: number

    @IsNumber()
    @IsOptional()
    module3?: number

    @IsString()
    @IsOptional()
    writing?: string

    @IsNumber()
    @IsOptional()
    total?: number

    @IsString()
    @IsOptional()
    level?: string

    @IsNumber()
    @IsOptional()
    writingMark?: number
}
