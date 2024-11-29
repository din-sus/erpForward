import { IsNumber, IsOptional } from "class-validator"

export class TestPaginationDto {
    @IsOptional()
    @IsNumber()
    skip: number
    
    @IsOptional()
    @IsNumber()
    limit: number
}