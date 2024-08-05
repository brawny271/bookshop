import React from 'react';
import './filter.css';

const Filter = () => {
  return (
    <div className="sort-filter">
      <label>Sort By: </label>
      <select>
        <option value="ASC">Ascending</option>
        <option value="DESC">Descending</option>
      </select>
    </div>
  );
};

export default Filter;