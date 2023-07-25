import { memo, useContext } from 'react';
import { Product } from '../../../../api/product';
import { ShoppingCartContext } from '../../../../contexts/shopping-card';

interface ProductPageProps {
  product: Product
}

function ProductItem({ product }: ProductPageProps) {
  const { addItem } = useContext(ShoppingCartContext);

  return (
    <tr
      className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
      <td className="whitespace-nowrap px-6 py-4 font-medium">{product.id}</td>
      <td className="whitespace-nowrap px-6 py-4">{product.name}</td>
      <td className="whitespace-nowrap px-6 py-4">{product.price}</td>
      <td className="whitespace-nowrap px-6 py-4">
        <button
          onClick={() => addItem(product)}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        > Add to Cart
        </button>
      </td>
    </tr>
  );
}
  
export default memo(ProductItem);
  