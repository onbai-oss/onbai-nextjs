import { getData } from '@/utils/api'
import React, { ReactElement, useState } from 'react'
import Button from './base/Button'
import Input from './base/Input'
import Pagination from './base/Pagination'
import GetDataError from './base/GetDataError'
import { Modal } from './base/Modal'
import { userContext } from './auth/userProvider'
import {
  CheckCircleIcon,
  CheckIcon,
  SelectorIcon,
} from '@heroicons/react/solid'
import { Listbox } from '@headlessui/react'
interface Props {
  isOpen
  onCloseModal
  onSelected
}
const listSort = [
  { name: 'Newst', value: '-1' },
  { name: 'Oldest', value: '1' },
]

export default function CollectionPicker({
  isOpen,
  onCloseModal,
  onSelected,
}: Props): ReactElement {
  const [selected, setSelected] = useState(listSort[0])

  const user = userContext()

  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(10)
  const [search, setSearch] = useState('')

  const [listSelected, setListSelected] = useState<Array<any>>([])

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

  const toggleSelect = (item: any) => {
    if (listSelected.find((i) => i.id === item.id)) {
      setListSelected(listSelected.filter((i) => i.id !== item.id))
    } else {
      setListSelected((old) => [...old, ...[item]])
    }
  }

  const onApply = () => {
    onSelected(listSelected)
    onCloseModal()
  }

  const onClear = () => {
    setListSelected([])
  }

  return (
    <div>
      <Modal isOpen={isOpen} closeModal={onCloseModal}>
        <div>
          <div className={`font-semibold text-2xl text-center mb-4`}>
            Select collections
          </div>
          <section
            className={`mb-2 mt-2 container mx-auto flex flex-col sm:flex-row justify-between items-center`}
          >
            <div className={`mr-4`}>
              <Listbox value={selected} onChange={setSelected}>
                <div className="relative">
                  <Listbox.Button className="cursor-pointer font-semibold relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md focus:outline-none  ">
                    <span className="block truncate">
                      Sort: {selected.name}
                    </span>
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
            </div>
            <form onSubmit={onSearch} className={`my-2 flex-1`}>
              <Input
                name="search"
                icon="search-outline"
                type="search"
                placeholder="search title..."
                onChange={(e) => setSearch(e.target.value)}
                defaultValue={search}
                autoFocus={false}
                autoComplete={'off'}
              ></Input>
            </form>
          </section>

          {/* List Collection */}
          {!error ? (
            listCollection?.data?.length ? (
              <>
                <section
                  className={`container mx-auto grid grid-rows-1 grid-cols-2 gap-2`}
                >
                  {listCollection.data.map((i, index) => (
                    <div key={index}>
                      <button
                        onClick={() => toggleSelect(i)}
                        className={`border-2 ${
                          listSelected.find((f) => f.id === i.id) ? ' ' : ''
                        } border-solid w-full block relative text-center p-1 rounded-md shadow hover:shadow-md `}
                      >
                        <span
                          title={i.title}
                          className={`flex w-full h-full space-x-2 px-2 py-1 items-center font-semibold`}
                        >
                          <div className={`truncate`}>{i.title}</div>

                          <div
                            className={`${
                              listSelected.find((f) => f.id === i.id)
                                ? ''
                                : 'hidden'
                            } absolute top-0 right-1 bg-white p-1`}
                          >
                            <CheckCircleIcon
                              width="30"
                              className={`text-green-600`}
                            ></CheckCircleIcon>
                          </div>
                        </span>
                      </button>
                    </div>
                  ))}
                </section>
                <div className={`flex container mx-auto justify-end mt-3 `}>
                  <Pagination
                    page={page}
                    total={listCollection.total}
                    limit={listCollection.limit}
                    onPageChange={setPage}
                  />
                </div>

                <div className={`mt-4 mb-2 flex justify-center space-x-2`}>
                  <Button
                    disabled={!listSelected.length}
                    onClick={onApply}
                    icon="attach-2-outline"
                    color="info"
                    className={`w-full`}
                  >
                    Select{' '}
                    {listSelected.length ? `(${listSelected.length})` : ''}
                  </Button>
                </div>
                {listSelected.length ? (
                  <div>
                    <div className={`my-4`}>
                      <hr />
                    </div>
                    <div className={` mb-0 flex justify-center`}>
                      <Button
                        color="info-outline"
                        onClick={onClear}
                        icon="trash-outline"
                      >
                        Clear
                      </Button>
                    </div>
                  </div>
                ) : null}
              </>
            ) : (
              <section className={`flex justify-center items-center `}>
                <div>
                  <figure className={`w-24 mt-2 mx-auto`}>
                    <img
                      className={`w-full`}
                      src="/nodata_flower.png"
                      alt="no data"
                    />
                  </figure>
                  <div className={`mt-4 text-center text-sm font-semibold`}>
                    No collection found.
                  </div>
                </div>
              </section>
            )
          ) : null}

          {!isLoading && error ? <GetDataError /> : null}
        </div>
      </Modal>
    </div>
  )
}
