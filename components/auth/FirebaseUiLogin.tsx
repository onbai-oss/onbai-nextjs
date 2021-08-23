import { onGoogleLogin } from '@/utils/firebase'
import Button from '../base/Button'

const FirebaseUiLogin = ({}) => {
  return (
    <>
      <div>
        <div className={`animate__animated animate__fadeInUp`}>
          <Button
            onClick={onGoogleLogin}
            className={`block w-full`}
            color="primary"
            icon="google"
          >
            Continue with Google
          </Button>
        </div>
      </div>
    </>
  )
}

export default FirebaseUiLogin
