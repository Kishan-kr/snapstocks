import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Navbar from './components/Common/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { getUser } from './redux/actions/UserActions';

function App() {
  const { loggedIn } = useSelector(state => state.user)
  const { pathname } = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!loggedIn) {
      dispatch(getUser())
    }
  }, [loggedIn, dispatch])

  return (
    <div className="App">
      {pathname !== '/login' && pathname !== '/signup' && <Navbar />}
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
