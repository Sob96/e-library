import { useContext } from "react";
import { AppContext } from "../App";
import placeholder from '../img/placeholder.png';

function Book() {
    const { book } = useContext(AppContext);
    const category = book.volumeInfo.categories;
    const title = book.volumeInfo.title;
    const authors = book.volumeInfo.authors;
    const description = book.volumeInfo.description;
    return (
        <section className="book">
            <div className="container">
                <div className="books__wrappp">
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