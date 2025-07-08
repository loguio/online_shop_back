import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { APP_GUARD } from "@nestjs/core";
import { AtGuard } from "./auth/auth.guard";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { ConfigModule } from "@nestjs/config";
import { ArticleModule } from "./product/product.module";
import { OrderModule } from "./order/order.module";
import { AddressModule } from "./address/address.module";
import { ProductImageModule } from './product-image/product-image.module';
import { OrderHistoryModule } from './order-history/order-history.module';
import { OrderItemModule } from './order-item/order-item.module';
import { CartModule } from './cart/cart.module';
import { CartItemModule } from './cart-item/cart-item.module';
import { ProductImageModule } from './product-image/product-image.module';

@Module({
    imports: [
        AuthModule,
        UsersModule,
        ConfigModule.forRoot({ isGlobal: true }),
        ThrottlerModule.forRoot([
            {
                ttl: 60000,
                limit: 100,
            },
        ]),
        ArticleModule,
        OrderModule,
        AddressModule,
        ProductImageModule,
        CartItemModule,
        CartModule,
        OrderItemModule,
        OrderHistoryModule,
    ],
    controllers: [],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AtGuard,
        },
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
    ],
})
export class AppModule {}
