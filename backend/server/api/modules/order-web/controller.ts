import { Request, Response } from 'express';
import OrderView from './view';
import ProductRepository from '../product/repository';
import OrderUseCaseModule from '../order/use-case';
import { OrderItem } from '../order/types';

export default class OrderController {
  constructor(
    private repository: ProductRepository,
    private orderUseCase: OrderUseCaseModule,
    private view: OrderView
  ) {};

  async create(req: Request, res: Response): Promise<void> {
    const orderItems = <OrderItem[]>req.body;
    const itemIds = orderItems.map(({ id }) => id);

    // Get products by ids.
    const products = await this.repository.byIds(itemIds);

    const amount = this.orderUseCase.promotionService.applyAll(
      products, orderItems,
    );

    res.status(201)
      .json(this.view.renderOrder({ amount, currency: 'Euro' }));
  }
}
