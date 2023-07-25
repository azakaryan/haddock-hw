import { Router } from 'express';
import ProductController from './controller';

export default class ProductRouter {
  router: Router

  constructor(private controller: ProductController) {
    this.router = Router()
      .get('/', this.controller.all.bind(this.controller))
  };
}
