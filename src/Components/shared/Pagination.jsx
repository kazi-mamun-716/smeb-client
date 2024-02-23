import React, { useEffect, useState } from "react";

const Pagination = ({ count, size, setSize, page, setPage }) => {
  const [pages, setPages] = useState(0);
  useEffect(() => {
    setPages(Math.ceil(count / size));
  }, [size, count]);

//   const maxDisplayedPages = 3;

//   let startPage = Math.max(1, page - 1);
//   let endPage = Math.min(pages, startPage + maxDisplayedPages - 1);

//   if (endPage - startPage + 1 < maxDisplayedPages) {
//     startPage = Math.max(1, endPage - maxDisplayedPages + 1);
//   }

//   const paginationArray = Array.from(
//     { length: endPage - startPage + 1 },
//     (_, index) => startPage + index
//   );
  return (
    <div className="flex justify-center my-2">
      <div className="join">
        {/* <button
          onClick={() => setPages((prev) => prev - 1)}
          className="join-item btn"
        >
          «
        </button> */}
        {[...Array(pages).keys()].map((number) => (
          <button
            onClick={() => setPage(number)}
            key={number}
            className={`join-item btn hover:bg-purple-500 ${
              page === number && "bg-blue-600"
            }`}
          >
            {number + 1}
          </button>
        ))}
        <button className="join-item btn btn-disabled">...</button>
        {/* <button
          onClick={() => setPages((prev) => prev + 1)}
          className="join-item btn"
        >
          »
        </button> */}
      </div>
      <select
        onChange={(e) => setSize(e.target.value)}
        className="select select-bordered w-1/4 max-w-xs mx-2"
      >
        <option disabled>Member Counter</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={30}>30</option>
      </select>
    </div>
  );
};

export default Pagination;
