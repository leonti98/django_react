import 'bootstrap/dist/css/bootstrap.min.css';

import { useState } from 'react';
import { PaginationControl } from 'react-bootstrap-pagination-control';

const MyPagination = ({ currentPage, total, limit, setCurrentPage }) => {
  const [page, setPage] = useState(1);

  return (
    <PaginationControl
      page={currentPage}
      between={4}
      total={total}
      limit={limit}
      changePage={(page) => {
        setCurrentPage(page - 1);
      }}
      ellipsis={1}
    />
  );
};

export default MyPagination;
