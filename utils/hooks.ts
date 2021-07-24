import { useState, useEffect } from 'react'

export function useUserLocal() {
  interface userLocalData {
    email?: string
    id?: string
    avatar?: string
    name?: string
  }
  const [userLocal, setUserLocal] = useState<userLocalData>({})

  // ...
  useEffect(() => {
    try {
      const localData = JSON.parse(localStorage.getItem('user') || '{}')
      setUserLocal(localData)
    } catch (error) {
      console.error('Cant get user data', error)
    }
  }, [])
  return userLocal
}
