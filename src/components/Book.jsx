import { useContext } from "react";
import { AppContext } from "../App";
import placeholder from '../img/placeholder.png';

function Book() {
    const { book } = useContext(AppContext);
    return (
        <section className="book">
            <div className="container">
                <div className="books__wrappp">
                    <img src={book?.volumeInfo?.imageLinks?.thumbnail ||  placeholder} alt="#" />
                    <div className="book__info">
                        <h3>{book.volumeInfo.title}</h3>
                        <p>{book.volumeInfo.categories}</p>
                        <p>{book.volumeInfo.authors}</p>
                        <p>{book.volumeInfo.description}</p>
                    
                    </div>
                </div>
            </div>
        </section>
    )
} 

export default Book;