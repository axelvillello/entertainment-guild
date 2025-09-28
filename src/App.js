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

const App = () => {
  
  const padding = {
    padding: 5
  }

  //parameterised navigation for reuse of displayProducts
  return (
    <Router>
      <div>
        <Link style={padding} to="/">Home</Link>
        ||
        <Link style={padding} to="/displayProducts/Books">Books</Link>
        <Link style={padding} to="/displayProducts/Movies">Movies</Link>
        <Link style={padding} to="/displayProducts/Games">Games</Link>
        ||
        <Link style={padding} to="/loginUser">Log In</Link>
      </div> 
  
      <Routes>
        <Route path="/" element={<Featured/>} />
        <Route path="/displayProducts/:genre" element={<DisplayProducts/>} /> 
        <Route path="/loginUser" element={<LoginUser/>} /> 
        <Route path="/addNewUser" element={<AddNewUser/>} /> 
      </Routes>
    </Router>
  );}

export default App;
