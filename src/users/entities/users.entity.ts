import { Address } from "src/address/entities/address.entity";
import { ArticleEntity } from "src/article/entities/article.entity";
import { OrderEntity } from "src/order/entities/order.entity";

export class User {
    id: string;
    userName: string;
    order: OrderEntity[];
    shoppingCart: ArticleEntity[];
    address: Address | null;
    refreshToken: string;
}

export class UserEntity {
    id: string;
    userName: string;
    address: Address | null;
}
