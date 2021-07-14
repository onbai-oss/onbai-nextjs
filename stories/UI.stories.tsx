import React from 'react'
import Button from '@/components/base/Button'
import Input from '@/components/base/Input'
import 'styles/globals.css'
import Textarea from '@/components/base/Textarea'
export default {
  title: 'UI',
}

export const UI = () => {
  return (
    <div className={`p-2`}>
      <div className={`mb-4`}>
        <h1 className={`text-xl font-bold text-center`}>Button</h1>
      </div>
      <section className={`grid grid-cols-2 gap-2 my-3 text-center`}>
        <div>
          <Button color="primary">Primary</Button>
        </div>
        <div>
          <Button color="primary-outline">Outline</Button>
        </div>
        <div>
          <Button color="danger">Danger</Button>
        </div>
        <div>
          <Button color="danger-outline">Danger</Button>
        </div>
        <div>
          <Button color="warning">Warning</Button>
        </div>
        <div>
          <Button color="warning-outline">Warning</Button>
        </div>
        <div>
          <Button color="info">Info</Button>
        </div>
        <div>
          <Button color="info-outline">Info</Button>
        </div>
      </section>

      <section className={`grid grid-cols-2 gap-2 my-3 text-center`}>
        <div>
          <Button icon="question-mark-circle-outline">Primary Icon</Button>
        </div>
        <div>
          <Button icon="question-mark-circle-outline" color="primary-outline">
            Outline icon
          </Button>
        </div>
        <div>
          <Button icon="question-mark-circle-outline" color="danger">
            Danger icon
          </Button>
        </div>
        <div>
          <Button icon="question-mark-circle-outline" color="danger-outline">
            Danger icon
          </Button>
        </div>
        <div>
          <Button icon="question-mark-circle-outline" color="warning">
            Warning icon
          </Button>
        </div>
        <div>
          <Button icon="question-mark-circle-outline" color="warning-outline">
            Warning icon
          </Button>
        </div>
        <div>
          <Button icon="question-mark-circle-outline" color="info">
            Info icon
          </Button>
        </div>
        <div>
          <Button icon="question-mark-circle-outline" color="info-outline">
            Info icon
          </Button>
        </div>

        <div>
          <Button color="info" disabled>
            Disabled
          </Button>
        </div>
        <div>
          <Button icon="question-mark-circle-outline" color="info" disabled>
            Disabled
          </Button>
        </div>
      </section>

      <hr className={`my-4`} />
      <div className={`my-3`}>
        <h1 className={`text-xl font-bold text-center`}>Form</h1>
      </div>
      <section className={` my-3 `}>
        <form
          action=""
          onSubmit={(e) => e.preventDefault()}
          className={`grid grid-cols-1 grid-rows-1 gap-2`}
        >
          <fieldset>
            <label htmlFor="text" className={`my-2 block font-semibold`}>
              Text
            </label>
            <Input
              icon="lock-outline"
              type="text"
              name="text"
              id="text"
              placeholder="Input something ..."
              required
            ></Input>
          </fieldset>

          <fieldset>
            <label htmlFor="search" className={`my-2 block font-semibold`}>
              Search
            </label>
            <Input
              icon="search-outline"
              type="search"
              name="search"
              id="search"
              placeholder="Search something ..."
              required
            ></Input>
          </fieldset>

          <fieldset>
            <label htmlFor="textarea" className={`my-2 block font-semibold`}>
              Textarea
            </label>
            <Textarea id="textarea" name="textarea" />
          </fieldset>

          <fieldset>
            <label className={`my-2 block font-semibold`}>Disabled</label>
            <Input placeholder="Input something ..." required disabled></Input>
          </fieldset>

          <fieldset className={`mt-2`}>
            <Button icon="arrow-circle-right-outline" type="submit">
              Submit
            </Button>
          </fieldset>
        </form>
      </section>
    </div>
  )
}
