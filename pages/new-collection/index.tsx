import Button from '@/components/base/Button'
import Footer from '@/components/base/Footer'
import Input from '@/components/base/Input'
import { NavLoggedIn } from '@/components/NavLoggedIn'
import PleaseLogin from '@/components/PleaseLogin'
import { API } from '@/utils/api'
import { PAGES } from '@/utils/constant'
import { getPropsUserSever } from '@/utils/session'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function NewCollectionPage({ user }) {
  const router = useRouter()
  const { id } = router.query
  const isEdit = Boolean(id)

  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    console.log('submit', e)
    const data = {
      title,
      desc,
    }

    API[isEdit ? 'patch' : 'post'](
      'collection' + (isEdit ? `/${id}` : ''),
      data
    ).then((res) => {
      console.log(res)
      toast.success(isEdit ? 'Updated!' : 'Collection created!')
      router.push(PAGES.DASHBOARD).then(() => {})
    })
  }

  useEffect(() => {
    if (isEdit) {
      // TODO get data collection
      API.get('collection/' + id).then((res) => {
        const { title, desc } = res.data
        setTitle(title)
        setDesc(desc)
      })
    }
  }, [isEdit])

  if (!user) {
    return <PleaseLogin />
  }

  return (
    <>
      <NextSeo
        title={isEdit ? 'Edit collection ' + title : 'New collection'}
        titleTemplate={`${
          process.env.NODE_ENV === 'development' ? '[DEV]' : ''
        } Onbai.online | %s`}
      />

      <NavLoggedIn />
      <main className={`my-4 min-h-screen`}>
        <div
          className={`
            font-semibold flex flex-col justify-center items-center
          `}
        >
          <div className={`mt-2 w-40 mx-auto`}>
            <img
              className={`w-full`}
              src="/nature.svg"
              draggable="false"
              alt="new room"
            />
          </div>

          <div className={`mt-2 text-2xl`}>
            {isEdit ? 'Edit' : 'New'} collection{' '}
          </div>
        </div>

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
              placeholder=""
              required
              autoFocus
              autoComplete="off"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </fieldset>
          <fieldset className={`mt-6 grid grid-cols-1 grid-rows-1`}>
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

      <Footer />
    </>
  )
}

export const getServerSideProps = getPropsUserSever
