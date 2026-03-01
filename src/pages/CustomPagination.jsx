import React from "react";
import { Pagination } from "react-bootstrap";

const CustomPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisible = 5, // 最多顯示幾個頁碼
}) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];

    const half = Math.floor(maxVisible / 2);
    let start = Math.max(currentPage - half, 1);
    let end = Math.min(start + maxVisible - 1, totalPages);

    // 修正尾端不足
    if (end - start + 1 < maxVisible) {
      start = Math.max(end - maxVisible + 1, 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="d-flex justify-content-center mt-60">
      <Pagination className="custom-pagination">
        <Pagination.Prev
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          上一頁
        </Pagination.Prev>

        {getPageNumbers().map((page) => (
          <Pagination.Item
            key={page}
            active={currentPage === page}
            onClick={() => onPageChange(page)}
          >
            {page}
          </Pagination.Item>
        ))}

        <Pagination.Next
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          下一頁
        </Pagination.Next>
      </Pagination>
    </div>
  );
};

export default CustomPagination;
