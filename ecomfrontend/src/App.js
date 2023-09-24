import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from "./pages/forms/Login"
import Register from './pages/forms/Register';
import { useSelector } from 'react-redux';
import UserHome from './pages/users/UserHome';
import PrivateComponent from './privatecomponent/PrivateComponent';
import Logout from './pages/forms/setting/Logout';
import ParticularProduct from './pages/products/ParticularProduct';
import Cart from './pages/cart/Cart';

function App() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <Router>
      <Routes >
        <Route element={<PrivateComponent/>}>
        <Route path='/' element={<UserHome/>} />
        <Route path='/particularproduct/:encodedImage' element={<ParticularProduct/>} />
        <Route path='/opencart' element = {<Cart/>} />
        <Route path='/logout' element={<Logout/>} />
        </Route>

        {!currentUser?.email &&
        <Route>
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
        </Route>
        }
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>


    </Router>
  );
}

export default App;
