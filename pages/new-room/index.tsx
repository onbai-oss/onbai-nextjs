import Button from '@/components/base/Button'
import Footer from '@/components/base/Footer'
import Input from '@/components/base/Input'
import { NavLoggedIn } from '@/components/NavLoggedIn'
import { API } from '@/utils/api'
import { API_PATH, PAGES, ROOM } from '@/utils/constant'
import { getPropsUserSever } from '@/utils/session'
import confetti from 'canvas-confetti'
import { pick } from 'lodash-es'
import { customAlphabet } from 'nanoid'
import { NextSeo } from 'next-seo'
import Router from 'next/router'
import toast from 'react-hot-toast'

export default function NewRoomPage({ user }) {
  const onSubmit = (e) => {
    e.preventDefault()
    const passValue = e.target?.password?.value
    const nameValue = e.target?.name.value
    const hash = passValue ? passValue : null

    const dataPost = {
      name: nameValue,
      password: hash,
      status: ROOM.STATUS.WAIT,
      game: {
        type: ROOM.TYPE.SOLO,
        rule: null,
      },
      collections: [],
      users: {
        [user?.id]: {
          role: 'host',
          score: 0,
          info: pick(user, 'image', 'email', 'name'),
        },
      },
      reaction: {},
    }
    API.post(API_PATH.ROOM, dataPost).then((r) => {
      toast.success('Room created!')
      confetti()
      Router.push(PAGES.ROOM + `/${r.data.id}`)
    })
  }

  return (
    <>
      <NextSeo
        title={'New room'}
        titleTemplate={`${
          process.env.NODE_ENV === 'development' ? '[DEV]' : ''
        } Onbai.online | %s`}
      />
      <NavLoggedIn />
      <main className={`min-h-screen mb-24 sm:mb-0`}>
        <div className={`mt-4 w-40 mx-auto`}>
          <img
            className={`w-full`}
            src="/rainbow.svg"
            draggable="false"
            alt="new room"
          />
        </div>
        <section
          className={`font-semibold flex flex-col justify-center items-center `}
        >
          <div className={`mt-2 text-2xl text-center`}>New Room</div>
        </section>

        <section>
          <form
            onSubmit={onSubmit}
            className={`px-4 w-full sm:w-96 mx-auto flex flex-col `}
          >
            <fieldset>
              <label
                htmlFor="name"
                className={`my-2 block font-semibold cursor-pointer`}
              >
                Name
              </label>
              <Input
                icon="edit-2-outline"
                type="text"
                name="name"
                id="name"
                required
                placeholder=""
                autoFocus
                autoComplete="off"
                defaultValue={'room-' + customAlphabet('123456', 6)()}
              ></Input>
            </fieldset>

            <fieldset className={`mt-6 flex justify-center`}>
              <Button
                color="info"
                icon="arrow-circle-right-outline"
                type="submit"
                className={`block w-full`}
              >
                Create
              </Button>
            </fieldset>
          </form>
        </section>
      </main>
      <Footer></Footer>
    </>
  )
}
export const getServerSideProps = getPropsUserSever
