import { Injectable } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { PrismaService } from "src/prisma.service";
import { orderStatus } from "@prisma/client";
import { Address } from "src/address/entities/address.entity";
import { orderSelector } from "./selector/order.selector";
import { Article } from "src/article/entities/article.entity";
import { AddressService } from "src/address/address.service";
import { ArticleInstanceService } from "src/article-instance/article-instance.service";

@Injectable()
export class OrderService {
    constructor(
        readonly prismaService: PrismaService,
        readonly addressService: AddressService,
        readonly articleInstanceService: ArticleInstanceService,
    ) {}

    async create(createOrderDto: CreateOrderDto) {
        let existingAddress: Address | null = null;
        try {
            existingAddress = await this.prismaService.address.findFirstOrThrow(
                {
                    where: {
                        city: createOrderDto.shipTo.address,
                        address: createOrderDto.shipTo.address,
                        zipCode: createOrderDto.shipTo.zipCode,
                    },
                },
            );
        } catch (e) {}

        let listArticles: Article[] | null = null;
        try {
            listArticles = await this.prismaService.article.findMany({
                where: { id: { in: createOrderDto.articleIDs } },
            });
        } catch (e) {}

        return await this.prismaService.order.create({
            data: {
                user: { connect: { id: createOrderDto.userID } },
                articles: {
                    createMany: {
                        data: listArticles.map((el) => ({
                            articleID: el.id,
                            price: el.price,
                        })),
                    },
                },
                status: orderStatus.CREATED,
                shipTo: {
                    connectOrCreate: {
                        where: {
                            id: existingAddress ? existingAddress.id : "",
                        },
                        create: { ...createOrderDto.shipTo },
                    },
                },
            },
        });
    }

    async findAll() {
        return await this.prismaService.order.findMany({
            select: orderSelector,
        });
    }

    async findOne(id: string) {
        const result = await this.prismaService.order.findFirst({
            where: { id },
            include: { articles: true, shipTo: true, user: true },
        });
        return result;
    }

    async update(id: string, updateOrderDto: UpdateOrderDto) {
        let existingAddress: Address | null = null;
        try {
            existingAddress = await this.prismaService.address.findFirstOrThrow(
                {
                    where: {
                        order: { id },
                    },
                },
            );
        } catch (e) {}

        return await this.prismaService.order.update({
            where: { id },
            data: {
                shipped: updateOrderDto.shipped,
                shipTo: existingAddress
                    ? {
                          update: {
                              where: {
                                  id: existingAddress.id,
                              },
                              data: { ...updateOrderDto.shipTo },
                          },
                      }
                    : {
                          create: {
                              ...updateOrderDto.shipTo,
                          },
                      },
            },
        });
    }

    async remove(id: string) {
        const result = await this.findOne(id);
        result.articles.forEach(
            async (el) => await this.articleInstanceService.remove(el.id),
        );
        await this.prismaService.order.delete({ where: { id } });
        await this.addressService.remove(result.shipTo.id);
    }
}
