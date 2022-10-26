import React from 'react';
import ReactPaginate from 'react-paginate';
import st from './Pagination.module.scss';

type PaginationProps = {
  currentPage: number;
  onCahgePage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, onCahgePage }) => {
  //debugger;
  return (
    <ReactPaginate
      className={st.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => onCahgePage(event.selected + 1)}
      //onPageChange={(event) => console.log(event)}    Событие event нам вернёт selected - в котором будет указано значение index(а) массива, а нам нужен номер страницы поэтому + 1, так реализовали библиотеку Pagination
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={currentPage - 1} // НЕ ПОНЯЛА ДЛЯ ЧЕГО ОН
      previousLabel="<"
    />
  );
}

export default Pagination;
