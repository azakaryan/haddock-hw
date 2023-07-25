import products from './data.json';
import { Product } from './types';

export default class ProductRepository {
    all(): Promise<Product[]> {
        return Promise.resolve(<Product[]>products);
    }

    byIds(ids: number[]): Promise<Product[]> {
        const productsIncludingIds = products.filter(p => ids.includes(p.number));
        return Promise.resolve(<Product[]>productsIncludingIds);
    }
}