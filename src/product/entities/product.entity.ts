import { ProductImage } from "src/product-image/entities/product-image.entity";
export class Product {
    id: string;
    name: string;
    price: number;
}

export class ProductEntity {
    id: string;
    name: string;
    price: number;
    images: ProductImage[];
}
