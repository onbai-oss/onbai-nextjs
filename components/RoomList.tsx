import { getData } from '@/utils/api'
import { PAGES, ROOM } from '@/utils/constant'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { ReactElement, useState, Fragment } from 'react'
import Input from './base/Input'
import Pagination from './base/Pagination'
import CollectionLoader from './base/CollectionLoader'
import GetDataError from './base/GetDataError'
import { Twemoji } from 'react-emoji-render'
import { userContext } from './auth/userProvider'
import Button from './base/Button'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

interface Props {}

const listRoomStatus = [
  { name: 'All', value: '' },
  { name: 'Playing', value: 'playing' },
  { name: 'Wait', value: 'wait' },
  { name: 'End', value: 'end' },
]

export default function RoomList({}: Props): ReactElement {
  const [selected, setSelected] = useState(listRoomStatus[0])

  const user = userContext()

  const router = useRouter()

  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(10)
  const [search, setSearch] = useState('')
  const paginateQuery = `&$skip=${
    page * limit
  }&$limit=${limit}&name[$search]=${search}&${
    selected.value ? `status=${selected.value}` : ''
  }
  `

  const { data: rooms, error: errorRooms, isLoading: isLoadingRoom } = getData(
    user?.id ? `room/?userId=${user?.id}${paginateQuery}` : ''
  )

  const onSearch = (e) => {
    e.preventDefault()
    e.target.search.blur()
  }

  return (
    <section className={`container mx-auto px-4 py-4`}>
      <div
        className={`flex flex-col sm:flex-row justify-between items-center mb-4`}
      >
        <div className={`font-semibold my-4 text-xl`}>
          {rooms?.total || '0'} rooms
        </div>
        <div className={`flex items-center space-x-2`}>
          <Listbox value={selected} onChange={setSelected}>
            <div className="relative">
              <Listbox.Button className="cursor-pointer font-semibold relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md focus:outline-none  ">
                <span className="block truncate">Status: {selected.name}</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <SelectorIcon className="w-5 h-5 text-gray-600" />
                </span>
              </Listbox.Button>
              <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none ">
                {listRoomStatus.map((person, personIdx) => (
                  <Listbox.Option
                    key={personIdx}
                    className={({ active }) =>
                      `${active ? 'bg-blue-50' : ''}
                      font-semibold cursor-pointer select-none relative py-2 pl-10 pr-4 `
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={`block truncate font-semibold`}>
                          {person.name}
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

      <div>
        {!isLoadingRoom && !errorRooms && rooms?.data?.length ? (
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  grid-rows-1 gap-4`}
          >
            {rooms.data?.map((i) => (
              <Link href={PAGES.ROOM + `/${i.id}`} key={i.id}>
                <button
                  className={`appearance-none relative px-4 py-6 w-full block rounded-md shadow hover:shadow-md border-2 border-solid focus:ring-1 ring-gray-600 ring-offset-2`}
                >
                  {i?.status == ROOM.STATUS.PLAYING ? (
                    <div title="Playing" className={`absolute top-1 right-1`}>
                      <span className="flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                      </span>
                    </div>
                  ) : null}

                  {i?.status == ROOM.STATUS.WAIT ? (
                    <div title="Wait" className={`absolute top-1 right-1`}>
                      <span className="flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-500"></span>
                      </span>
                    </div>
                  ) : null}

                  {i?.status == ROOM.STATUS.END ? (
                    <div title="Wait" className={`absolute top-1 right-1`}>
                      <span className="flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-gray-500 opacity-75"></span>
                      </span>
                    </div>
                  ) : null}

                  <div className={`flex space-x-1 items-center font-semibold`}>
                    <div>
                      <Twemoji text={i?.password ? '🔒' : '#'} />
                    </div>
                    <div className={`truncate`}>{i?.name}</div>
                  </div>
                </button>
              </Link>
            ))}
          </div>
        ) : (
          <div className={`text-center`}>
            <figure className={`w-32 mx-auto`}>
              <img
                className={`w-full`}
                src="/nodata_flower.png"
                alt="no data"
              />
            </figure>
            <div className={`mt-4 font-semibold`}>No rooms found.</div>
            <div className={`mt-4 flex justify-center`}>
              <Link href={PAGES.NEW_ROOM}>
                <Button color="info-outline" icon="plus-outline">
                  Create new room
                </Button>
              </Link>
            </div>
          </div>
        )}

        {isLoadingRoom ? (
          <section className={`flex justify-center`}>
            <CollectionLoader uniqueKey={'roomlist-loader'} />
          </section>
        ) : null}

        {!isLoadingRoom && errorRooms ? <GetDataError /> : null}
      </div>

      <div
        className={`flex container mx-auto justify-end ${
          page > 1 ? 'my-6' : ''
        } px-4`}
      >
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
