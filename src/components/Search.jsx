import { useContext, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { AppContext } from "../App";

function Search() {
  const { data, setData, setTotalResult, setLoading, setNoResult, request, setRequest, order, setOrder, category, setCategory, index, setIndex } = useContext(AppContext);

  function getBooks(e) {
    e.preventDefault();
    if (request.length < 3) return;
    setLoading(true);
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${request}&orderBy=${order}&key=AIzaSyCU2Ohli3IT9UIkV3fzmteL44bELaReN4o&startIndex=${index}&maxResults=30`)
    .then(response => {
      return response.json();
    })
    .then(result => {
      setTotalResult(result.totalItems);
      const volumes = result.items;
      setLoading(false);
      if(volumes) {
        if (category === 'All') {
          setData([...volumes]);
        }else {
          setData([...volumes].filter(
            volume => {
              const criterion = volume.volumeInfo.categories;
              if (criterion) {
                return criterion[0].includes(category);
              } 
            }
          ))
        }
      }else {
        setData([]);
        setNoResult('Nothing found');
      }
      setIndex(volumes.length);
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
            <h2 className="search__headline">Bookle</h2>
            <Form onSubmit={getBooks}>
              <InputGroup className="mb-3">
                <Form.Control value={request} onChange={getRequest}
                placeholder="Enter your request"/>
                <Button type="Sumbit">
                Search
                </Button>
              </InputGroup>
            </Form>
                  <div className="search__selects__wrapper">
                      <label htmlFor="categories">categories</label>
                      <Form.Select className="search__selects" value={category} onChange={getCategory} id="categories">
                          <option>All</option> 
                          <option>Art</option> 
                          <option>Biography</option> 
                          <option>Computers</option>
                          <option>History</option> 
                          <option>Medical</option> 
                          <option>Poetry</option>  
                      </Form.Select>
                      <label htmlFor="sorting">sorting by</label>
                      <Form.Select className="search__selects" value={order} onChange={getOrder} id="sorting">
                          <option>relevance</option> 
                          <option>newest</option>   
                      </Form.Select>
                  </div>
          </div>
               
        </header>
    )
} 

export default Search;