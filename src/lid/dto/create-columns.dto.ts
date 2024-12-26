import { IsString, IsArray, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateLidDto } from './create-lid.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ColumnsDto {
    @ApiProperty({
        description: "The title of the Column",
        example: "Column 1",
        required: true
    })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        description: "The status of the Column",
        example: "Waiting for",
        required: true
    })
    @IsNotEmpty()
    @IsString()
    status: string
  
    @ApiProperty({
        description: "The color of the Column",
        required: true
    })
    @IsString()
    @IsNotEmpty()
    color: string;

    @ApiProperty({
        description: "Column's leads",
        required: false
    })
    items: []
}
