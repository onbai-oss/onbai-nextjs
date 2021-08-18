import { app, NEXTJS_API } from '@/utils/api'
import { FC, useState, useEffect } from 'react'
import Head from 'next/head'
import Script from 'next/script'

// update type firebase
declare global {
  var firebase: any
  var firebaseui: any
}

interface FirebaseUiLoginProps {}
const firebaseConfig = {
  apiKey: 'AIzaSyClucD3IK2eoyEh-qB7x1uH7FAJmfFQWBU',
  authDomain: 'onbai-online.firebaseapp.com',
  projectId: 'onbai-online',
  appId: '1:332060894285:web:e101767487a9b50f066804',
}
const FirebaseUiLogin: FC<FirebaseUiLoginProps> = ({}) => {
  const [isShow, setIsShow] = useState(false)
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
            .then(async function (idToken: string) {
              console.log('idToken', idToken)
              const authen = await app.authenticate({
                strategy: 'firebase',
                access_token: idToken,
              })
              await NEXTJS_API.post('api/login', {
                user: authen.user,
              })
              location.pathname = '/'
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
    console.log('isShow', isShow)

    if (window.firebaseui) {
      loadFirebaseui()
    }
  }, [])
  const LANGUAGE_CODE = 'vi'
  return (
    <>
      <Script
        src="https://www.gstatic.com/firebasejs/8.9.1/firebase-app.js"
        strategy="beforeInteractive"
      />
      <Script
        src="https://www.gstatic.com/firebasejs/8.9.1/firebase-auth.js"
        strategy="beforeInteractive"
      />
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
      <div className={`animate__animated animate__fadeInUp`}>
        <div id="firebaseui-auth-container"></div>
      </div>
    </>
  )
}

export default FirebaseUiLogin
