import { useContext } from 'react';
import { ShoppingCartContext } from '../../contexts/shopping-card';

function ShoppingCartInfo() {
    const { products } = useContext(ShoppingCartContext);

    if (!products.length) return null;

    return (
        <span className='text-red-700'>
            {products.length}
        </span>
    );
}

export default ShoppingCartInfo;