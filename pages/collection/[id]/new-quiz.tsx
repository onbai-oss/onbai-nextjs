import Button from '@/components/base/Button'
import Editor from '@/components/Editor'
import { NavLoggedIn } from '@/components/NavLoggedIn'
import { useEditor, EditorContent } from '@tiptap/react'
import { FormEventHandler } from 'react'
import { useRouter } from 'next/router'

export default function NewQuiz() {
  const router = useRouter()
  const { number_create, mode } = router.query

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    console.log('submit', e)
    // TODO: call api
  }

  return (
    <>
      <NavLoggedIn isHideNew />

      <main className={`mb-8 `}>
        <div
          className={`h-32 font-semibold flex flex-col justify-center items-center bg-gradient-to-r from-green-600 to-green-500`}
        >
          <div className={`my-4 text-white text-2xl text-center`}>
            {mode === 'editSingle' ? <div>Edit quiz</div> : null}

            {!mode ? <div>New quiz 0/{number_create}</div> : null}
          </div>
        </div>

        <form onSubmit={onSubmit} className={`p-4 container mx-auto`}>
          <fieldset className={`my-2`}>
            <label className={`my-2 flex items-center font-semibold`}>
              <i data-eva="question-mark-outline" data-eva-fill="#1B324F"></i>
              <span className={`mx-1`}>Question</span>
              <span className={`text-red-500`}>*</span>
            </label>
            <Editor />
          </fieldset>

          <fieldset className={`my-2`}>
            <label className={`my-2 flex items-center font-semibold`}>
              <i data-eva="edit-outline" data-eva-fill="#1B324F"></i>
              <span className={`mx-1`}>Answer</span>
              <span className={`text-red-500`}>*</span>
            </label>
            <Editor />
          </fieldset>

          <fieldset className={`my-2`}>
            <label className={`my-2 flex items-center font-semibold`}>
              <i data-eva="bulb-outline" data-eva-fill="#1B324F"></i>
              <span className={`mx-1`}>Hint</span>
            </label>
            <Editor />
          </fieldset>

          <fieldset className={`my-2`}>
            <label className={`my-2 flex items-center font-semibold`}>
              <i data-eva="info-outline" data-eva-fill="#1B324F"></i>
              <span className={`mx-1`}>Explain</span>
            </label>
            <Editor />
          </fieldset>

          <div className={`animate__animated animate__fadeIn animate__faster`}>
            <fieldset className={`mt-6 flex justify-center -mx-2`}>
              <div className={`mx-2`}>
                <Button
                  color="info"
                  icon="arrow-circle-right-outline"
                  type="submit"
                >
                  {mode ? 'Update' : 'Create'}
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

            {mode ? (
              <div className={`mt-4 flex justify-center`}>
                <Button
                  color="danger-outline"
                  icon="trash-outline"
                  type="submit"
                >
                  Delete
                </Button>
              </div>
            ) : null}
          </div>
        </form>
      </main>
    </>
  )
}
