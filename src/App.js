//Main application functionality, including navigation
//WRITTEN BY: Axel Ello

import './App.css';
import {
  BrowserRouter as Router, Routes, Route, Link
} from 'react-router-dom';
import Search from './Search';
import DisplayProducts from './DisplayProducts';
import LoginUser from './LoginUser';
import AddNewUser from './AddNewUser';
import AddNewOrder from './AddNewOrder';
import HomeRibbon from './HomeRibbon';
import AuthProvider from './AuthProvider';
import CartProvider from './CartProvider';

const App = () => {

  //parameterised navigation for reuse of displayProducts
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div style={{
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center",
            flexDirection: "column"
          }}>
            <h1>ENTERTAINMENT GUILD</h1>
            <HomeRibbon />
          </div> 
        
          <Routes>
            <Route path="/" element={<Search/>} />
            <Route path="/displayProducts/:genre" element={<DisplayProducts/>} /> 
            <Route path="/loginUser" element={<LoginUser/>} /> 
            <Route path="/addNewUser" element={<AddNewUser/>} /> 
            <Route path="/addNewOrder" element={<AddNewOrder/>} /> 
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );}

export default App;
