import 'bootstrap/dist/css/bootstrap.min.css';

import { useState } from 'react';
import { PaginationControl } from 'react-bootstrap-pagination-control';

const MyPagination = () => {
  const [page, setPage] = useState(1);

  return (
    <PaginationControl
      page={page}
      between={4}
      total={250}
      limit={20}
      changePage={(page) => {
        setPage(page);
      }}
      ellipsis={1}
    />
  );
};

export default MyPagination;
