import { PartialType } from "@nestjs/swagger";
import { CreateArticleDto } from "./create-article.dto";
import { IsArray, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class UpdateArticleDto extends PartialType(CreateArticleDto) {
    @IsArray()
    @Type(() => String)
    @IsOptional()
    usersIDs?: string[];
}
