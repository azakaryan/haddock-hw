import { createContext, useState } from 'react';
import { Product } from '../api/product';

interface ContextContent {
  products: Product[];
  addItem:(product: Product) => void;
  removeItem: (id: number) => void;
  reset: () => void; 
}

export const ShoppingCartContext = createContext<ContextContent>({} as any);

function ShoppingCartProvider({ children }: any) {
  const [ products, setProducts ] = useState<Product[]>([]);

  const addItem = (product: Product) => {
    if (!product) return;

    setProducts([ ...products, product ]);
  }

  const removeItem = (id: number) => {
    if (!id || products.length < 1) return;

    const filteredProducts = products.filter(p => p.id !== id);

    setProducts([ ...filteredProducts ]);
  }

  const reset = () => setProducts([]);

  return (
    <ShoppingCartContext.Provider value={{ addItem, removeItem, products, reset }}>
      {children}
    </ShoppingCartContext.Provider>
  );
}


export default ShoppingCartProvider;
