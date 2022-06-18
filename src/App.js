import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import Books from './components/Books';
import Search from './components/Search';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Book from './components/Book';

export const AppContext = React.createContext();

function App() {
  const[data, setData] = useState([]);
  const[book, setBook] = useState({});
  const[totalResult, setTotalResult] = useState();
  const[index, setIndex] = useState(0);
  const[isLoaded, setIsLoaded] = useState(false);
  

  return (
    <AppContext.Provider value={{data, setData, book, setBook, totalResult, setTotalResult, isLoaded, setIsLoaded, index, setIndex}}>
      <Router>
        <Search/>
        <Routes>
        <Route path="/" element={<Books />}></Route>
        <Route path="/books/:id" element={<Book />}></Route>
        </Routes>
      </Router>
    </AppContext.Provider>
  )
}

export default App;