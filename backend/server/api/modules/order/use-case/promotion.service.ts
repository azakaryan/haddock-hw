import { Product } from '../../product/types'
import { OrderItem } from '../types'
import promotions from './promotions.json'
import { Promotion, PromotionDataSpendXToSaveY, PromotionDataTwoForOne, PromotionType } from './types'

export default class PromotionService {
    private promotions: Promotion[] = (<Promotion[]>promotions)
        .sort((a: Promotion, b: Promotion) => a.priority > b.priority ? 1 : -1)

    applyAll(products: Product[], orderItems: OrderItem[]): number {
        return this.promotions.reduce((acc, promotion) => {
            const { type, data } = promotion;

            switch(type) {
                case PromotionType.TWO_FOR_ONE: {
                    acc = this.applyTwoForOne(products, orderItems, <PromotionDataTwoForOne>data)
                    break;
                }
                case PromotionType.SPEND_X_TO_SAVE_Y: {
                    acc = this.applySpendXToSaveY(acc, <PromotionDataSpendXToSaveY>data);
                    break;
                }
                default: {
                    // Do nothing
                }
            };

            return acc
        }, 0)
    };

    /*
        (buy two of the same product, the second one is free). Business Logic for the promotion calculation.
    */
    private applyTwoForOne(orderedProducts: Product[], orderItems: OrderItem[], promotionData: PromotionDataTwoForOne): number {
        const { productsIds } = promotionData;

        /*
            Group similar orderItems by product ID. Results in an object having a key as productId and value numberOfItems.
        */
        const orderItemsGroupedByProductId = orderItems
            .reduce((acc: any, { id, numberOfItems }: OrderItem) => {
                acc[id] = acc[id]
                    ? acc[id] + numberOfItems
                    : numberOfItems
                
                return acc;
            }, {});

        /*
            Calculate price for items that has discount + keep the price for the products that has no discount. 
        */
        const priceAfterDiscount = orderedProducts.reduce((acc, { number, price }) => {
            const numberOfItems = orderItemsGroupedByProductId[number];

            const items = this.isProductPromoted(number, productsIds)
                ? Math.round(numberOfItems / 2)
                : numberOfItems;

            return acc + (items * price.amount);
        }, 0);

        return priceAfterDiscount;
    }

    private isProductPromoted(productId: number, promotedProductIds: number[]): boolean {
        return promotedProductIds.includes(productId);
    }

    /*
        Spend X to save Y promotions (reach a certain amount on an order and you get a discount). Business Logic for the promotion calculation.
    */
    private applySpendXToSaveY(totalPrice: number, promotionData: PromotionDataSpendXToSaveY): number {
        const { minAmountToApplyPromotion, discount } = promotionData;

        return totalPrice > minAmountToApplyPromotion
            ? totalPrice - discount
            : totalPrice;
    }
}