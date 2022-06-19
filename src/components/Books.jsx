import { useContext } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import placeholder from '../img/placeholder.png';
import loadingImg from '../img/loadingImg.gif';


function Books() {
    const { data, setData, setBook, totalResult, loading, setLoading, noResult, request, setRequest, order, setOrder, category, setCategory, index, setIndex} = useContext(AppContext);
    console.log(data);
    
    function getBook(book){
        setBook(book);
    }

    function pagination() {
        setLoading(true);
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${request}&orderBy=${order}&key=AIzaSyCU2Ohli3IT9UIkV3fzmteL44bELaReN4o&startIndex=${index}&maxResults=30`)
        .then(response => {
        return response.json();
        })
        .then(result => {
        const volumes = result.items;
        setLoading(false);
        if (category === 'All') {
            setData([...data, ...volumes]);
          }else {
            setData([...data, ...volumes.filter(
              volume => {
                const criterion = volume.volumeInfo.categories;
                if (criterion) {
                  return criterion[0].includes(category);
                } 
              }
            )])
          }
          setIndex(index + volumes.length);
        });
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

                        <li className="cards__card" onClick={() => getBook(book)} key={index}>
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
                {data.length > 0 && !loading ? <Button className="book__load" onClick={pagination}>load more</Button> : loading ? <img className="books__loading" src={loadingImg} alt="loading" /> : ''}
            </div>
        </section>
    )
} 

export default Books;