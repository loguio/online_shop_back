import { Module } from "@nestjs/common";
import { ArticleService } from "./article.service";
import { ArticleController } from "./article.controller";
import { PrismaService } from "src/prisma.service";

@Module({
    controllers: [ArticleController],
    providers: [ArticleService, PrismaService],
    exports: [ArticleService],
})
export class ArticleModule {}
