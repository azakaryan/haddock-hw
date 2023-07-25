import { Router } from 'express';
import OrderController from './controller';

export default class OrderRouter {
  router: Router;

  constructor(private controller: OrderController) {
    this.router = Router()
      .post('/', this.controller.create.bind(this.controller))
  };
}
