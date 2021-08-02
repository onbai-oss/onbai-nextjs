import React, { ReactElement, useState } from 'react'
import Button from '../base/Button'
import Input from '../base/Input'

interface Props {}

export default function RoomCreateConfig({}: Props): ReactElement {
  const [collection, setCollection] = useState<any>([])
  const [mode, setMode] = useState<any>(0)
  const [rule, setRule] = useState<any>()
  const [time, setTime] = useState<any>(1)
  const [score, setScore] = useState<any>(10)

  return (
    <div className={`w-full sm:w-96 mx-auto px-2 font-semibold`}>
      <div className={`border shadow rounded-md p-2 my-2`}>
        <div className={`text-center mb-2`}>Collection</div>

        <div className={`flex justify-center`}>
          <Button icon="external-link-outline" color="primary">
            Select
          </Button>
        </div>
        <div className="mt-2 flex justify-center">
          <div className={`whitespace-nowrap overflow-auto`}>
            <div className={`inline-block mx-1 bg-gray-200 px-2 rounded-md`}>
              Collection 1
            </div>
          </div>
        </div>
      </div>

      <div className={`border shadow rounded-md p-2 my-2`}>
        <div className={`text-center mb-1`}>Mode</div>
        <div className={`flex justify-center space-x-2`}>
          <label htmlFor="score">
            <input
              type="radio"
              name="mode"
              id="score"
              value={0}
              onChange={(e) => setMode(+e.target.value)}
              checked={mode == 0}
            />{' '}
            Score
          </label>
          <label htmlFor="time">
            <input
              type="radio"
              name="mode"
              id="time"
              value={1}
              onChange={(e) => setMode(+e.target.value)}
              checked={mode == 1}
            />{' '}
            Time
          </label>
          <label htmlFor="all">
            <input
              type="radio"
              name="mode"
              id="all"
              value={2}
              onChange={(e) => setMode(+e.target.value)}
              checked={mode == 2}
            />{' '}
            All
          </label>
        </div>
        <div className={`grid grid-cols-1 grid-rows-1 gap-2 mt-1`}>
          {[0, 2].includes(mode) ? (
            <div className={``}>
              <label className={``} htmlFor="score-win">
                <div className={`mb-1`}>Score goal:</div>
                <Input defaultValue="10" min="1" type="number" id="score-win" />
              </label>
            </div>
          ) : null}
          {mode === 2 ? <div>or</div> : null}
          {[1, 2].includes(mode) ? (
            <div className={``}>
              <label htmlFor="score-win">
                <div className={`mb-1`}>Timer (minute):</div>
                <Input defaultValue="10" min="1" type="number" id="score-win" />
              </label>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
