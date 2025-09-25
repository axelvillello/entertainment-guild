import './App.css';
import {
  BrowserRouter as Router, Routes, Route, Link
} from 'react-router-dom';
import Featured from './Featured';
import Categories from './Categories';
import TestConnect from './TestConnect';
import axios from "axios";

const App = () => {
  
  const padding = {
    padding: 5
  }


  //Categories is a placeholder for Books, Games and Movies
  return (
    <Router>
      <div>
        <Link style={padding} to="/">Home</Link>
        <Link style={padding} to="/categories">Categories</Link>
        <Link style={padding} to="/testConnect">Database Test Connection</Link>
      </div> 

      <Routes>
        <Route path="/" element={<Featured/>} />
        <Route path="/categories" element={<Categories/>} />
        <Route path="/testConnect" element={<TestConnect/>} />
      </Routes>
    </Router>
  );}

export default App;
