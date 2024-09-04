import React from "react";

const Pagination = ({ pages, goToPage, pageIndex }) => {
  return (
    <div>
      {Array(pages)
        .fill("")
        .map((p, i) => (
          <button
            className={`pagination-btn ${pageIndex === i ? "active-page" : ""}`}
            onClick={() => goToPage(i)}
          >
            {i + 1}
          </button>
        ))}
    </div>
  );
};

export default Pagination;
