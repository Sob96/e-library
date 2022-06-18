import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";

function Search() {
  const[request, setRequest] = useState('');
  const[category, setCategory] = useState('All');
  const[order, setOrder] = useState('relevance');
  const { setData, setTotalResult, isLoaded, setIsLoaded, index } = useContext(AppContext);

  function getBooks(e) {
    e.preventDefault();
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${request}&orderBy=${order}&key=AIzaSyCU2Ohli3IT9UIkV3fzmteL44bELaReN4o&startIndex=${index}`)
    .then(response => {
      return response.json();
    })
    .then(result => {
      setTotalResult(result.totalItems);
      setIsLoaded(true);
      const volumes = result.items;
      if (category === 'All') {
        setData(volumes);
      }else {
        setData(volumes.filter(
          volume => {
            const criterion = volume.volumeInfo.categories;
            if (criterion) {
              return criterion[0].includes(category);
            } 
          }
        ))
      }
    });
  }

  function getRequest(e) {
    setRequest(e.target.value);
  }

  function getCategory(e) {
    setCategory(e.target.value);
  }

  function getOrder(e) {
    setOrder(e.target.value);
  }

    return (
        <header className="search">
          <div className="container">
            <form onSubmit={getBooks}>
                      <input value={request} onChange={getRequest} type="text" placeholder="Search..."/>
                      <button type="submit">Search</button>
                  </form>
                  <div className="search_selects">
                      <label htmlFor="categories">categories</label>
                      <select value={category} onChange={getCategory} id="categories"> 
                          <option>All</option> 
                          <option>Art</option> 
                          <option>Biography</option> 
                          <option>Computers</option>
                          <option>History</option> 
                          <option>Medical</option> 
                          <option>Poetry</option>  
                      </select>
                      <label htmlFor="sorting">sorting by</label>
                      <select value={order} onChange={getOrder} id="sorting"> 
                          <option>relevance</option> 
                          <option>newest</option> 
                      </select>
                  </div>
          </div>
               
        </header>
    )
} 

export default Search;