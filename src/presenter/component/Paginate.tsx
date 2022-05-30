import React, { useState } from "react";
import ReactPaginate from "react-paginate";

export default function Paginate(props: {
  size: number;
  page: number;
  totalSize: number;
  changePage?: (event: any) => void;
}): JSX.Element {
  const { totalSize, size, changePage } = props;

  const [pageCount] = useState(Math.ceil(totalSize / size));
  return (
    <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={5}
      onPageChange={changePage}
      nextLabel="Next"
      breakLabel="..."
      previousLabel="Prev"
      containerClassName="rounded-2xl bg-gray-100 grid grid-flow-col"
      pageClassName="px-4 py-3 text-blue"
      pageLinkClassName="my-auto"
      nextClassName="px-4 py-3 text-blue"
      previousClassName="px-4 py-3 text-blue"
      activeClassName="bg-blue"
      activeLinkClassName="text-gray-100"
      disabledLinkClassName="text-gray-400"
    />
  );
}
