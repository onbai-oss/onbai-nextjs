import React, { ReactElement, useState } from 'react'
import Input from './base/Input'
import CollectionLoader from './base/CollectionLoader'
import { useRouter } from 'next/router'
import { getData } from '@/utils/api'
import { PAGES } from '@/utils/constant'
import Pagination from './base/Pagination'
import { Listbox } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

interface QuestionListProps {}

const listSort = [
  { name: 'Newest', value: '-1' },
  { name: 'Oldest', value: '1' },
]

export default function QuestionList({}: QuestionListProps): ReactElement {
  const [selected, setSelected] = useState(listSort[0])

  const router = useRouter()
  const { id } = router.query

  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(10)
  const [search, setSearch] = useState('')

  const paginateQuery = `&$skip=${
    page * limit
  }&$limit=${limit}&question[$search]=${search}&$sort[createdAt]=${
    selected.value
  }`

  const {
    data: questions,
    error: errorQuestion,
    isLoading: isLoadingQuestion,
  } = getData(id ? `question/?collectionId=${id}${paginateQuery}` : '')

  const onSearch = (e) => {
    e.preventDefault()
    e.target.search.blur()
  }

  const onClickQuestion = (questionID) => {
    router
      .push({
        pathname: `${id}${PAGES.EDIT_QUESTION}/${questionID}`,
        query: {
          mode: 'editSingle',
        },
      })
      .then(() => {})
  }

  return (
    <>
      <section className={`container mx-auto px-4 mb-6`}>
        <div
          className={`flex flex-col sm:flex-row justify-between items-center `}
        >
          <div className={` font-semibold my-4`}>
            {questions?.total || '0'} questions
          </div>
          <div className="flex items-center space-x-2">
            <Listbox value={selected} onChange={setSelected}>
              <div className="relative">
                <Listbox.Button className="cursor-pointer font-semibold relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md focus:outline-none  ">
                  <span className="block truncate">Sort: {selected.name}</span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <SelectorIcon className="w-5 h-5 text-gray-600" />
                  </span>
                </Listbox.Button>
                <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none ">
                  {listSort.map((opt, idx) => (
                    <Listbox.Option
                      key={idx}
                      className={({ active }) =>
                        `${
                          active ? 'bg-blue-50' : ''
                        }  font-semibold cursor-pointer select-none relative py-2 pl-10 pr-4 focus:outline-none`
                      }
                      value={opt}
                    >
                      {({ selected, active }) => (
                        <>
                          <span className={`block truncate font-semibold`}>
                            {opt.name}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 `}
                            >
                              <CheckIcon className="w-5 h-5" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
            <form onSubmit={onSearch} className={`my-2 w-full sm:w-auto`}>
              <Input
                name="search"
                icon="search-outline"
                type="search"
                placeholder="search question..."
                onChange={(e) => setSearch(e.target.value)}
                defaultValue={search}
              ></Input>
            </form>
          </div>
        </div>
        {/* List questions */}
        <div className={`grid grid-cols-1 grid-rows-1 gap-2`}>
          {isLoadingQuestion && !errorQuestion ? (
            <div className={`flex justify-center`}>
              <CollectionLoader />
            </div>
          ) : questions?.data?.length ? (
            questions?.data.map((i) => (
              <button
                key={i.id}
                onClick={() => onClickQuestion(i.id)}
                className={`max-w-full w-96 mx-auto shadow rounded-md hover:shadow-md hover:border-blue-500 border-2 border-transparent border-solid   p-4`}
              >
                <div
                  className={`prose prose-sm`}
                  dangerouslySetInnerHTML={{ __html: i.question }}
                ></div>
              </button>
            ))
          ) : (
            <div
              className={`flex justify-center items-center animate__animated animate__fadeIn`}
            >
              <div>
                <div className={`w-32 mx-auto`}>
                  <img
                    className={`mx-auto w-full`}
                    src="/nodata_flower.png"
                    alt="no data"
                  />
                </div>
                <div className={`mt-4 text-center font-semibold`}>
                  This collection don't have any question.
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <div className={`flex container mx-auto justify-center my-6 px-4`}>
        <Pagination
          page={page}
          total={questions?.total}
          limit={questions?.limit}
          onPageChange={setPage}
        />
      </div>
    </>
  )
}
