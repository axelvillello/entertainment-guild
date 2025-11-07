//Main application
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
import SearchUsers from './SearchUsers';
import AddNewProduct from './admin/AddNewProduct';
import { useAuth } from './providers/AuthProvider';
import EditUser from './EditUser';
import EditProduct from './EditProduct';
import AccountPage from './AccountPage';

const App = () => {
  const auth = useAuth();

  //parameterised routing for reuse of DisplayProducts (in the context of preset pages)
  //parameterised routing for reuse of SearchProducts
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
                <HomeRibbon />
              </div> 
            
              <Routes>
                <Route path="/" element={<Search/>} />
                <Route path="/displayProducts/:genre" element={<DisplayProducts/>} /> 
                <Route path="/searchProducts/:searchTerm" element={<SearchProducts/>} /> 
                <Route path="/searchUsers/:searchTerm" element={<SearchUsers/>} /> 
                <Route path="/createProduct" element={<AddNewProduct/>} /> 
                <Route path="/loginUser" element={<LoginUser/>} /> 
                <Route path="/addNewUser" element={<AddNewUser/>} /> 
                <Route path="/addNewOrder" element={<AddNewOrder/>} /> 
                <Route path="/editUser" element={<EditUser/>} /> 
                <Route path="/editProduct" element={<EditProduct/>} /> 
                <Route path="/account" element={<AccountPage/>} /> 
              </Routes>
            </CartProvider>
          </AuthProvider>
        </SnackbarProvider>
      </LoadingProvider>
    </Router>
  );
}

export default App;
