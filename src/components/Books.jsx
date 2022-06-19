import { useContext } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import placeholder from '../img/placeholder.png';
import loadingImg from '../img/loadingImg.gif';


function Books() {
    const { data, setData, setBook, totalResult, loading, setLoading, noResult, request, setRequest, order, setOrder, category, setCategory, index, setIndex, apiKey, fetchBooks} = useContext(AppContext);
    console.log(data);

    function pagination() {
        setIndex(index + 30);
        fetchBooks(request, category, index + 30, order)
        .then(volumes => setData(data.concat(volumes)));
    }



    return (
        <section className="books">
            <div className="container">
                <div className="books__wrapper">
                    {data.length > 0 ? <div className="books__total">Total: {totalResult} results found</div> : <div className="books__total">{noResult}</div>}
                    <ul className="cards">
                        { data.map((book, index) => {
                            const category = book.volumeInfo.categories;
                            const title = book.volumeInfo.title;
                            const authors = book.volumeInfo.authors;
                            return (

                        <li className="cards__card" key={index}>
                                <Link className="cards__card__link" to={'/books/' + book.id}>
                                    <Card className="cards__card__block" border="secondary" style={{ width: '10rem' }}>
                                        <Card.Img className="cards__card__img" variant="top" src={book.volumeInfo.imageLinks?.thumbnail ||  placeholder} alt="#" />
                                        <Card.Body>
                                            <Card.Text className="cards__card__category">{!category ? "" : category[0]}</Card.Text>
                                            <Card.Title className="cards__card__title">{!title ? "" : title}</Card.Title>
                                            <Card.Text className="cards__card__authors">{!authors ? "" : authors}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Link>
                                
                            </li>
                            );
                        }) }
                        
                        </ul>
                </div>
                {loading ? <img className="books__loading" src={loadingImg} alt="loading" /> : null}
                {data.length > 0 && !loading ? <Button className="book__load" onClick={pagination}>load more</Button> : null}
            </div>
        </section>
    )
} 

export default Books;