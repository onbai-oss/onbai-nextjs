import BookIcon from '@/components/base/BookIcon'
import Button from '@/components/base/Button'
import CollectionIcon from '@/components/base/CollectionIcon'
import Input from '@/components/base/Input'
import { NavLoggedIn } from '@/components/NavLoggedIn'
import { API } from '@/utils/api'
import { PAGES } from '@/utils/constant'
import Link from 'next/link'
import { useEffect } from 'react'
import { Twemoji } from 'react-emoji-render'

export default function DashboardPage() {
  useEffect(() => {
    API.get('collection').then((r) => {
      console.log(r)
    })
  }, [])
  return (
    <>
      <NavLoggedIn />
      <main className={`mb-8`}>
        <div
          className={`h-32 font-semibold flex flex-col justify-center items-center
          bg-gradient-to-r from-green-600 to-green-500
          `}
        >
          <div className={`my-4 text-white text-2xl`}>Wellcome you.</div>
        </div>
        <div className={`px-4 py-4 mb-4`}>
          <h1 className={`font-semibold text-xl`}>Your library</h1>
        </div>
        <div
          className={`px-4 grid grid-rows-1 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6  gap-4`}
        >
          {Array.from(new Array(10)).map((i, index) => (
            <div key={index}>
              <Link href={PAGES.COLLECTION + '/123'}>
                <button
                  className={`w-full text-center p-4 shadow hover:shadow-lg rounded-md `}
                >
                  <CollectionIcon />
                  <div className={`mt-2 font-semibold text-xl`}>Collection</div>
                </button>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}
