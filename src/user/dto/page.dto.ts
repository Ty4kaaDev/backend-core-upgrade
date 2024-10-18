import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";

export class PaginationDTO {
    @ApiProperty({})
    @IsNumberString()
    page: number

    @ApiProperty()
    @IsNumberString()
    limit: number
}