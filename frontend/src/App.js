import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Products from './pages/Products';
import Signup from './pages/Signup';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RefreshHandler from './RefreshHandler';
import { useState } from 'react';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <div className="App">
      <h1 className='app-title'>MERN Auth App</h1>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
      <Routes>
        <Route path="/" element={<Navigate to="/signup"/>}/>
        <Route path="/home" element={<PrivateRoute element={<Home setIsAuthenticated={setIsAuthenticated} />} />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />}/>
        <Route path="/products" element={<PrivateRoute element={<Products />} />} />
        <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />}/>
      </Routes>
      <ToastContainer />
      <footer className='footer'>Developed by Vamshi Balla</footer>
    </div>
  );
}

export default App;
