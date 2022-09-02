### Books search React app (e-library) using Google Books API.

**Warning:** Google Books API doesn't work in Belarus. If you are in Belarus, activate your VPN before using the app (for example Psiphon).

 Published project on GitHub Pages you can find [here](https://sob96.github.io/e-library/).


The e-library has 3 components: `Search`, `Books` and `Book`.

The `Search` component renders selects and a form with an input and a button.  The component also includes validation, getting data from the input and selects.

The `Books` component performs pagination, rendering of books coming from the Google Books API, their number, loading animation and the "load more" button.

The `Book` component renders the book clicked by the user. The book id comes through useParams, after which a request is sent with the id for a specific book to the Google Books API. Loading animation also works during loading of the book.

Error handling is provided by:
- .catch in fetch
- optional chains and img plugs if some parts of the book data doesn't arrive
- Error boundary


In this project I mastered:
- React hooks
- work with Google Books API
- SCSS
- Bootstrap
- search
- filtration
- pagination
- error handling
- loading indicator


You can run this project locally just do:
1. git clone https://github.com/Sob96/e-library.git
2. cd e-library
3. npm install
4. npm start
