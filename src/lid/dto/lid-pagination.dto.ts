import { IsNumber, IsOptional } from "class-validator"

export class LidPaginationDto {
    @IsOptional()
    @IsNumber()
    skip: number
    
    @IsOptional()
    @IsNumber()
    limit: number
}