import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BookCard from './BookCard';
import Filter from './Filter';
import './booklist.css';
import { setBooks, setBooksError, setBooksLoading } from '../redux/AllDataSlice';
import PaginationComponent from './PaginationCoponent';
import axios from 'axios';

const API_URL = "http://64.227.142.191:8080/application-test-v1.1/books";

const BookList = () => {
    const { items = [], status } = useSelector((state) => state.allData.books);
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    useEffect(() => {
        const fetchBooks = async () => {
            dispatch(setBooksLoading());
            try {
                const response = await axios.get(`${API_URL}?title=`);
                // Ensure the response data contains 'data' array
                if (response.data && Array.isArray(response.data.data)) {
                    dispatch(setBooks(response.data.data));  // Dispatch the books data
                } else {
                    throw new Error("Invalid data format");
                }
            } catch (error) {
                dispatch(setBooksError(error.toString()));
            }
        };

        fetchBooks();
    }, [dispatch]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error loading books</div>;
    }

    // Ensure items is an array
    const booksArray = Array.isArray(items) ? items : [];

    const indexOfLastBook = currentPage * itemsPerPage;
    const indexOfFirstBook = indexOfLastBook - itemsPerPage;
    const currentBooks = booksArray.slice(indexOfFirstBook, indexOfLastBook);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="book-list">
            <div style={{display:"flex",justifyContent:"start",width:"90%"}}>
                <Filter />
            </div>
            <div className="book-card-container">
                {currentBooks.length > 0 ? (
                    currentBooks.map((book) => (
                        <BookCard key={book.id} book={book} />
                    ))
                ) : (
                    <div className="no-books">No books available</div>
                )}
            </div>
            <div className="pagination">
                <PaginationComponent
                    itemsPerPage={itemsPerPage}
                    totalItems={booksArray.length}
                    paginate={paginate}
                />
            </div>
        </div>
    );
};

export default BookList;
