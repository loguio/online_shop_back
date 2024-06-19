import { UserEntity } from "src/users/entities/users.entity";

export class Article {
    id: string;
    name: string;
    price: number;
    image: string | null;
    users?: UserEntity[];
}
export class ArticleEntity {
    id: string;
    name: string;
    price: number;
    image: string | null;
}
