import BookIcon from '@/components/base/BookIcon'
import Button from '@/components/base/Button'
import Input from '@/components/base/Input'
import { NavLoggedIn } from '@/components/NavLoggedIn'
import { FormEventHandler, useRef, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Modal } from '@/components/base/Modal'
import { Picker } from 'emoji-mart'
import { Twemoji } from 'react-emoji-render'

import 'emoji-mart/css/emoji-mart.css'
import Textarea from '@/components/base/Textarea'
// const Picker: any = dynamic(
//   import('emoji-mart').then(({ Picker }) => Picker),
//   {
//     ssr: true,
//   }
// )

export default function NewCollectionPage() {
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    console.log('submit', e)
  }
  const [bookColor, setBookColor] = useState('#0F9B6E')
  const [emoji, setEmoji] = useState('')
  const [openModalEmoji, setOpenModalEmoji] = useState(false)

  const colorInput = useRef<any>(null)

  const onSelectEmoji = (e) => {
    console.log(e)
    setEmoji(e.native)
    setOpenModalEmoji(false)
  }

  const onColorPick = (e) => {}

  useEffect(() => {
    setEmoji('🍀')
  }, [])

  return (
    <>
      <NavLoggedIn isHideNew />

      <main className={`mb-12`}>
        <div
          className={`font-semibold flex flex-col justify-center items-center 

          `}
        >
          {/* bg-gradient-to-r from-green-600 to-green-500 */}
          <div className={`my-4 text-2xl`}>New collection</div>
        </div>

        <form
          onSubmit={onSubmit}
          className={`p-4 w-full sm:w-96 mx-auto flex flex-col `}
        >
          <fieldset>
            <label htmlFor="name" className={`my-2 block font-semibold`}>
              Title:
            </label>
            <Input
              icon="edit-2-outline"
              type="text"
              name="name"
              id="name"
              placeholder=""
              required
              autoFocus
              autoComplete="off"
            ></Input>
          </fieldset>

          <fieldset>
            <label htmlFor="desc" className={`my-2 block font-semibold`}>
              Description:
            </label>
            <Textarea
              rows={4}
              name="desc"
              id="desc"
              placeholder=""
              autoComplete="off"
            />
          </fieldset>

          <fieldset className={`flex my-4 `}>
            <div className={`flex-1`}>
              <div
                className={`w-full text-center border-2 border-gray-600 rounded-md p-2`}
              >
                <div className={`relative`}>
                  <BookIcon fill={bookColor} />
                  <div
                    className={`
                    absolute bottom-1/2 right-1/2 transform translate-y-1/2 translate-x-1/2
                     w-12 h-12 bg-white rounded-md flex justify-center items-center mb-4 cursor-pointer
                    `}
                  >
                    <div
                      onClick={() => setOpenModalEmoji(true)}
                      style={{
                        fontSize: 32,
                      }}
                      className={` rounded  font-semibold`}
                      title="Click to change icon"
                    >
                      <Twemoji text={emoji} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`flex-1 pl-4`}>
              <div className={`grid grid-rows-1 grid-cols-1 gap-4`}>
                <Button
                  onClick={onColorPick}
                  type="button"
                  color="text-outline"
                >
                  Color
                  <input
                    ref={colorInput}
                    className={`ml-2 cursor-pointer`}
                    type="color"
                    id="color"
                    defaultValue="#0F9B6E"
                    onChange={(e) => setBookColor(e.target.value)}
                    title="Click to change color"
                  />
                </Button>
                <Button
                  type="button"
                  className={`text-blue-500 cursor-pointer hover:underline`}
                  color="text-outline"
                  onClick={() => setOpenModalEmoji(true)}
                  title="Click to change icon"
                >
                  <span className={`mr-3`}>Icon</span> <Twemoji text={emoji} />
                </Button>
              </div>
            </div>
          </fieldset>

          <fieldset className={`mt-2 grid grid-cols-1 grid-rows-1`}>
            <Button
              color="info"
              type="submit"
              icon="arrow-circle-right-outline"
            >
              Create
            </Button>
          </fieldset>
        </form>
      </main>

      <Modal
        isOpen={openModalEmoji}
        closeModal={() => setOpenModalEmoji(false)}
      >
        <div>
          <div className={`text-center mt-2 mb-4 font-semibold text-xl`}>
            Select icon
          </div>
          <Picker
            set="twitter"
            title="Select icon"
            showPreview={false}
            showSkinTones={false}
            emojiTooltip
            onSelect={onSelectEmoji}
            style={{ width: '100%' }}
            exclude={['recent']}
          />
        </div>
      </Modal>
    </>
  )
}
