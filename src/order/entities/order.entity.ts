import { orderStatus } from "@prisma/client";
import { Address } from "src/address/entities/address.entity";
import { ArticleInstance } from "src/article-instance/entities/article-instance.entity";
import { User } from "src/users/entities/users.entity";

export class Order {
    id: string;
    status: orderStatus;
    articles: ArticleInstance[];
    user: User;
    shipped: Date;
    shipTo: Address;
}

export class OrderEntity {
    id: string;
    status: orderStatus;
    userID: string;
    shipped: Date;
    shipToID: string;
}
