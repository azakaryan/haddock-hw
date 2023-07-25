import { Router } from "express";
import ProductModule from "../product";

import createController from './controller';
import createRouter from './router';
import createView from './view';
import OrderModule from "../order";

export default class OrderWebModule {
    public router: Router;

    constructor(private productModule: ProductModule, private orderModule: OrderModule) {
        const view = new createView();
        const controller = new createController(this.productModule.repository, this.orderModule.useCase, view);
    
        this.router = new createRouter(controller).router;
    };
}