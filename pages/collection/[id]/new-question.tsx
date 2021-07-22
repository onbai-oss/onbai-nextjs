import Button from '@/components/base/Button'
import Editor from '@/components/Editor'
import { NavLoggedIn } from '@/components/NavLoggedIn'
import { useEditor, EditorContent } from '@tiptap/react'
import { FormEventHandler, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import StarterKit from '@tiptap/starter-kit'
import { API } from '@/utils/api'
import { PAGES } from '@/utils/constant'
import toast from 'react-hot-toast'
import { Modal } from '@/components/base/Modal'

export default function NewQuiz() {
  const router = useRouter()
  const { number_create, current, questionID, id: collectionID } = router.query
  const [isShowDelete, setIsShowDelete] = useState(false)

  const defaultEditor = {
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        spellcheck: 'false',
        class:
          'onbai-editor prose prose-blue w-full max-w-full px-4 py-2 border-2 border-solid border-gray-600 hover:border-gray-500 rounded-md focus:outline-none focus:ring-1 ring-gray-600 ring-offset-2',
      },
    },
    content: ``,
    editable: true,
  }
  const questionEditor = useEditor(defaultEditor)
  const answerEditor = useEditor(defaultEditor)
  const hintEditor = useEditor(defaultEditor)
  const explainEditor = useEditor(defaultEditor)

  useEffect(() => {
    if (questionID) {
      API.get(PAGES.QUESTION + `/${questionID}`).then((res) => {
        console.log('questionID', res, questionEditor)
        const { answer, hint, explain, question } = res.data

        questionEditor?.commands?.setContent(question)
        answerEditor?.commands?.setContent(answer)
        hintEditor?.commands?.setContent(hint)
        explainEditor?.commands?.setContent(explain)
      })
    }
  }, [questionID, questionEditor, answerEditor, hintEditor, explainEditor])

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    console.log('Submit', e)
    const dataAPI = {
      question: questionEditor?.getHTML(),
      answer: answerEditor?.getHTML(),
      hint: hintEditor?.getHTML(),
      explain: explainEditor?.getHTML(),
      collectionID,
    }

    API[questionID ? 'patch' : 'post'](
      PAGES.QUESTION + (questionID ? `/${questionID}` : ''),
      dataAPI
    ).then((res) => {
      console.log(res)
      toast.success(questionID ? 'Updated!' : 'Created!')
      router.back()
    })
  }

  const onDeleteQuestion = () => {
    API.delete(PAGES.QUESTION + `/${questionID}`).then((res) => {
      toast.success('Deleted!')
      router.back()
    })
  }

  return (
    <>
      <NavLoggedIn isHideNew />

      <main className={`mb-8 `}>
        <div
          className={`h-32 font-semibold flex flex-col justify-center items-center bg-gradient-to-r from-green-600 to-green-500`}
        >
          <div className={`my-4 text-white text-2xl text-center`}>
            {questionID ? (
              <div>Edit question </div>
            ) : (
              <div>
                New question {current}/{number_create}
              </div>
            )}
          </div>
        </div>

        <form onSubmit={onSubmit} className={`p-4 container mx-auto`}>
          <fieldset className={`my-2`}>
            <label className={`my-2 flex items-center font-semibold`}>
              <i data-eva="question-mark-outline" data-eva-fill="#1B324F"></i>
              <span className={`mx-1`}>Question</span>
              <span className={`text-red-500`}>*</span>
            </label>
            <Editor editor={questionEditor} />
          </fieldset>

          <fieldset className={`my-2`}>
            <label className={`my-2 flex items-center font-semibold`}>
              <i data-eva="edit-outline" data-eva-fill="#1B324F"></i>
              <span className={`mx-1`}>Answer</span>
              <span className={`text-red-500`}>*</span>
            </label>
            <Editor editor={answerEditor} />
          </fieldset>

          <fieldset className={`my-2`}>
            <label className={`my-2 flex items-center font-semibold`}>
              <i data-eva="bulb-outline" data-eva-fill="#1B324F"></i>
              <span className={`mx-1`}>Hint</span>
            </label>
            <Editor editor={hintEditor} />
          </fieldset>

          <fieldset className={`my-2`}>
            <label className={`my-2 flex items-center font-semibold`}>
              <i data-eva="info-outline" data-eva-fill="#1B324F"></i>
              <span className={`mx-1`}>Explain</span>
            </label>
            <Editor editor={explainEditor} />
          </fieldset>

          <div className={`animate__animated animate__fadeIn animate__faster`}>
            <fieldset className={`mt-6 flex justify-center -mx-2`}>
              <div className={`mx-2`}>
                <Button
                  color="info"
                  icon="arrow-circle-right-outline"
                  type="submit"
                >
                  {questionID ? 'Update' : 'Create'}
                </Button>
              </div>
            </fieldset>

            <div className={`mt-4`}>
              <hr />
            </div>

            {/* <div className={`mt-4 flex justify-center`}>
            <Button icon="eye-outline" color="info-outline" type="button">
              Preview
            </Button>
          </div> */}

            {questionID ? (
              <div className={`mt-4 flex justify-center`}>
                <Button
                  color="danger-outline"
                  icon="trash-outline"
                  type="button"
                  onClick={() => setIsShowDelete(true)}
                >
                  Delete
                </Button>
              </div>
            ) : null}
          </div>
        </form>
      </main>

      <Modal isOpen={isShowDelete} closeModal={() => setIsShowDelete(false)}>
        <div className={`p-2`}>
          <div className={`text-2xl font-semibold`}>
            <h1>Are you sure? It can't revert.</h1>
          </div>

          <div>
            <img src="/dinoc.png" alt="" />
          </div>

          <div className={`flex`}>
            <div className="mr-2">
              <Button
                onClick={onDeleteQuestion}
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
