import { useContext } from "react";
import { AppContext } from "../App";
import { useParams } from 'react-router-dom';
import placeholder from '../img/placeholder.png';
import { useEffect } from "react";

function Book() {
    const { book, apiKey, setBook } = useContext(AppContext);
    const category = book.volumeInfo?.categories;
    const title = book.volumeInfo?.title;
    const authors = book.volumeInfo?.authors;
    const description = book.volumeInfo?.description;

    const { id } = useParams();

    function getBook() {
        fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
        .then(response => {
            return response.json();
          })
          .then(result => {
            setBook(result);
          })
    }

    useEffect(() => {
        getBook()
    }, [])

    return (
        <section className="book">
            <div className="container">
                <div className="books__wrapper">
                    <img src={book?.volumeInfo?.imageLinks?.thumbnail ||  placeholder} alt="#" />
                    <div className="book__info">
                        <h3>{!title ? "" : title}</h3>
                        <p>{!category ? "" : category}</p>
                        <p>{!authors ? "" : authors}</p>
                        <p>{!description ? "" : description}</p>
                    
                    </div>
                </div>
            </div>
        </section>
    )
} 

export default Book;