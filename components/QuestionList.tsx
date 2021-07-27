import React, { ReactElement, useState } from 'react'
import Input from './base/Input'
import CollectionLoader from './base/CollectionLoader'
import { useRouter } from 'next/router'
import { getData } from '@/utils/api'
import { PAGES } from '@/utils/constant'
import Button from './base/Button'
import Pagination from './base/Pagination'

interface Props {
  isAuthor?: boolean
  onClickNew?
}

export default function QuestionList({
  isAuthor,
  onClickNew,
}: Props): ReactElement {
  const router = useRouter()
  const { id } = router.query

  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(10)
  const [search, setSearch] = useState('')
  const paginateQuery = `&$skip=${
    page * limit
  }&$limit=${limit}&question[$search]=${search}`

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
    router.push({
      pathname: `${id}${PAGES.EDIT_QUESTION}/${questionID}`,
      query: {
        mode: 'editSingle',
      },
    })
  }

  return (
    <>
      <section className={` container mx-auto px-4 mb-6`}>
        <div
          className={`flex flex-col sm:flex-row justify-between items-center mb-4`}
        >
          <div className={` font-semibold my-4`}>
            {questions?.total || '0'} questions
          </div>
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
        {/* List questions */}
        <div className={`grid grid-cols-1 grid-rows-1 gap-2`}>
          {isLoadingQuestion && !errorQuestion ? (
            <div className={`flex justify-center`}>
              <CollectionLoader uniqueKey={'collection-loader'} />
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
                <div>
                  <img
                    width="175"
                    className={`mx-auto`}
                    src="/nodata_flower.png"
                    alt="no data"
                  />
                </div>
                <div className={`mt-4 text-center font-semibold`}>
                  This collection don't have any question.
                </div>
                <div
                  className={`mt-4 flex justify-center ${
                    !isAuthor && 'hidden'
                  }`}
                >
                  <Button
                    color="info-outline"
                    onClick={() => onClickNew && onClickNew()}
                    icon="plus-outline"
                  >
                    Create new question
                  </Button>
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
