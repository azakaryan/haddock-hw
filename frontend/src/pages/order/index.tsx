import { useContext, useEffect, useState } from 'react';
import { Header } from '../../components';
import { ShoppingCartContext } from '../../contexts/shopping-card';
import { Product } from '../../api/product';
import OrderItem from './components';
import { postOrder } from '../../api/order';
import { navigation } from '../../constants';
import { useNavigate } from 'react-router-dom';

function OrderPage() {
  const navigate = useNavigate();
  const { products, reset } = useContext(ShoppingCartContext);
  const [ orderItems, setOrderItems ] = useState<{ count: number, product: Product }[]>([]);
  const [ isOrderResultVisible, setIsOrderResultVisible ] = useState<boolean>(false);
  const [ totalPrice, setTotalPrice ] = useState<string>('');

  useEffect(() => {
    const groupedProducts = products.reduce((acc, product: Product) => {
        acc[product.id] = acc[product.id]
          ? { product, count: acc[product.id].count + 1 }
          : { product, count: 1 }

        return acc;
    }, {} as any);

    setOrderItems(Object.values(groupedProducts));
  }, [products]);

  function resetOrder() {
    setIsOrderResultVisible(false);
    reset();

    // Navigate to products page
    navigate(navigation.products);
  }

  async function submitOrder() {
    const requestPayload = orderItems
      .map(({ count, product }) => ({ numberOfItems: count, id: product.id }))

    const { price } = await postOrder(requestPayload);

    setTotalPrice(`${price.amount} ${price.currency}`);
    setIsOrderResultVisible(true);
  }

  return (
    <>
      <Header title="Order" />

      {orderItems.length ? (
        <>
          <div className="w-1/2 flex flex-col ">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full text-left text-sm font-light">
                    <thead className="border-b font-medium dark:border-neutral-500">
                      <tr>
                        <th scope="col" className="px-6 py-4">id</th>
                        <th scope="col" className="px-6 py-4">Name</th>
                        <th scope="col" className="px-6 py-4">Price</th>
                        <th scope="col" className="px-6 py-4">Count</th>
                        <th scope="col" className="px-6 py-4"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        orderItems?.map(({ product, count }, index: number) =>
                          <OrderItem product={product} count={count} key={index} />
                        )
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className='mt-6'>
            <button
              onClick={() => resetOrder()}
              className='mr-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
            > Cancel
            </button>
            <button
              onClick={() => submitOrder()}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            > Submit order
            </button>
          </div>
          {
            isOrderResultVisible && (
              <div className="mt-8">
                <Header title="Order Result" />

                <div className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>Price to pay: {totalPrice}</div>     
              </div>
            )
          }
        </>
      ) : null }
    </>
  );
}
  
export default OrderPage;
