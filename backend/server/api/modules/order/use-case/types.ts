export enum PromotionType {
    TWO_FOR_ONE = 'TWO_FOR_ONE',
    SPEND_X_TO_SAVE_Y = 'SPEND_X_TO_SAVE_Y'
};

export interface Promotion {
    type: PromotionType;
    name: string;
    priority: number,
    data: PromotionData,
};

export type PromotionData = PromotionDataTwoForOne | PromotionDataSpendXToSaveY

export interface PromotionDataTwoForOne {
    productsIds: number[];
};

export interface PromotionDataSpendXToSaveY {
    minAmountToApplyPromotion: number;
    discount: number;
};
