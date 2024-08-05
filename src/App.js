import React from 'react';
import SearchBar from './components/SearchBar';
import BookList from './components/BookList';
import './App.css';

const App = () => {
  return (
      <div className="app">
        <SearchBar />
        <BookList />
      </div>
  );
};

export default App;
