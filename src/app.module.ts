import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { APP_GUARD } from "@nestjs/core";
import { AtGuard } from "./auth/auth.guard";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { ConfigModule } from "@nestjs/config";
import { ArticleModule } from "./article/article.module";
import { OrderModule } from "./order/order.module";
import { AddressModule } from "./address/address.module";
import { ArticleInstanceModule } from "./article-instance/article-instance.module";

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
        ArticleInstanceModule,
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
