import './App.css';
import Navbar from './components/Common/Navbar';
import { Outlet } from 'react-router-dom';

function App() {
  
  return (
    <div className="App">
      <Navbar/>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
