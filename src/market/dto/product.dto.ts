import { IsOptional, IsString } from "class-validator";

export class ProductDTO {
    @IsString()
    @IsOptional()
    image: string

    @IsString()
    product: string
}