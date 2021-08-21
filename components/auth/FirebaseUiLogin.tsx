import { app, NEXTJS_API } from '@/utils/api'
import { FC, useEffect } from 'react'
import Script from 'next/script'
import toast from 'react-hot-toast'

// update type firebase
declare global {
  var firebase: any
  var firebaseui: any
}

interface FirebaseUiLoginProps {}
const FirebaseUiLogin: FC<FirebaseUiLoginProps> = ({}) => {
  const loadFirebaseui = () => {
    const config = {
      signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
      tosUrl: '/term',
      signInFlow: 'popup',
      privacyPolicyUrl: () => window.location.assign('/term'),
      credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
      callbacks: {
        signInSuccessWithAuthResult: () => {
          firebase
            .auth()
            .currentUser.getIdToken(true)
            .then(async (idToken: string) => {
              try {
                const authen = await app.authenticate({
                  strategy: 'firebase',
                  access_token: idToken,
                })
                await NEXTJS_API.post('api/login', {
                  user: authen.user,
                })
                toast.success('Login successful!')
                location.pathname = '/'
              } catch (error) {
                console.error(error)
                toast.error('Login has trouble!')
              }
            })
          return false
        },
      },
    }

    const ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(firebase.auth())

    ui.start('#firebaseui-auth-container', config)
    ui.disableAutoSignIn()
  }

  useEffect(() => {
    if (window.firebaseui) {
      loadFirebaseui()
    }
  }, [])
  return (
    <>
      <div className={`animate__animated animate__fadeInUp`}>
        <div id="firebaseui-auth-container"></div>
      </div>
    </>
  )
}

export default FirebaseUiLogin
