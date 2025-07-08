import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { PrismaService } from "src/prisma.service";
import { Product, ProductEntity } from "./entities/product.entity";
import { productSelector } from "./selector/product.selector";

@Injectable()
export class ProductService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createProductDto: CreateProductDto) {
        let result: Product;
        const productName = await this.prismaService.product.findUnique({
            where: { name: createProductDto.name },
        });
        console.log(productName);
        if (productName) {
            throw new BadRequestException(
                "Un produit du même nom existe déjà.",
            );
        }
        try {
            result = await this.prismaService.product.create({
                data: { ...createProductDto },
            });
        } catch (e) {
            console.error(e);
        }
        return result;
    }

    async findAll(): Promise<ProductEntity[]> {
        let result: ProductEntity[];
        try {
            result = await this.prismaService.product.findMany({
                select: productSelector,
            });
        } catch (e) {
            throw new BadRequestException();
        }
        return result;
    }

    async findOne(id: string): Promise<ProductEntity> {
        let result: ProductEntity;
        try {
            result = await this.prismaService.product.findUniqueOrThrow({
                // include: { users: true },
                where: { id },
                select: productSelector,
            });
        } catch (e) {
            throw new BadRequestException();
        }
        return result;
    }

    async update(id: string, updateProductDto: UpdateProductDto) {
        const result = await this.prismaService.product.update({
            where: { id },
            data: {
                ...updateProductDto,
            },
        });
        return result;
    }

    async remove(id: string) {
        const result = await this.prismaService.product.delete({
            where: { id },
        });

        return result;
    }
}
