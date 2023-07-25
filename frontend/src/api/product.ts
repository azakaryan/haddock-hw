import api from ".";
import config from './../config';

export interface Product {
    id: number;
    name: string;
    price: string;
};

export async function getProducts(): Promise<Product[]> {
    const response = await api.get(`${config.baseApiUrl}/products`);

    return response.data;
}