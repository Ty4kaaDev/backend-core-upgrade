import { UserRole } from "src/entity/user.entity";
import { IsEmail, IsEnum, IsString } from "class-validator";

export class RegisterDTO {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    password: string;

    @IsEmail()
    email: string
}