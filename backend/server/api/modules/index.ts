import OrderModule from "./order";
import OrderWebModule from "./order-web";
import ProductModule from "./product";
import ProductWebModule from "./product-web";

export default class createModules {
    private productModule: ProductModule;
    private orderModule: OrderModule
    productWebModule: ProductWebModule;
    orderWebModule: OrderWebModule;

    constructor() {
        this.productModule = new ProductModule();
        this.orderModule = new OrderModule();

        this.productWebModule = new ProductWebModule(this.productModule);
        this.orderWebModule = new OrderWebModule(this.productModule, this.orderModule);
    };
}