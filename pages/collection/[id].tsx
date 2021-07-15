import Button from '@/components/base/Button'
import CollectionIcon from '@/components/base/CollectionIcon'
import Input from '@/components/base/Input'
import { NavLoggedIn } from '@/components/NavLoggedIn'
import { PAGES } from '@/utils/constant'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function CollectionPage() {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <NavLoggedIn />
      <main>
        <div className={`my-6`}>
          <div className={`w-32 mx-auto text-center `}>
            <CollectionIcon />
          </div>
          <div className={`text-center mt-3 text-2xl font-semibold`}>
            Collection name
          </div>

          <div className={`mt-4`}>
            <div className={`flex justify-center my-2`}>
              <div className={`mr-2`}>
                <Link href={PAGES.EDIT_COLLECION + `/${id}`}>
                  <Button icon="plus-outline" color="primary"></Button>
                </Link>
              </div>
              <div className={`mr-2`}>
                <Link href={PAGES.EDIT_COLLECION + `/${id}`}>
                  <Button icon="edit-outline" color="primary"></Button>
                </Link>
              </div>
              <Button icon="trash-outline" color="warning"></Button>
            </div>
            <div className={`flex justify-center my-2`}></div>
          </div>
        </div>

        <div className={`my-6`}>
          <hr />
        </div>
        <div className={` px-4`}>
          <div className={`font-semibold`}>List question</div>
        </div>
      </main>
    </>
  )
}
