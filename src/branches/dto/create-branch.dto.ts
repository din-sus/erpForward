import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBranchDto {
    @ApiProperty({
        description: "Name of the Branch",
        example: "Chilonzor | Pushkin",
        required: true
    })
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({
        description: "Room name of the Branch",
        example: "201 | 209",
        required: true
    })
    @IsString()
    @IsNotEmpty()
    roomName: string

    @ApiProperty({
        description: "Location name of the Branch",
        required: true
    })
    @IsString()
    @IsNotEmpty()
    locationName: string

    @ApiProperty({
        description: "Location link of the Branch",
        example: "link",
        required: true
    })
    @IsString()
    @IsNotEmpty()
    locationLink: string

    @ApiProperty({
        description: "Branch capacity of the Branch",
        example: 1000,
        required: true
    })
    @IsString()
    @IsNotEmpty()
    branchCapacity: string

    @ApiProperty({
        description: "Room capacity of the Branch",
        example: 1000,
        required: true
    })
    @IsString()
    @IsNotEmpty()
    roomCapacity: string
}
