import { IsNumber, IsOptional } from "class-validator"

export class GroupPaginationDto {
    @IsOptional()
    @IsNumber()
    skip: number
    
    @IsOptional()
    @IsNumber()
    limit: number
}