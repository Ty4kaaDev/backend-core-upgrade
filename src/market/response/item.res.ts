import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { RFeedbackDTO } from "./feedback.res";

export class RItemDTO {
    @ApiProperty({
        example: 1
    })
    @Expose()
    id: number

    @ApiProperty()
    @Expose()
    name: string

    @ApiProperty()
    @Expose()
    description: string

    @ApiProperty()
    @Expose()
    price: number

    @ApiProperty()
    @Expose()
    productId: number

    @ApiProperty({
        example: [
            {
                id: 1,
                comment: "nice product",
                rating: 5,
                user: {
                    id: 1,
                    firstName: "John",
                    lastName: "Doe",
                    role: "USER",
                    email: "X2y2P@example.com"
                }
            }
        ]
    })
    @Expose()
    feedbacks: Array<RFeedbackDTO>
}