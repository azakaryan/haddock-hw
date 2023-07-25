import { useEffect, useState } from 'react';
import { Product, getProducts } from './../../api/product';
import { Header } from '../../components';
import ProductItem from './components/product';

function ProductsPage() {
  const [ products, setProducts ] = useState<Product[]>([]);

  useEffect(() => {
    getProducts()
      .then(setProducts);
  }, [])

  return (
    <>
      <Header title="Products" />

      <div className="m-auto w-1/2 flex flex-col ">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">id</th>
                    <th scope="col" className="px-6 py-4">Name</th>
                    <th scope="col" className="px-6 py-4">Price</th>
                    <th scope="col" className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    products?.map((product: Product, index: number) =>
                      <ProductItem product={product} key={index} />
                    )
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
  
export default ProductsPage;
  