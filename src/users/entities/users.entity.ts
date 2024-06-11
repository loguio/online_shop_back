import { Address } from "src/address/entities/address.entity";
import { Article } from "src/article/entities/article.entity";
import { Order } from "src/order/entities/order.entity";

export class User {
    id: string;
    userName: string;
    order: Order[];
    shoppingCart: Article[];
    address: Address | null;
}
