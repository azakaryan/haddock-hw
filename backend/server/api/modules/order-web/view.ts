import { OrderWeb } from "./types";

export default class OrderView {
    renderOrder(data: any): OrderWeb {
        return {
            price: {
                amount: data.amount,
                currency: data.currency,
            }
        }
    }
}