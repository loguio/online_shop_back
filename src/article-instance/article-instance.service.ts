import { Injectable } from "@nestjs/common";
import { UpdateArticleInstanceDto } from "./dto/update-article-instance.dto";
import { PrismaService } from "src/prisma.service";
import { articleInstanceSelector } from "./selector/articleInstance.selector";

@Injectable()
export class ArticleInstanceService {
    constructor(readonly prismaService: PrismaService) {}

    // async create(createArticleInstanceDto: CreateArticleInstanceDto) {
    //     return await this.prismaService.articleInstance.create({
    //         data: {
    //             price: createArticleInstanceDto.price,
    //             article: {
    //                 connect: { id: createArticleInstanceDto.articleID },
    //             },
    //             order: { connect: { id: createArticleInstanceDto.orderID } },
    //         },
    //         select: articleInstanceSelector,
    //     });
    // }

    async findAll() {
        return await this.prismaService.articleInstance.findMany({
            select: articleInstanceSelector,
        });
    }

    async findOne(id: string) {
        return await this.prismaService.articleInstance.findUniqueOrThrow({
            where: { id },
            select: articleInstanceSelector,
        });
    }

    async update(
        id: string,
        updateArticleInstanceDto: UpdateArticleInstanceDto,
    ) {
        return await this.prismaService.articleInstance.update({
            where: { id },
            data: {
                price: updateArticleInstanceDto.price,
                article: {
                    connect: { id: updateArticleInstanceDto.articleID },
                },
                order: { connect: { id: updateArticleInstanceDto.orderID } },
            },
        });
    }

    async remove(id: string) {
        return await this.prismaService.articleInstance.delete({
            where: { id },
        });
    }
}
