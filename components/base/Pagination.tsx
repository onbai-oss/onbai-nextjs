import React, { ReactElement } from 'react'

interface PaginationProps {
  page?: number
  total?: number
  limit?: number
  onPageChange?
}

export default function Pagination({
  page = 0,
  total = 0,
  limit = 10,
  onPageChange,
}: PaginationProps): ReactElement {
  const listPage = Array.from(Array(Math.ceil(total / limit))).map(
    (_, index) => index
  )

  const btnClass = `
  mx-1 border border-gray-300 shadow rounded-md bg-gray-50 py-2 px-4 text-sm 
  hover:shadow-md hover:bg-green-600 hover:text-white flex justify-center items-center 
  `

  const onChange = (type) => {
    if (type === 'prev') {
      if (!page) return
      onPageChange(page - 1)
      window.scroll(0, 0)
    }
    if (type === 'next') {
      if (page === listPage.length - 1) return
      onPageChange(page + 1)
      window.scroll(0, 0)
    }
  }

  const onSelectChange = (e) => {
    window.scroll(0, 0)
    onPageChange(Number(e.target.value))
  }

  return (
    <section className={``}>
      {Math.ceil(total / limit) > 1 ? (
        <div className={`flex items-center`}>
          <div className={`mr-4 flex items-center justify-center`}>
            <select
              onChange={onSelectChange}
              className={`p-2 bg-transparent`}
              name="page"
              id="page-select"
              value={page}
            >
              {listPage.map((i) => (
                <option key={i} value={i}>
                  Page {i + 1}
                </option>
              ))}
            </select>
          </div>

          {page ? (
            <button
              onClick={() => onChange('prev')}
              className={btnClass + ` ${page ? '' : ' cursor-not-allowed'}`}
            >
              Prev
            </button>
          ) : null}

          {page !== listPage.length - 1 ? (
            <button
              onClick={() => onChange('next')}
              className={
                btnClass +
                ` ${page !== listPage.length - 1 ? '' : ' cursor-not-allowed'}`
              }
            >
              Next
            </button>
          ) : null}
        </div>
      ) : null}
    </section>
  )
}
