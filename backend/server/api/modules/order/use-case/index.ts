import PromotionService from "./promotion.service";

export default class OrderUseCaseModule {
    promotionService = new PromotionService();
};