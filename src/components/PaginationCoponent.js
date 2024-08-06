import React from 'react';
import { Pagination } from 'antd';
import './paginationcomponent.css';

const PaginationComponent = ({ itemsPerPage, totalItems, paginate }) => {
  // Calculate total pages based on totalItems and itemsPerPage
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="pagination">
      <Pagination
        pageSize={itemsPerPage}
        total={totalPages * itemsPerPage} // Set total items for the pagination
        onChange={(page) => paginate(page)}
        current={totalPages}
      />
    </div>
  );
};

export default PaginationComponent;