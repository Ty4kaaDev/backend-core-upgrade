import { ApiProperty, ApiResponseProperty } from "@nestjs/swagger"
import { Expose } from "class-transformer"
import { User } from "src/entity/user.entity"
import { RUserDTO } from "src/user/response-dto/users.dto"

export class RProductDTO {
    @ApiProperty({
        example: 1
    })
    @Expose()
    id: number
    
    @ApiProperty({
        example: "base64"
    })
    @Expose()
    image: string | null

    @ApiProperty({
        example: "product"
    })
    @Expose()
    product: string

    @ApiProperty({
        example: RUserDTO
    })
    @Expose()
    author: RUserDTO
}