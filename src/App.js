//Main application functionality, including navigation
//WRITTEN BY: Axel Ello

import './App.css';
import {
  BrowserRouter as Router, Routes, Route, Link
} from 'react-router-dom';
import Featured from './Featured';
import DisplayProducts from './DisplayProducts';
import LoginUser from './LoginUser';
import AddNewUser from './AddNewUser';
import HomeRibbon from './HomeRibbon';
import AuthProvider from './AuthProvider';
import CartProvider from './CartProvider';

const App = () => {

  //parameterised navigation for reuse of displayProducts
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div>
            <h1>ENTERTAINMENT GUILD</h1>
            <HomeRibbon />
          </div> 
        
          <Routes>
            <Route path="/" element={<Featured/>} />
            <Route path="/displayProducts/:genre" element={<DisplayProducts/>} /> 
            <Route path="/loginUser" element={<LoginUser/>} /> 
            <Route path="/addNewUser" element={<AddNewUser/>} /> 
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );}

export default App;
