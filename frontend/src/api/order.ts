import api from ".";
import config from './../config';

export interface OrderItem {
    id: number,
    numberOfItems: number
}

export async function postOrder(order: OrderItem[]): Promise<any> {
    const response = await api.post(`${config.baseApiUrl}/order`, order);

    return response.data;
}