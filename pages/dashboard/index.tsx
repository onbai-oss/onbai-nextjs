import Link from 'next/link'
import Button from '@/components/base/Button'
import CollectionIcon from '@/components/base/CollectionIcon'
import GetDataError from '@/components/base/GetDataError'
import CollectionLoader from '@/components/base/CollectionLoader'
import { NavLoggedIn } from '@/components/NavLoggedIn'
import { getData } from '@/utils/api'
import { PAGES } from '@/utils/constant'
import { useUserLocal } from '@/utils/hooks'
import Pagination from '@/components/base/Pagination'
import { useState } from 'react'
import Input from '@/components/base/Input'

export default function DashboardPage() {
  // const { data: userData } = getData('users')
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(10)
  const [search, setSearch] = useState('')

  const userLocal = useUserLocal()
  const paginateQuery = `&$skip=${
    page * limit
  }&$limit=${limit}&title[$search]=${search}`
  const { data: listCollection, error, isLoading } = getData(
    userLocal?.id ? `collection?userId=${userLocal?.id}${paginateQuery}` : ''
  )

  const onSearch = (e) => {
    e.preventDefault()
    e.target.search.blur()
  }

  return (
    <>
      <NavLoggedIn />
      <main className={`mb-8`}>
        <section
          className={`h-32 font-semibold flex flex-col justify-center items-center
          bg-gradient-to-r from-green-600 to-green-500
          `}
        >
          <div className={`my-4 text-white text-2xl`}>
            Wellcome {userLocal?.email}
          </div>
        </section>

        <section
          className={`px-4 py-4 mb-4 container mx-auto flex flex-col sm:flex-row justify-between items-center`}
        >
          <h1 className={`font-semibold text-xl`}>
            {listCollection?.total} collections
          </h1>
          <form onSubmit={onSearch} className={`m-2`}>
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
                      className={`w-full text-center p-4 rounded-md shadow-md hover:shadow-xl`}
                    >
                      <div className={`w-32 mx-auto`}>
                        <CollectionIcon fill={i.color} icon={i.icon} />
                      </div>
                      <div
                        title={i.title}
                        className={`mt-2 font-semibold text-xl sm:truncate `}
                      >
                        {i.title}
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
              <div>
                <img
                  width="175"
                  className={`mx-auto`}
                  src="/nodata_flower.png"
                  alt="no data"
                />
              </div>
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
      </main>
    </>
  )
}
