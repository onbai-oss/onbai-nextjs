import { getData } from '@/utils/api'
import { PAGES } from '@/utils/constant'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { ReactElement, useState } from 'react'
import Input from './base/Input'
import Pagination from './base/Pagination'
import CollectionLoader from './base/CollectionLoader'
import GetDataError from './base/GetDataError'

interface Props {
  user
}

export default function RoomList({ user }: Props): ReactElement {
  const router = useRouter()

  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(10)
  const [search, setSearch] = useState('')
  const paginateQuery = `&$skip=${
    page * limit
  }&$limit=${limit}&name[$search]=${search}`

  const { data: rooms, error: errorRooms, isLoading: isLoadingRoom } = getData(
    user?.id ? `room/?userId=${user?.id}${paginateQuery}` : ''
  )

  const onSearch = (e) => {
    e.preventDefault()
    e.target.search.blur()
  }

  return (
    <section className={`container mx-auto px-4 mb-6`}>
      <div
        className={`flex flex-col sm:flex-row justify-between items-center mb-4`}
      >
        <div className={` font-semibold my-4 text-xl`}>
          {rooms?.total || '0'} rooms
        </div>
        <form onSubmit={onSearch} className={`my-2 w-full sm:w-auto`}>
          <Input
            name="search"
            icon="search-outline"
            type="search"
            placeholder="search room..."
            onChange={(e) => setSearch(e.target.value)}
            defaultValue={search}
          ></Input>
        </form>
      </div>

      <div>
        {!isLoadingRoom && !errorRooms && rooms?.data?.length ? (
          <div className={`grid grid-cols-1 sm:grid-cols-2 grid-rows-1 gap-4`}>
            {rooms.data?.map((i) => (
              <Link href={PAGES.ROOM + `/${i.id}`} key={i.id}>
                <button
                  className={`appearance-none  px-4 py-6 w-full shadow-md block rounded-md hover:shadow-lg border-2 border-solid focus:ring-1 ring-gray-600 ring-offset-2`}
                >
                  <div className={`text-left font-semibold`}>{i?.name}</div>
                </button>
              </Link>
            ))}
          </div>
        ) : (
          <div className={`text-center`}>
            <figure>
              <img
                width="175"
                className={`mx-auto`}
                src="/nodata_flower.png"
                alt="no data"
              />
            </figure>
            <div className={`mt-4 font-semibold`}>No rooms found.</div>
          </div>
        )}

        {isLoadingRoom ? (
          <section className={`flex justify-center`}>
            <CollectionLoader uniqueKey={'roomlist-loader'} />
          </section>
        ) : null}

        {!isLoadingRoom && errorRooms ? <GetDataError /> : null}
      </div>

      <div className={`flex container mx-auto justify-end my-6 px-4`}>
        <Pagination
          page={page}
          total={rooms?.total}
          limit={rooms?.limit}
          onPageChange={setPage}
        />
      </div>
    </section>
  )
}
