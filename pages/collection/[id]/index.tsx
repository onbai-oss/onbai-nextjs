import Button from '@/components/base/Button'
import CollectionIcon from '@/components/base/CollectionIcon'
import Input from '@/components/base/Input'
import { Modal } from '@/components/base/Modal'
import { NavLoggedIn } from '@/components/NavLoggedIn'
import { API, getData } from '@/utils/api'
import { PAGES } from '@/utils/constant'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormEventHandler, useState } from 'react'
import toast from 'react-hot-toast'

export default function CollectionPage() {
  const router = useRouter()
  const { id } = router.query

  const [isShowDelete, setIsShowDelete] = useState(false)
  const [isShowAddQuiz, setIsShowAddQuiz] = useState(false)

  const [bookColor, setBookColor] = useState('#0F9B6E')
  const [emoji, setEmoji] = useState('')
  const [numberCreate, setNumberCreate] = useState<number>(10)

  const { data: collection, error, isLoading } = getData(
    id ? `collection/${id}` : ''
  )

  const onSubmitAddQuiz: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    // router.push(`
    // ${PAGES.COLLECTION}/123/new-quiz?current=0&number_create=${numberCreate}
    // `)

    router.push({
      pathname: '123/new-quiz',
      query: {
        number_create: numberCreate,
        current: '0',
      },
    })
  }

  const onClickQuestion = () => {
    router.push({
      pathname: '123/edit-quiz/456',
      query: {
        mode: 'editSingle',
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
      <NavLoggedIn isHideNew />
      <main>
        <div className={`my-6`}>
          <div className={`w-32 mx-auto text-center `}>
            <CollectionIcon fill={collection?.color} icon={collection?.icon} />
          </div>
          <div className={`text-center mt-3 text-2xl font-semibold`}>
            {collection?.title}
          </div>
          <div className={`text-center mt-1  font-semibold`}>
            {collection?.desc}
          </div>

          <div className={`mt-4`}>
            <div className={`flex justify-center my-2`}>
              <div className={`mr-2`}>
                <Button
                  onClick={() => setIsShowAddQuiz(true)}
                  title="Add new question"
                  icon="plus-outline"
                  color="primary"
                ></Button>
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
            <div className={`flex justify-center my-2`}></div>
          </div>
        </div>

        <div className={`my-4`}>
          <hr />
        </div>
        <div className={` px-4`}>
          <div className={`font-semibold my-4`}> 30 question </div>

          <div className={`grid grid-cols-1 grid-rows-1 gap-2`}>
            {[1, 2, 3, 4].map((i) => (
              <button
                onClick={onClickQuestion}
                className={`shadow rounded-md hover:shadow-md hover:border-blue-500 border-2 border-transparent border-solid   p-4`}
              >
                <div>Question</div>
              </button>
            ))}
          </div>
        </div>
      </main>

      <Modal isOpen={isShowAddQuiz} closeModal={() => setIsShowAddQuiz(false)}>
        <form onSubmit={onSubmitAddQuiz} className={`p-2`}>
          <div>
            <img src="/quiz3.png" className={`mx-auto`} width="175" alt="" />
          </div>
          <div className={`mt-2 mb-4 text-2xl font-semibold`}>
            <h1>How many quiz you want create?</h1>
          </div>
          <div className={``}>
            <Input
              icon="file-text-outline"
              type="number"
              autoFocus
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

          <div>
            <img src="/dinoc.png" alt="" />
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
    </>
  )
}
