import { UserRole } from "src/entity/user.entity";
import { IsEmail, IsEnum, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterDTO {
    @ApiProperty()
    @IsString()
    firstName: string;

    @ApiProperty()
    @IsString()
    lastName: string;

    @ApiProperty()
    @IsString()
    password: string;

    @ApiProperty()
    @IsEmail()
    email: string
}