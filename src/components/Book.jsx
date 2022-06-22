import { useContext, useEffect } from "react";
import { useParams } from 'react-router-dom';

import { AppContext } from "../App";
import placeholder from '../img/placeholder.png';
import loadingImg from '../img/loadingImg.gif';

const Book = () => {
    const { book, setBook, noResult, setNoResult, loading, setLoading } = useContext(AppContext);
    const { id } = useParams();
    const category = book.volumeInfo?.categories?.join(', ');
    const title = book.volumeInfo?.title;
    const authors = book.volumeInfo?.authors?.join(', ');
    const description = book.volumeInfo?.description;
    const img = book.volumeInfo?.imageLinks?.thumbnail;

    const getBook = () => {
        setLoading(true);
        fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
            .then(response => {
                return response.json();
            })
            .then(result => {
                setLoading(false);
                setBook(result);
            })
            .catch(e => {
                setNoResult('error during request');
                setLoading(false);
                console.error(e);
                return []
            })
    }

    useEffect(() => {
        getBook();
    }, [])
    

    return (
        <section className="book">
            <div className="container">
                {loading ? <img className="books__loading" src={loadingImg} alt="loading" /> : <div className="book__wrapper">
                    <img className="book__img" src={img ||  placeholder} alt="#" />
                    <div className="book__info">
                        <h3>{title || noResult}</h3>
                        <p className="book__info__category">{category}</p>
                        <p className="book__info__authors">{authors}</p>
                        <p className="book__info__description">{description}</p>
                    </div>
                </div>}
            </div>
        </section>
    )
} 

export default Book;