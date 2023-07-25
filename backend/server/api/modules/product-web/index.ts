import { Router } from 'express';
import ProductModule from './../product'
import createController from './controller';
import createRouter from './router';
import createView from './view';

export default class ProductWebModule {
    public router: Router;

    constructor(private productModule: ProductModule) {
        const view = new createView();

        const controller = new createController(this.productModule, view);
    
        this.router = new createRouter(controller).router;
    };
}
