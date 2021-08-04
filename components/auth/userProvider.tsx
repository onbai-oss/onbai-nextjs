import { createContext, useContext } from 'react'

interface UserData {
  name?: string | any
  email?: string | any
  id?: string | any
  image?: string | any
}

const AppContext = createContext<UserData | null>(null)

export function UserWrapper({ children, value }) {
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function userContext() {
  return useContext(AppContext)
}
