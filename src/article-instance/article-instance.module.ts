import { Module } from "@nestjs/common";
import { ArticleInstanceService } from "./article-instance.service";
import { ArticleInstanceController } from "./article-instance.controller";
import { PrismaService } from "src/prisma.service";

@Module({
    controllers: [ArticleInstanceController],
    providers: [ArticleInstanceService, PrismaService],
    exports: [ArticleInstanceService],
})
export class ArticleInstanceModule {}
