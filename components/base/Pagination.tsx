import React, { ReactElement } from 'react'
import ReactPaginate from 'react-paginate'

interface Props {
  pageCount: number
  initialPage: number
  onPageChange?: (e: any) => any
}

export default function Pagination({
  pageCount,
  initialPage,
  onPageChange,
}: Props): ReactElement {
  return (
    <ReactPaginate
      onPageChange={onPageChange}
      initialPage={initialPage}
      pageCount={pageCount}
      pageRangeDisplayed={1}
      marginPagesDisplayed={1}
      containerClassName="flex items-center select-none"
      pageLinkClassName="hover:underline w-10 m-2 flex items-center justify-center p-2 border rounded-md"
      activeLinkClassName="bg-green-500 text-white"
      nextClassName="p-2 hover:underline"
      previousClassName="p-2 hover:underline"
    />
  )
}
