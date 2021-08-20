import { app, NEXTJS_API } from '@/utils/api'
import { FC, useEffect } from 'react'
import Script from 'next/script'
import toast from 'react-hot-toast'

// update type firebase
declare global {
  var firebase: any
  var firebaseui: any
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

interface FirebaseUiLoginProps {}
const FirebaseUiLogin: FC<FirebaseUiLoginProps> = ({}) => {
  const LANGUAGE_CODE = 'en'

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
      {global.firebase ? null : (
        <Script
          src="https://www.gstatic.com/firebasejs/8.9.1/firebase-app.js"
          strategy="beforeInteractive"
        />
      )}
      {global.firebase?.auth ? null : (
        <Script
          src="https://www.gstatic.com/firebasejs/8.9.1/firebase-auth.js"
          strategy="beforeInteractive"
        />
      )}

      {global.firebaseui ? null : (
        <Script
          src={`https://www.gstatic.com/firebasejs/ui/4.8.1/firebase-ui-auth__${LANGUAGE_CODE}.js`}
          onLoad={() => {
            if (!firebase.apps.length) {
              firebase.initializeApp(firebaseConfig)
            } else {
              firebase.app() // if already initialized, use that one
            }
            loadFirebaseui()
          }}
        />
      )}

      <div className={`animate__animated animate__fadeInUp`}>
        <div id="firebaseui-auth-container"></div>
      </div>
    </>
  )
}

export default FirebaseUiLogin
