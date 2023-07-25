import { Link } from 'react-router-dom';
import { navigation } from '../../constants';
import ShoppingCartInfo from '../shopping-cart-info';

function NavBar() {
  return (
    <ul data-testid="navbar" className="flex justify-center">
        <li className="mr-6">
            <Link className="text-blue-500 hover:text-blue-800" to={navigation.home}>Home</Link>
        </li>
        <li className="mr-6">
            <Link className="text-blue-500 hover:text-blue-800" to={navigation.products}>Products</Link>
        </li>
        <li className="mr-6 ml-auto">
            <Link className="text-blue-500 hover:text-blue-800" to={navigation.order}>
                Order <ShoppingCartInfo></ShoppingCartInfo>
            </Link>
        </li>
    </ul>
  );
}

export default NavBar;