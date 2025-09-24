import './App.css';
import {
  BrowserRouter as Router, Routes, Route, Link
} from 'react-router-dom';
import Featured from './Featured';
import Categories from './Categories';
import axios from "axios";

const App = () => {
  
  const padding = {
    padding: 5
  }


  //Categories is a placeholder for Books, Games and Movies via 
  return (
    <Router>
      <div>
        <Link style={padding} to="/">Home</Link>
        <Link style={padding} to="/categories">Categories</Link>
      </div> 

      <Routes>
        <Route path="/" element={<Featured/>} />
        <Route path="/categories" element={<Categories/>} />
      </Routes>
    </Router>
  );}

export default App;
