import { Product } from "../product/types";
import { ProductWeb } from "./types";

export default class ProductView {
  
    private renderProduct(p: Product): ProductWeb {
        return {
            id: p.number,
            name: p.name,
            price: `${p.price.amount}${p.price.currency}`,
        }
    }

    renderProducts(products: Product[]): ProductWeb[] {
        return products
            .map((p: Product) => this.renderProduct(p));
    }
}