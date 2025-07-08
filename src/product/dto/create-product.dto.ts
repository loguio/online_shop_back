import { IsNumber, IsString } from "class-validator";
import { CreateProductImageDto } from "src/product-image/dto/create-product-image.dto";

export class CreateProductDto {
    @IsString()
    name: string;

    @IsNumber()
    price: number;

    images: CreateProductImageDto[];
}
