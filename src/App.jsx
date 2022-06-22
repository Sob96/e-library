import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Books from './components/Books';
import Search from './components/Search';
import Book from './components/Book';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.scss';
import './styles/media.scss';

export const AppContext = React.createContext();

const App = () => {
  const [data, setData] = useState([]);
  const [book, setBook] = useState({});
  const [index, setIndex] = useState(0);
  const [request, setRequest] = useState('');
  const [category, setCategory] = useState('all');
  const [order, setOrder] = useState('relevance');
  const [totalResult, setTotalResult] = useState();
  const [loading, setLoading] = useState(false);
  const [noResult, setNoResult] = useState('');
  const apiKey = 'AIzaSyCU2Ohli3IT9UIkV3fzmteL44bELaReN4o';

  const fetchBooks = (request, category, index, order) => {
    setNoResult('');
    setLoading(true);

    return fetch(`https://www.googleapis.com/books/v1/volumes?q=${request}&orderBy=${order}&key=${apiKey}&startIndex=${index}&maxResults=30`)
      .then(response => {
        return response.json();
      })
      .then(result => {
        setTotalResult(result.totalItems);
        const volumes = result.items;
        setLoading(false);
        if (volumes) {
          let filteredVolumes = volumes;
          if (category !== 'all') {
            filteredVolumes = volumes.filter(book => book.volumeInfo.categories?.find(element => element.toLowerCase().includes(category)));
            setTotalResult(filteredVolumes.length);
          }
          if (filteredVolumes.length === 0) setNoResult('Nothing found');
          return filteredVolumes; 
        } else {
          setNoResult('Nothing found');
          return []
        }
      })
      .catch(e => {
        setNoResult('error during request');
        setLoading(false);
        console.error(e);
        return []
      })
  }
  

  return (
    <AppContext.Provider value={{data, setData, book, setBook, totalResult, setTotalResult, loading, setLoading, noResult, setNoResult, request, setRequest, order, setOrder, category, setCategory, index, setIndex, apiKey, fetchBooks}}>
      <Router basename="/e-library">
        <Search/>
        <Routes>
          <Route path="/" element={<Books />}></Route>
          <Route path="books/:id" element={<Book />}></Route>
        </Routes>
      </Router>
    </AppContext.Provider>
  )
}

export default App;
