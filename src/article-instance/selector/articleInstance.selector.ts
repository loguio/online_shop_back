import { articleSelector } from "src/article/selector/article.selector";
import { orderSelector } from "src/order/selector/order.selector";

export const articleInstanceSelector = {
    id: true,
    price: true,
    article: { select: articleSelector },
    order: { select: orderSelector },
};
