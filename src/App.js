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
import AuthProvider from './providers/AuthProvider';
import CartProvider from './providers/CartProvider';
import SnackbarProvider from './providers/SnackbarProvider';
import LoadingProvider from './providers/LoadingProvider';
import SearchProducts from './SearchProducts';


const App = () => {

  //parameterised navigation for reuse of displayProducts
  return (
    <Router>
      <LoadingProvider>
        <SnackbarProvider>
          <AuthProvider>
            <CartProvider>
              <div style={{
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center",
                flexDirection: "column"
              }}>
                <h1 className="Site-title">ENTERTAINMENT GUILD</h1>
                <HomeRibbon />
              </div> 
            
              <Routes>
                <Route path="/" element={<Search/>} />
                <Route path="/displayProducts/:genre" element={<DisplayProducts/>} /> 
                <Route path="/search/:searchTerm" element={<SearchProducts/>} /> 
                <Route path="/loginUser" element={<LoginUser/>} /> 
                <Route path="/addNewUser" element={<AddNewUser/>} /> 
                <Route path="/addNewOrder" element={<AddNewOrder/>} /> 
              </Routes>
            </CartProvider>
          </AuthProvider>
        </SnackbarProvider>
      </LoadingProvider>
    </Router>
  );
}

export default App;
