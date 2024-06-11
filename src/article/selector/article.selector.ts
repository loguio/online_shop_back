import { userSelector } from "src/users/selector/users.selector";

export const articleSelector = {
    id: true,
    name: true,
    price: true,
    image: true,
    users: { select: userSelector },
};
