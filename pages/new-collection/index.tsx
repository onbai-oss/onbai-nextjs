import BookIcon from '@/components/base/BookIcon'
import Button from '@/components/base/Button'
import Input from '@/components/base/Input'
import Textarea from '@/components/base/Textarea'
import { useRouter } from 'next/router'
import { NavLoggedIn } from '@/components/NavLoggedIn'
import { FormEventHandler, useRef, useState, useEffect } from 'react'
import { Modal } from '@/components/base/Modal'
import { Picker } from 'emoji-mart'
import { Twemoji } from 'react-emoji-render'
import toast from 'react-hot-toast'

import 'emoji-mart/css/emoji-mart.css'
import CollectionIcon from '@/components/base/CollectionIcon'
import { API, getData } from '@/utils/api'
import { PAGES } from '@/utils/constant'

export default function NewCollectionPage() {
  const router = useRouter()
  const { id } = router.query
  const isEdit = Boolean(id)

  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')

  const [bookColor, setBookColor] = useState('#0F9B6E')
  const [emoji, setEmoji] = useState('')
  const [openModalEmoji, setOpenModalEmoji] = useState(false)

  const colorInput = useRef<any>(null)

  const onSelectEmoji = (e) => {
    console.log(e)
    setEmoji(e.native)
    setOpenModalEmoji(false)
  }

  const onResetStyle = () => {
    setEmoji('🍀')
    setBookColor('#0F9B6E')
  }

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    console.log('submit', e)
    // TODO: call api
    const data = {
      title,
      desc,
      icon: emoji,
      color: bookColor,
    }

    API[isEdit ? 'patch' : 'post'](
      'collection' + (isEdit ? `/${id}` : ''),
      data
    ).then((res) => {
      console.log(res)
      toast.success(isEdit ? 'Updated!' : 'Collection created!')
      router.push(PAGES.DASHBOARD)
    })
  }

  const onColorPick = (e) => {}

  useEffect(() => {
    if (isEdit) {
      // TODO get data collection
      API.get('collection/' + id).then((res) => {
        const { title, desc, color, icon } = res.data
        setTitle(title)
        setDesc(desc)
        setBookColor(color)
        setEmoji(icon)
      })
    } else {
      setEmoji('🍀')
    }
  }, [isEdit])

  return (
    <>
      <NavLoggedIn isHideNew />

      <main className={`mt-4 mb-12`}>
        <div
          className={`
            font-semibold flex flex-col justify-center items-center 
          `}
        >
          {/* bg-gradient-to-r from-green-600 to-green-500 */}
          <div className={`my-4 text-2xl`}>
            {isEdit ? 'Edit' : 'New'} collection{' '}
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className={`px-4 w-full sm:w-96 mx-auto flex flex-col `}
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </fieldset>

          <fieldset className={`flex my-4 `}>
            <div className={`flex-1`}>
              <div
                className={`w-full text-center border-2 border-gray-600 rounded-md p-2`}
              >
                <CollectionIcon fill={bookColor} icon={emoji} />
              </div>
            </div>

            <div className={`flex-1 pl-4`}>
              <div className={`grid grid-rows-1 grid-cols-1 gap-3`}>
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
                    value={bookColor}
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
                <Button
                  onClick={onResetStyle}
                  type="button"
                  color="text-outline"
                >
                  Reset
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
              {isEdit ? 'Update' : 'Create'}
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
