import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateArticleDto } from "./dto/create-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";
import { PrismaService } from "src/prisma.service";
import { Article } from "./entities/article.entity";
import { articleSelector } from "./selector/article.selector";

@Injectable()
export class ArticleService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createArticleDto: CreateArticleDto): Promise<Article> {
        const result = await this.prismaService.article.create({
            data: { ...createArticleDto },
        });
        return result;
    }

    async findAll(): Promise<Article[]> {
        let result;
        try {
            result = await this.prismaService.article.findMany({
                select: articleSelector,
            });
        } catch (e) {
            throw new BadRequestException();
        }
        return result;
    }

    async findOne(id: string) {
        let result;
        try {
            result = await this.prismaService.article.findUniqueOrThrow({
                include: { users: true },
                where: { id },
            });
        } catch (e) {
            throw new BadRequestException();
        }
        return result;
    }

    async update(id: string, updateArticleDto: UpdateArticleDto) {
        console.log(updateArticleDto.usersIDs);
        const { usersIDs, ...other } = updateArticleDto;
        const result = await this.prismaService.article.update({
            where: { id },
            data: {
                ...other,
                users: updateArticleDto.usersIDs
                    ? {
                          set: [],
                          connect: usersIDs.map((el) => ({
                              id: el,
                          })),
                      }
                    : undefined,
            },
            include: { users: true, articleInstance: true },
        });
        return result;
    }

    async remove(id: string) {
        const result = await this.prismaService.article.delete({
            where: { id },
        });

        return result;
    }
}
