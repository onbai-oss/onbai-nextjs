import { useState } from 'react'
import Button from '@/components/base/Button'
import Input from '@/components/base/Input'
import { NavLoggedIn } from '@/components/NavLoggedIn'
import bcrypt from 'bcryptjs'
import { API } from '@/utils/api'
import { API_PATH, PAGES } from '@/utils/constant'
import Router from 'next/router'
import toast from 'react-hot-toast'
import confetti from 'canvas-confetti'
import { getPropsUserSever } from '@/utils/session'

export default function NewRoomPage({ user }) {
  const onSubmit = (e) => {
    e.preventDefault()
    const passValue = e.target?.password.value
    const nameValue = e.target?.name.value
    const salt = bcrypt.genSaltSync(10)
    const hash = passValue ? bcrypt.hashSync(passValue, salt) : null

    console.log('submit', e, hash)
    const dataPost = {
      name: nameValue,
      password: hash,
    }
    API.post(API_PATH.ROOM, dataPost).then((r) => {
      console.log(r)
      toast.success('Room created!')
      confetti()
      Router.push(PAGES.ROOM + `/${r.data.id}`)
    })
  }

  return (
    <>
      <NavLoggedIn user={user} isHideNew />
      <main className={`mb-8`}>
        <div className={`mt-4 w-48 mx-auto`}>
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
          <div className={`my-4  text-2xl text-center`}>New Room</div>
        </section>

        <section>
          <form
            onSubmit={onSubmit}
            className={` px-4 w-full sm:w-96 mx-auto flex flex-col `}
          >
            <fieldset>
              <label htmlFor="name" className={`my-2 block font-semibold`}>
                Name:
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
              ></Input>
            </fieldset>

            <fieldset>
              <label htmlFor="password" className={`my-2 block font-semibold`}>
                Password:
              </label>
              <Input
                icon="lock-outline"
                type="text"
                name="password"
                id="password"
                placeholder=""
                autoComplete="off"
              ></Input>
            </fieldset>

            <fieldset className={`mt-4 flex justify-center`}>
              <Button
                color="info"
                icon="arrow-circle-right-outline"
                type="submit"
              >
                Create
              </Button>
            </fieldset>
          </form>
        </section>
      </main>
    </>
  )
}

export const getServerSideProps = getPropsUserSever
