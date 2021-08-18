import { getData } from '@/utils/api'
import { PAGES } from '@/utils/constant'
import React, { ReactElement, useState } from 'react'
import Button from './base/Button'
import Input from './base/Input'
import Pagination from './base/Pagination'
import CollectionLoader from './base/CollectionLoader'
import GetDataError from './base/GetDataError'
import Link from 'next/link'
import { userContext } from './auth/userProvider'
import { Listbox } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

interface Props {}

const listSort = [
  { name: 'Newst', value: '-1' },
  { name: 'Oldest', value: '1' },
]

export default function CollectionList({}: Props): ReactElement {
  const [selected, setSelected] = useState(listSort[0])

  const user = userContext()

  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(10)
  const [search, setSearch] = useState('')

  const paginateQuery = `&$skip=${
    page * limit
  }&$limit=${limit}&title[$search]=${search}&$sort[createdAt]=${selected.value}`
  const { data: listCollection, error, isLoading } = getData(
    user?.id ? `collection?userId=${user?.id}${paginateQuery}` : ''
  )

  const onSearch = (e) => {
    e.preventDefault()
    e.target.search.blur()
  }
  return (
    <section className={`py-4`}>
      <div
        className={`px-4 container mx-auto flex flex-col sm:flex-row justify-between items-center`}
      >
        <h1 className={`font-semibold my-4 text-xl`}>
          {listCollection?.total} collections
        </h1>
        <div className="flex items-center space-x-2">
          <Listbox value={selected} onChange={setSelected}>
            <div className="relative">
              <Listbox.Button className="cursor-pointer font-semibold relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md focus:outline-none ">
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
              placeholder="search..."
              onChange={(e) => setSearch(e.target.value)}
              defaultValue={search}
            ></Input>
          </form>
        </div>
      </div>

      {/* Loading */}
      {isLoading ? (
        <section className={`flex justify-center`}>
          <CollectionLoader uniqueKey={'collection-loader'} />
        </section>
      ) : null}

      {/* List Collection */}
      {!isLoading && !error && listCollection?.data?.length ? (
        <>
          <div
            className={`mt-2 sm:mt-0 container mx-auto px-4 grid grid-rows-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3`}
          >
            {listCollection.data.map((i, index) => (
              <div key={index}>
                <Link href={PAGES.COLLECTION + `/${i.id}`}>
                  <button
                    className={`border-2 border-solid focus:ring-1 ring-gray-600 ring-offset-2 w-full text-center p-4 rounded-md shadow-md hover:shadow-lg hover:text-blue-500`}
                  >
                    <div
                      title={i.title}
                      className={`flex items-center justify-center space-x-2 font-semibold text-xl `}
                    >
                      <div className={`truncate`}>{i.title}</div>
                    </div>
                  </button>
                </Link>
              </div>
            ))}
          </div>
          <div className={`flex container mx-auto justify-end my-6 px-4`}>
            <Pagination
              page={page}
              total={listCollection.total}
              limit={listCollection.limit}
              onPageChange={setPage}
            />
          </div>
        </>
      ) : null}

      {/* Not found */}
      {!isLoading && !error && !listCollection?.data?.length ? (
        <section className={`flex justify-center items-center `}>
          <div>
            <figure className={`w-32 mx-auto`}>
              <img
                className={`mx-auto w-full`}
                src="/nodata_flower.png"
                alt="no data"
              />
            </figure>
            <div className={`mt-4 text-center font-semibold`}>
              No collection found.
            </div>
            <div className={`mt-4 flex justify-center`}>
              <Link href={PAGES.NEW_COLLECION}>
                <Button color="info-outline" icon="plus-outline">
                  Create new collection
                </Button>
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      {!isLoading && error ? <GetDataError /> : null}
    </section>
  )
}
