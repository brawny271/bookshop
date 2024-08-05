import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BookCard from './BookCard';
import Filter from './Filter';
import './booklist.css';
import { fetchBooks } from '../redux/AllDataSlice';
import PaginationComponent from './PaginationCoponent';

const BookList = () => {
  const { list, status } = useSelector((state) => state.books);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    dispatch(fetchBooks(''));
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error loading books</div>;
  }

  const indexOfLastBook = currentPage * itemsPerPage;
  const indexOfFirstBook = indexOfLastBook - itemsPerPage;
  const currentBooks = list.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="book-list">
      <Filter />
      {currentBooks.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
      <PaginationComponent
        itemsPerPage={itemsPerPage}
        totalItems={list.length}
        paginate={paginate}
      />
    </div>
  );
};

export default BookList;