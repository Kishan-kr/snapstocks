import './App.css';
import Navbar from './components/Common/Navbar';
import { Outlet, useLocation } from 'react-router-dom';

function App() {
  const { pathname } = useLocation()

  return (
    <div className="App">
      {pathname !== '/login' && pathname !== '/signup' && <Navbar/>}
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
