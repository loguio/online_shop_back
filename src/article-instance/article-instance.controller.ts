import { Controller, Get, Body, Patch, Param, Delete } from "@nestjs/common";
import { ArticleInstanceService } from "./article-instance.service";
import { UpdateArticleInstanceDto } from "./dto/update-article-instance.dto";

@Controller("article-instance")
export class ArticleInstanceController {
    constructor(
        private readonly articleInstanceService: ArticleInstanceService,
    ) {}

    // @Post()
    // create(@Body() createArticleInstanceDto: CreateArticleInstanceDto) {
    //     return this.articleInstanceService.create(createArticleInstanceDto);
    // }

    @Get()
    findAll() {
        return this.articleInstanceService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.articleInstanceService.findOne(id);
    }

    @Patch(":id")
    update(
        @Param("id") id: string,
        @Body() updateArticleInstanceDto: UpdateArticleInstanceDto,
    ) {
        return this.articleInstanceService.update(id, updateArticleInstanceDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.articleInstanceService.remove(id);
    }
}
