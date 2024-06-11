import { addressSelector } from "src/address/selector/address.selector";
import { articleInstanceSelector } from "src/article-instance/selector/articleInstance.selector";
import { userSelector } from "src/users/selector/users.selector";

export const orderSelector = {
    id: true,
    shipped: true,
    status: true,
    shipTo: { select: addressSelector },
    articles: { select: articleInstanceSelector },
    user: { select: userSelector },
    userID: true,
};
