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
import { Twemoji } from 'react-emoji-render'

interface Props {}

export default function CollectionList({}: Props): ReactElement {
  const user = userContext()

  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(10)
  const [search, setSearch] = useState('')

  const paginateQuery = `&$skip=${
    page * limit
  }&$limit=${limit}&title[$search]=${search}`
  const { data: listCollection, error, isLoading } = getData(
    user?.id ? `collection?userId=${user?.id}${paginateQuery}` : ''
  )

  const onSearch = (e) => {
    e.preventDefault()
    e.target.search.blur()
  }
  return (
    <div>
      <section
        className={`px-4 py-4 container mx-auto flex flex-col sm:flex-row justify-between items-center`}
      >
        <h1 className={`font-semibold text-xl`}>
          {listCollection?.total} collections
        </h1>
        <form onSubmit={onSearch} className={`my-2 w-full sm:w-auto`}>
          <Input
            name="search"
            icon="search-outline"
            type="search"
            placeholder="search title..."
            onChange={(e) => setSearch(e.target.value)}
            defaultValue={search}
          ></Input>
        </form>
      </section>

      {/* Loading */}
      {isLoading ? (
        <section className={`flex justify-center`}>
          <CollectionLoader uniqueKey={'collection-loader'} />
        </section>
      ) : null}

      {/* List Collection */}
      {!isLoading && !error && listCollection?.data?.length ? (
        <>
          <section
            className={`container mx-auto px-4 grid grid-rows-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5  gap-4`}
          >
            {listCollection.data.map((i, index) => (
              <div key={index}>
                <Link href={PAGES.COLLECTION + `/${i.id}`}>
                  <button
                    className={`border-2 border-solid focus:ring-1 ring-gray-600 ring-offset-2 w-full text-center p-4 rounded-md shadow-md hover:shadow-xl `}
                  >
                    <div
                      title={i.title}
                      className={`mt-2 flex items-center justify-center space-x-2 font-semibold text-xl `}
                    >
                      <div>
                        <Twemoji text={i.icon} />
                      </div>
                      <div className={`truncate`}>{i.title}</div>
                    </div>
                  </button>
                </Link>
              </div>
            ))}
          </section>
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
            <figure>
              <img
                width="175"
                className={`mx-auto`}
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
    </div>
  )
}
