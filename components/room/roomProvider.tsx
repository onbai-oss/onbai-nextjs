import { createContext, useContext } from 'react'

interface roomData {}

const AppContext = createContext<any>({})

export function RoomWrapper({ children, value }) {
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function roomContext() {
  return useContext(AppContext)
}
