import Button from '@/components/base/Button'
import Footer from '@/components/base/Footer'
import Input from '@/components/base/Input'
import { Modal } from '@/components/base/Modal'
import { NavLoggedIn } from '@/components/NavLoggedIn'
import QuestionList from '@/components/QuestionList'
import { API, getData } from '@/utils/api'
import { PAGES } from '@/utils/constant'
import { getPropsUserSever } from '@/utils/session'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormEventHandler, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import toast from 'react-hot-toast'

export default function CollectionPage({ user }) {
  const router = useRouter()
  const { id } = router.query

  const [isShowDelete, setIsShowDelete] = useState(false)
  const [isShowAddQuiz, setIsShowAddQuiz] = useState(false)

  const [numberCreate, setNumberCreate] = useState<number>(10)

  const {
    data: collection,
    error: errorCollection,
    isLoading: isLoadingColletion,
  } = getData(id ? `collection/${id}` : '')

  const isAuthor = user?.id === collection?.userId

  const onSubmitAddQuiz: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    router.push({
      pathname: `${id}${PAGES.NEW_QUESTION}`,
      query: {
        numberCreate: numberCreate,
        current: 0,
      },
    })
  }

  const onDeleteCollection = () => {
    API.delete(`collection/${id}`)
      .then((r) => {
        toast.success('Deleted!')
        router.push(PAGES.DASHBOARD)
      })
      .finally(() => {
        setIsShowDelete(false)
      })
  }

  return (
    <>
      <NextSeo
        title={'Collection ' + (collection?.title || '')}
        titleTemplate={`${
          process.env.NODE_ENV === 'development' ? '[DEV]' : ''
        } Onbai.online | %s`}
      />
      <NavLoggedIn />
      <main className={`min-h-screen`}>
        <div className={`my-6`}>
          <div
            className={`flex justify-center items-center space-x-2 mt-3 text-2xl font-semibold`}
          >
            <div>{collection?.title}</div>
          </div>
          <div className={`text-center mt-1  font-semibold`}>
            {collection?.desc}
          </div>

          <div className={`mt-4 ${!isAuthor && 'hidden'}`}>
            <div className={`flex justify-center my-2`}>
              <div className={`mr-2`}>
                <CopyToClipboard
                  text={process.browser ? location.href : ''}
                  onCopy={() => {
                    toast.success('Copied to your clipboard!')
                  }}
                >
                  <Button
                    title="Add new question"
                    icon="share-outline"
                    color="primary"
                  ></Button>
                </CopyToClipboard>
              </div>
              <div className={`mr-2`}>
                <Link href={PAGES.EDIT_COLLECION + `/${id}`}>
                  <Button
                    title="Edit collecion"
                    icon="edit-outline"
                    color="primary"
                  ></Button>
                </Link>
              </div>
              <Button
                onClick={() => setIsShowDelete(true)}
                title="Delete collecion"
                icon="trash-outline"
                color="primary"
              ></Button>
            </div>
          </div>

          <div className={`flex justify-center my-4`}>
            <div className={`mr-2`}>
              <Button
                onClick={() => setIsShowAddQuiz(true)}
                title="Edit collecion"
                icon="plus-outline"
                color="primary-outline"
              >
                New question
              </Button>
            </div>
          </div>
        </div>

        <div className={`p-4`}>
          <hr />
        </div>

        <QuestionList />
      </main>

      {/* Modals */}
      <Modal isOpen={isShowAddQuiz} closeModal={() => setIsShowAddQuiz(false)}>
        <form onSubmit={onSubmitAddQuiz} className={`p-2`}>
          <div className={`w-48 mx-auto mb-4`}>
            <img
              src="/studying.svg"
              className={`w-full`}
              alt="new quizz"
              draggable="false"
            />
          </div>
          <div className={`mt-2 mb-4 text-2xl font-semibold`}>
            <h1>How many quiz you want create?</h1>
          </div>
          <div className={``}>
            <Input
              icon="file-text-outline"
              type="number"
              autoFocus
              min="1"
              max="5000"
              onChange={(e) => {
                setNumberCreate(+e.target.value)
              }}
              defaultValue={numberCreate}
            ></Input>
          </div>

          <div className="mt-4 flex justify-center">
            <Button type="submit" icon="arrow-forward-outline" color="info">
              Next
            </Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isShowDelete} closeModal={() => setIsShowDelete(false)}>
        <div className={`p-2`}>
          <div className={` text-2xl font-semibold`}>
            <h1>Are you sure? It can't revert.</h1>
          </div>
          <div className={`w-64 mx-auto`}>
            <img className={`w-full`} src="/dinoc.png" alt="" />
          </div>
          <div className={`flex`}>
            <div className="mr-2">
              <Button
                onClick={onDeleteCollection}
                title="Delete collecion"
                icon="trash-outline"
                color="danger"
              >
                Yes, delete
              </Button>
            </div>
            <Button onClick={() => setIsShowDelete(false)} color="text-outline">
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      <Footer></Footer>
    </>
  )
}
export const getServerSideProps = getPropsUserSever
