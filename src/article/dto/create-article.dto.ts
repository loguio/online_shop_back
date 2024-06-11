import { IsNumber, IsString } from "class-validator";

export class CreateArticleDto {
    @IsString()
    name: string;

    @IsNumber()
    price: number;

    @IsString()
    image: string;
}
