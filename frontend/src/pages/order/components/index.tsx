import { useContext } from 'react';
import { ShoppingCartContext } from '../../../contexts/shopping-card';
import { Product } from '../../../api/product';

interface OrderItemProps {
  count: number;
  product: Product;
}

function OrderItem({ product, count }: OrderItemProps) {
  const { removeItem } = useContext(ShoppingCartContext);

  return (
    <tr
      className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
      <td className="whitespace-nowrap px-6 py-4 font-medium">{product.id}</td>
      <td className="whitespace-nowrap px-6 py-4">{product.name}</td>
      <td className="whitespace-nowrap px-6 py-4">{product.price}</td>
      <td className="whitespace-nowrap px-6 py-4">{count}</td>
      <td className="whitespace-nowrap px-6 py-4">
        <button
          onClick={() => removeItem(product.id)}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        > Remove from Cart
        </button>
      </td>
    </tr>
  );
}
  
export default OrderItem;
  