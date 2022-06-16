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
  // const[search, setSearch] = useState();

  // function getBooks() {
  //   fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=AIzaSyCU2Ohli3IT9UIkV3fzmteL44bELaReN4o`)
  //   .then(response => {
  //     return response.json();
  //   })
  //   .then(data => {
  //     console.log(data);
  //   });
  // }


  return (
    <AppContext.Provider value={{data, setData, book, setBook}}>
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
