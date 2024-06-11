import { addressSelector } from "src/address/selector/address.selector";
import { articleSelector } from "src/article/selector/article.selector";
import { orderSelector } from "src/order/selector/order.selector";

export const userSelector = {
    id: true,
    userName: true,
    address: { select: addressSelector },
    order: { select: orderSelector },
    shoppingCart: { select: articleSelector },
};
