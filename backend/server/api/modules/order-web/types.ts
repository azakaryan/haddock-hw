import { Currency } from "../product/types";

export interface OrderWeb {
    price: {
        amount: number,
        currency: Currency
    };
};
