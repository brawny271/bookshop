import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchBooks } from '../redux/AllDataSlice';


const SearchBar = () => {
    const [title, setTitle] = useState('');
    const dispatch = useDispatch();
  
    const handleSearch = () => {
      dispatch(fetchBooks(title));
    };
  
    return (
      <div className="search-bar">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Search for books by title..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    );
  };
  
  export default SearchBar;