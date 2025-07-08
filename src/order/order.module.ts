import { Module } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { PrismaService } from "src/prisma.service";
import { AddressModule } from "src/address/address.module";

@Module({
    controllers: [OrderController],
    providers: [OrderService, PrismaService],
    exports: [OrderService],
    imports: [AddressModule],
})
export class OrderModule {}
