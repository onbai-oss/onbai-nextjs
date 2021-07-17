import Button from '@/components/base/Button'
import CollectionIcon from '@/components/base/CollectionIcon'
import Input from '@/components/base/Input'
import { Modal } from '@/components/base/Modal'
import { NavLoggedIn } from '@/components/NavLoggedIn'
import { PAGES } from '@/utils/constant'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function CollectionPage() {
  const router = useRouter()
  const { id } = router.query

  const [isOpen, setIsOpen] = useState(false)
  const [bookColor, setBookColor] = useState('#0F9B6E')
  const [emoji, setEmoji] = useState('🍀')

  return (
    <>
      <NavLoggedIn />
      <main>
        <div className={`my-6`}>
          <div className={`w-32 mx-auto text-center `}>
            <CollectionIcon fill={bookColor} icon={emoji} />
          </div>
          <div className={`text-center mt-3 text-2xl font-semibold`}>
            Collection name
          </div>
          <div className={`text-center mt-1  font-semibold`}>Description</div>

          <div className={`mt-4`}>
            <div className={`flex justify-center my-2`}>
              <div className={`mr-2`}>
                <Link href={PAGES.EDIT_COLLECION + `/${id}`}>
                  <Button
                    title="Add new question"
                    icon="plus-outline"
                    color="primary"
                  ></Button>
                </Link>
              </div>
              <div className={`mr-2`}>
                <Link href={PAGES.EDIT_COLLECION + `/${id}`}>
                  <Button
                    title="Edit collecion"
                    icon="edit-outline"
                    color="primary"
                  ></Button>
                </Link>
              </div>
              <Button
                onClick={() => setIsOpen(true)}
                title="Delete collecion"
                icon="trash-outline"
                color="primary"
              ></Button>
            </div>
            <div className={`flex justify-center my-2`}></div>
          </div>
        </div>

        <div className={`my-4`}>
          <hr />
        </div>
        <div className={` px-4`}>
          <div className={`font-semibold`}>List question</div>
        </div>
      </main>

      <Modal isOpen={isOpen} closeModal={() => setIsOpen(false)}>
        <div className={`p-2`}>
          <div className={` text-2xl font-semibold`}>
            <h1>Are you sure, it can't revert.</h1>
          </div>

          <div>
            <img src="/dinoc.png" alt="" />
          </div>

          <div className={`flex`}>
            <div className="mr-2">
              <Button
                onClick={() => setIsOpen(false)}
                title="Delete collecion"
                icon="trash-outline"
                color="danger"
              >
                Yes, delete
              </Button>
            </div>
            <Button onClick={() => setIsOpen(false)} color="text-outline">
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
