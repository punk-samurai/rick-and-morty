import React from 'react';
import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  
  const startPage = currentPage - 2 <= 0 ? 1 : currentPage - 2;
  const endPage = startPage + 4 >= totalPages ? totalPages : startPage + 4;

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <div className={styles.pagination}>
      <button 
      className={styles.pageNumber} disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>{"<"}</button>
      {pages.map(pageNum => (
        <button
          key={pageNum}
          className={`${styles.pageNumber} ${currentPage === pageNum ? styles.active : ''}`}
          onClick={() => onPageChange(pageNum)}
        >
          {pageNum}
        </button>
      ))}
      <button className={styles.pageNumber} disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>{">"}</button>
    </div>
  );
}

export default Pagination;
