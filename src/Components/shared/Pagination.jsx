import React, { useEffect, useState } from "react";

const Pagination = ({ count, size, setSize, currentPage, setCurrentPage }) => {
  const [pages, setPages] = useState(0);
  useEffect(() => {
    setPages(Math.ceil(count / size));
  }, [size, count]);
  const pageNumbers = [...Array(pages).keys()];
  return (
    <div className="join my-2">
      {pageNumbers?.map((page) => (
        <input
          className="join-item btn btn-square"
          type="radio"
          name="options"
          aria-label={page+1}
          checked={page === currentPage}
          onClick={() => setCurrentPage(page)}
          key={page}
          readOnly
        />
      ))}
    </div>
  );
};

export default Pagination;
