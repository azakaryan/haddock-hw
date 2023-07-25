import { Request, Response } from 'express';
import ProductModule from '../product';
import ProductView from './view';
import { Product } from '../product/types';

export default class ProductController {
  constructor(private product: ProductModule, private view: ProductView) {};

  all(_: Request, res: Response): void {
    this.product.repository
      .all()
      .then((products: Product[]) =>
        res.json(this.view.renderProducts(products)));
  }
}
