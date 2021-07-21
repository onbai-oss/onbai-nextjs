import Link from 'next/link'
import Button from '@/components/base/Button'
import CollectionIcon from '@/components/base/CollectionIcon'
import GetDataError from '@/components/base/GetDataError'
import CollectionLoader from '@/components/base/CollectionLoader'
import { NavLoggedIn } from '@/components/NavLoggedIn'
import { getData } from '@/utils/api'
import { PAGES } from '@/utils/constant'

export default function DashboardPage() {
  const { data: listCollection, error, isLoading } = getData('collection')

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

        {/* Loading */}
        {isLoading ? (
          <div className={`flex justify-center`}>
            <CollectionLoader uniqueKey={'collection-loader'} />
          </div>
        ) : null}

        {/* List Collection */}
        <div
          className={`px-4 grid grid-rows-1 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6  gap-4`}
        >
          {!isLoading && !error && listCollection?.data?.length
            ? listCollection.data.map((i, index) => (
                <div key={index}>
                  <Link href={PAGES.COLLECTION + '/123'}>
                    <button
                      className={`w-full text-center p-4 shadow hover:shadow-lg rounded-md `}
                    >
                      <CollectionIcon fill={i.color} icon={i.icon} />
                      <div className={`mt-2 font-semibold text-xl`}>
                        {i.title}
                      </div>
                    </button>
                  </Link>
                </div>
              ))
            : null}
        </div>

        {/* Not found */}
        {!isLoading && !error && !listCollection?.data?.length ? (
          <div className={`flex justify-center items-center `}>
            <div>
              <div>
                <img
                  width="175"
                  className={`mx-auto`}
                  src="/nodata_flower.png"
                  alt="no data"
                />
              </div>
              <div className={`mt-4 text-center font-semibold`}>
                No collection found.
              </div>
              <div className={`mt-4`}>
                <Link href={PAGES.NEW_COLLECION}>
                  <Button>Create new collection</Button>
                </Link>
              </div>
            </div>
          </div>
        ) : null}

        {!isLoading && error ? <GetDataError /> : null}
      </main>
    </>
  )
}
