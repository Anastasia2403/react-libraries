import { Outlet, useLocation } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header/Header';

const App = () => {
  const location = useLocation();

  const isWelcomePage = location.pathname === '/';

  return (
    <div className='App'>
      {!isWelcomePage && (
        <header>
          <Header />
        </header>
      )}

      <Outlet />
    </div>
  );
}

export default App;
