import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './bookcard.css';
import { editBook } from '../redux/AllDataSlice';

const BookCard = ({ book }) => {
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({ ...book });
    const dispatch = useDispatch();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        dispatch(editBook(formData));
        handleClose();
    };

    return (
        <div className="book-card">
            <div style={{ display: "flex", flexWrap: "wrap", height: "100%" }}>
                <div className='image-section'>
                </div>
                <div className='product-content'>
                    <h3>{book.title}</h3>
                    <p><strong>Author:</strong> {book.author}</p>
                    <p><strong>Country:</strong> {book.country}</p>
                    <p><strong>Language:</strong> {book.language}</p>
                    <p><strong>Pages:</strong> {book.pages}</p>
                    <p><strong>Year:</strong> {book.year}</p>
                    <button variant="primary" className="edit-button" onClick={handleShow}>
                        Edit
                    </button>
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Book</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Title"
                    />
                    <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        placeholder="Author"
                    />
                    <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        placeholder="Country"
                    />
                    <input
                        type="text"
                        name="language"
                        value={formData.language}
                        onChange={handleChange}
                        placeholder="Language"
                    />
                    <input
                        type="text"
                        name="link"
                        value={formData.link}
                        onChange={handleChange}
                        placeholder="Link"
                    />
                    <input
                        type="number"
                        name="pages"
                        value={formData.pages}
                        onChange={handleChange}
                        placeholder="Pages"
                    />
                    <input
                        type="text"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        placeholder="Year"
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BookCard;