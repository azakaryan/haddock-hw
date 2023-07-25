import { BrowserRouter } from 'react-router-dom';
import Router from './router';
import NavBar from './components/nav-bar';
import ShoppingCartProvider from './contexts/shopping-card';

function App() {
  return (
    <BrowserRouter>
      <ShoppingCartProvider>
        <div className="m-4">
          <NavBar></NavBar>
          <div className='text-center mt-8'>
            <Router></Router>
          </div>
        </div>
      </ShoppingCartProvider>
    </BrowserRouter>
  );
}

export default App;
