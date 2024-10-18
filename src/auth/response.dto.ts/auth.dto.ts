import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { RUserDTO } from "src/user/response-dto/users.dto";

export class RAuthDTO {
    @ApiProperty({
        type: RUserDTO,
        example: {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            role: 'USER',
            email: 'X2y2P@example.com'
        }
    })
    @Expose()
    user: RUserDTO

    @ApiProperty({
        type: String,
        description: "JWT token",
    })
    @Expose()
    token: string
}