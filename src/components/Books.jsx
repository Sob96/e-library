import { useContext } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import placeholder from '../img/placeholder.png';


function Books() {
    const { data, setBook, totalResult, isLoaded, index, setIndex} = useContext(AppContext);
    console.log(data);
    
    function getBook(book){
        setBook(book);
    }

    function pagination() {
        setIndex(index + 30);
      }

    return (
        <section className="books">
            <div className="container">
                {isLoaded ? <div className="books__total">Total: {totalResult} results found</div> : ''}
                <ul className="cards">
                    { data.map((book, index) => {
                        const category = book.volumeInfo.categories;
                        return (

                       <li onClick={() => getBook(book)} key={index}>
                            <Link to={'/books/' + book.id + '/'}>
                                <Card style={{ width: '10rem' }}>
                                    <Card.Img variant="top" src={book.volumeInfo.imageLinks?.thumbnail ||  placeholder} alt="#" />
                                    <Card.Body>
                                        <Card.Text>{!book.volumeInfo.categories ? "" : book.volumeInfo.categories[0]}</Card.Text>
                                        <Card.Title>{book.volumeInfo.title}</Card.Title>
                                        <Card.Text>{book.volumeInfo.authors}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Link>
                            
                        </li>
                        );
                    }) }
                    
                    </ul>
                    {isLoaded ? <button onClick={pagination} className="book__load">load more</button> : ''}
            </div>
        </section>
    )
} 

export default Books;