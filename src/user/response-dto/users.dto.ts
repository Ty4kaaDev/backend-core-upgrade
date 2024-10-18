import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";
import { ApiExpectationFailedResponse, ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { UserRole } from "src/entity/user.entity";

export class RUserDTO {
    @ApiProperty({
        type: Number,
        example: 1
    })
    @Expose()
    id: number

    @ApiProperty({
        example: 'John'
    })
    @Expose()
    firstName: string

    @ApiProperty({
        example: 'Doe'
    })
    @Expose()
    lastName: string

    @ApiProperty({
        description: "User role enum",
        example: UserRole.USER
    })
    @Expose()
    role: UserRole

    @ApiProperty({example: 'X2y2P@example.com'})
    @Expose()
    email: string
}

export class RUsersDTO {
    @ApiProperty({
        type: Array<RUserDTO>,
        example: [
            {
                id: 1,
                firstName: 'John',
                lastName: 'Doe',
                role: 'USER',
                email: 'X2y2P@example.com'
            }
        ]
    })
    @Expose()
    users: Array<RUserDTO>

    @ApiProperty({
        type: Number,
        example: 10,
        description: "max pages"
    })
    @Expose()
    pages: number
}