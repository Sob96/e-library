import { useContext } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import placeholder from '../img/placeholder.png';


function Books() {
    const { data, setBook } = useContext(AppContext);
    console.log(data);
    

    function getBook(book){
        setBook(book);
    }

    return (
        <section className="books">
            <div className="container">
                <ul className="cards">
                    { data.map((book) => {
                        const category = book.volumeInfo.categories;
                        return (

                       <li onClick={() => getBook(book)} key={book.id}>
                            <Link to={'/books/' + book.id + '/'}>
                                <Card style={{ width: '10rem' }}>
                                    <Card.Img variant="top" src={book.volumeInfo.imageLinks?.thumbnail ||  placeholder} alt="#" />
                                    <Card.Body>
                                        <Card.Text>{!category ? "" : category[0]}</Card.Text>
                                        <Card.Title>{book.volumeInfo.title}</Card.Title>
                                        <Card.Text>{book.volumeInfo.authors}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Link>
                            {/* <img src={book.volumeInfo.imageLinks?.thumbnail ||  placeholder} alt="#" />
                            <div>
                                <h3>
                                {book.volumeInfo.title}
                                </h3>
                                <div>{book.volumeInfo.authors}</div>
                                <div>{book.volumeInfo.categories}</div>
                            </div> */}
                        </li>
                        );
                    }) }
                    
                    </ul>
            </div>
        </section>
    )
} 

export default Books;