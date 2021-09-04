import Button from '@/components/base/Button'
import Footer from '@/components/base/Footer'
import { Modal } from '@/components/base/Modal'
import OnbaiEditor from '@/components/Editor'
import { NavLoggedIn } from '@/components/NavLoggedIn'
import { API } from '@/utils/api'
import { PAGES } from '@/utils/constant'
import { getPropsUserSever } from '@/utils/session'
import CharacterCount from '@tiptap/extension-character-count'
import { Color } from '@tiptap/extension-color'
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import confetti from 'canvas-confetti'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { FormEventHandler, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function NewQuiz({ user }) {
  const router = useRouter()
  const { numberCreate, current, questionID, id: collectionId } = router.query
  const [isShowDelete, setIsShowDelete] = useState(false)

  const defaultEditor = {
    extensions: [
      StarterKit,
      CharacterCount,
      TextStyle,
      Color,
      Image,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    editorProps: {
      attributes: {
        spellcheck: 'false',
        class:
          'onbai-editor prose w-full max-w-full px-4 pt-2 pb-4 border-2 border-solid border-gray-300 focus:outline-none rounded-b-md',
      },
    },
    content: ``,
    editable: true,
  }
  const questionEditor: any = useEditor(defaultEditor)
  const answerEditor: any = useEditor(defaultEditor)
  const hintEditor: any = useEditor(defaultEditor)
  const explainEditor: any = useEditor(defaultEditor)

  useEffect(() => {
    try {
      if (questionID) {
        API.get(PAGES.QUESTION + `/${questionID}`).then((res) => {
          const { answer, hint, explain, question } = res.data

          questionEditor?.commands.setContent(question)
          answerEditor?.commands.setContent(answer)
          hintEditor?.commands.setContent(hint)
          explainEditor?.commands.setContent(explain)
        })
      }
    } catch (error) {
      console.error(error)
    }
  }, [questionID, questionEditor, answerEditor, hintEditor, explainEditor])

  const resetEditor = () => {
    questionEditor?.commands.setContent(``)
    answerEditor?.commands.setContent(``)
    hintEditor?.commands.setContent(``)
    explainEditor?.commands.setContent(``)
    questionEditor?.commands.focus()
  }

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    console.log('Submit', e)
    const dataAPI = {
      question: questionEditor?.getHTML(),
      answer: answerEditor?.getHTML(),
      hint: hintEditor?.getHTML(),
      explain: explainEditor?.getHTML(),
      collectionId,
    }

    API[questionID ? 'patch' : 'post'](
      PAGES.QUESTION + (questionID ? `/${questionID}` : ''),
      dataAPI
    ).then((res) => {
      if (questionID) {
        toast.success('Updated!')
        router.back()
      } else {
        if (Number(current) + 1 === Number(numberCreate)) {
          toast.success(`Congrat!, you've created ${numberCreate} question.`)
          confetti()
          router.push(`/collection/${collectionId}`)
        } else {
          toast.success('Created!')
          resetEditor()
          router.replace({
            pathname: `/collection/${collectionId}${PAGES.NEW_QUESTION}`,
            query: {
              numberCreate: numberCreate,
              current: Number(current) + 1,
            },
          })
        }
      }
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
      <NextSeo
        title={'New question'}
        titleTemplate={`${
          process.env.NODE_ENV === 'development' ? '[DEV]' : ''
        } Onbai.online | %s`}
      />
      <NavLoggedIn />
      <main className={`min-h-screen`}>
        <div className={`bg-green-500 p-4 text-white text-center`}>
          <div className={`  font-semibold text-2xl `}>
            {questionID ? (
              <div>Edit question </div>
            ) : (
              <div>
                New question {Number(current) + 1}/{numberCreate}
              </div>
            )}
          </div>
        </div>

        <form onSubmit={onSubmit} className={`px-4 max-w-2xl mx-auto`}>
          <div className={``}>
            <fieldset className={`my-2`}>
              <label className={`my-2 flex items-center font-semibold`}>
                <i data-eva="question-mark-outline" data-eva-fill="#1B324F"></i>
                <span className={`mx-1`}>Question</span>
                <span className={`text-red-500`}>*</span>
              </label>
              <OnbaiEditor editor={questionEditor} />
            </fieldset>

            <fieldset className={`my-2`}>
              <label className={`my-2 flex items-center font-semibold`}>
                <i data-eva="edit-outline" data-eva-fill="#1B324F"></i>
                <span className={`mx-1`}>Answer</span>
                <span className={`text-red-500`}>*</span>
              </label>
              <OnbaiEditor editor={answerEditor} />
            </fieldset>

            <fieldset className={`my-2 hidden`}>
              <label className={`my-2 flex items-center font-semibold`}>
                <i data-eva="bulb-outline" data-eva-fill="#1B324F"></i>
                <span className={`mx-1`}>Hint</span>
              </label>
              <OnbaiEditor editor={hintEditor} />
            </fieldset>

            <fieldset className={`my-2 hidden`}>
              <label className={`my-2 flex items-center font-semibold`}>
                <i data-eva="info-outline" data-eva-fill="#1B324F"></i>
                <span className={`mx-1`}>Explain</span>
              </label>
              <OnbaiEditor editor={explainEditor} />
            </fieldset>
          </div>

          <div>
            <div
              className={`animate__animated animate__fadeIn animate__faster`}
            >
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

              {/* <div className={`mt-4 flex justify-center`}>
            <Button icon="eye-outline" color="info-outline" type="button">
              Preview
            </Button>
          </div> */}

              {questionID ? (
                <div className={`mb-10`}>
                  <div className={`border-t-2 border-dashed my-4`}></div>
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
                </div>
              ) : null}
            </div>
          </div>

          <div></div>
        </form>
      </main>

      <Modal isOpen={isShowDelete} closeModal={() => setIsShowDelete(false)}>
        <div className={`p-2`}>
          <div className={`text-2xl font-semibold`}>
            <h1>Are you sure? It can't revert.</h1>
          </div>
          <div className={`w-64 mx-auto`}>
            <img className={`w-full`} src="/dinoc.png" alt="" />
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

      <Footer></Footer>
    </>
  )
}

export const getServerSideProps = getPropsUserSever
