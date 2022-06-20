import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Button, Form, InputGroup } from "react-bootstrap";
import { AppContext } from "../App";

const Search = () => {
  const { setData, request, setRequest, order, setOrder, category, setCategory, index, fetchBooks } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();

  const getBooks = e => {

    e.preventDefault();

    setData([]);

    if (location.pathname !== '/') navigate('/');

    fetchBooks(request, category, index, order)
      .then(volumes => setData(volumes));
  }

  const onRequestChange = e => setRequest(e.target.value);

  const onCategoryChange = e => {

    setCategory(e.target.value);

    fetchBooks(request, e.target.value, index, order)
    .then(volumes => setData(volumes));
  }

  const onOrderChange = e => {

    setOrder(e.target.value);

    fetchBooks(request, category, index, e.target.value)
      .then(volumes => setData(volumes));
  }

  const validateInput = () => {
    if (request.length > 1) return true;
  }
  

  return (
    <header className="search">
      <div className="container">
        <h2 className="search__headline">Bookle</h2>
        <Form onSubmit={getBooks}>
          <InputGroup className="mb-3">
            <Form.Control value={request} onChange={onRequestChange} placeholder="Enter your request"/>
            <Button type="submit" disabled={!validateInput()}>Search</Button>
          </InputGroup>
        </Form>
        <div className="search__selects__wrapper">
          <label htmlFor="categories">categories</label>
          <Form.Select className="search__selects" value={category} onChange={onCategoryChange} id="categories">
            <option>all</option> 
            <option>art</option> 
            <option>biography</option> 
            <option>computers</option>
            <option>history</option> 
            <option>medical</option> 
            <option>poetry</option>  
          </Form.Select>
          <label htmlFor="sorting">sorting by</label>
          <Form.Select className="search__selects" value={order} onChange={onOrderChange} id="sorting">
            <option>relevance</option> 
            <option>newest</option>   
          </Form.Select>
        </div>
      </div>
    </header>
  )
} 

export default Search;