import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './bookcard.css';
import { editBook } from '../redux/AllDataSlice';
import EditBookModal from './EditbookModal';

const BookCard = ({ book }) => {
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();

  const handleEdit = () => {
    setModalShow(true);
  };

  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <p>{book.author}</p>
      <button onClick={handleEdit}>Edit</button>
      <EditBookModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        book={book}
        onSave={(updatedBook) => dispatch(editBook(updatedBook))}
      />
    </div>
  );
};

export default BookCard;