export enum Currency {
    Euro = '€',
};

export interface Product {
    number: number;
    name: string;
    price: {
        amount: number,
        currency: Currency
    }
};