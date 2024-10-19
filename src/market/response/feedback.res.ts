import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { RUserDTO } from "src/user/response-dto/users.dto";

export class RFeedbackDTO {
    @ApiProperty()
    @Expose()
    id: number

    @ApiProperty()
    @Expose()
    user: RUserDTO

    @ApiProperty()
    @Expose()
    comment: string

    @ApiProperty()
    @Expose()
    rating: number
}