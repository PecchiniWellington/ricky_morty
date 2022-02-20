import React from 'react';
import './simplePagination.style.css'

interface Props {
  postsPerPage: number,
  totalPosts: number,
  paginate: (n: number) => void
}

const SimplePagination = ({ postsPerPage, totalPosts, paginate }: Props) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pageNumbers'>
        {pageNumbers.map((n: number) => (
          <li onClick={() => paginate(n)} key={n} className='page-item'>
            {n}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SimplePagination;