import { Module } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { PrismaService } from "src/prisma.service";
import { AddressModule } from "src/address/address.module";
import { ArticleInstanceModule } from "src/article-instance/article-instance.module";

@Module({
    controllers: [OrderController],
    providers: [OrderService, PrismaService],
    exports: [OrderService],
    imports: [AddressModule, ArticleInstanceModule],
})
export class OrderModule {}
