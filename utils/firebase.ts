import { getAnalytics } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  useDeviceLanguage,
} from 'firebase/auth'
import toast from 'react-hot-toast'
import { app, NEXTJS_API } from './api'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

export const firebaseApp = initializeApp(firebaseConfig)
export const firebaseAuth = getAuth(firebaseApp)

export const firebaseAnalytics = () => {
  if (process.browser) {
    return getAnalytics(firebaseApp)
  }
}

export const onGoogleLogin = async () => {
  try {
    useDeviceLanguage(firebaseAuth)
    const provider = new GoogleAuthProvider()
    await signInWithPopup(firebaseAuth, provider)
    if (!firebaseAuth.currentUser) throw 'No User'

    toast.success('✨ Login success.')
    const idToken = await firebaseAuth.currentUser.getIdToken(true)
    const { user } = await app.authenticate({
      strategy: 'firebase',
      access_token: idToken,
    })
    await NEXTJS_API.post('api/login', { user })
    location.pathname = '/'
  } catch (error) {
    toast.error('Login error.')
    console.error(error)
  }
}

export const firebaseLogout = () => firebaseAuth.signOut()
