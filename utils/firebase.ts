import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/auth'
import { app, NEXTJS_API } from './api'
import toast from 'react-hot-toast'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

if (typeof window !== 'undefined' && !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

const provider = new firebase.auth.GoogleAuthProvider()

firebase.auth().useDeviceLanguage()

export const onGoogleLogin = async () => {
  try {
    await firebase.auth().signInWithPopup(provider)
    if (!firebase.auth().currentUser) throw 'No User'
    toast.success('✨ Login success.')
    //@ts-ignore
    const idToken = await firebase.auth().currentUser.getIdToken(true)
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

export const firebaseLogout = () => firebase.auth().signOut()

export default firebase
