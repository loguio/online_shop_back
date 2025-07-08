import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Controller("product")
export class ProductController {
    constructor(private readonly articleService: ProductService) {}

    @Post()
    create(@Body() createProductDto: CreateProductDto) {
        return this.articleService.create(createProductDto);
    }

    @Get()
    findAll() {
        return this.articleService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.articleService.findOne(id);
    }

    @Patch(":id")
    update(
        @Param("id") id: string,
        @Body() updateProductDto: UpdateProductDto,
    ) {
        return this.articleService.update(id, updateProductDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.articleService.remove(id);
    }
}
