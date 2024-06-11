import { users } from "@prisma/client";

export class Article {
    id: string;
    name: string;
    price: number;
    image: string | null;
    users?: users[];
}
