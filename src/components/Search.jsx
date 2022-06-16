import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";

function Search() {
  const[request, setRequest] = useState('');
  const[category, setCategory] = useState('all');
  const { setData } = useContext(AppContext);

  function getBooks(e) {
    e.preventDefault();
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${request}&key=AIzaSyCU2Ohli3IT9UIkV3fzmteL44bELaReN4o&maxResults=40`)
    .then(response => {
      return response.json();
    })
    .then(result => {
      const volumes = result.items;
      if (category === 'all') {
        setData(volumes);
      }else {
        setData(volumes.filter(
          volume => {
            const category = volume.volumeInfo.categories;
            return !category ? "" : category[0].includes(category);
          }
        ))
      }
    
    });
  }

  // useEffect(() =>{
  //   if (data.length === 0) getBooks();
  // }, [data]);

  function getRequest(e) {
    setRequest(e.target.value);
  }

  function getCategory(e) {
    setCategory(e.target.value);
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
                          <option>all</option> 
                          <option>art</option> 
                          <option>biography</option> 
                          <option>computers</option>
                          <option>history</option> 
                          <option>medical</option> 
                          <option>poetry</option>  
                      </select>
                      <label htmlFor="sorting">sorting by</label>
                      <select id="sorting"> 
                          <option>relevance</option> 
                          <option>newest</option> 
                      </select>
                  </div>
          </div>
               
        </header>
    )
} 

export default Search;