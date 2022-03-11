import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth"
import firebase from "firebase/app"

const Account = () => {
  const AuthUser = useAuthUser()

  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .catch(() => {
        // TODO: User response in case of errors on signout
      })
  }

  return (
    <div>
      <p>Your email is {AuthUser.email ? AuthUser.email : "unknown"}.</p>
      <button
        onClick={handleSignOut}
        className="w-full rounded-md bg-black text-white"
      >
        SIGN OUT
      </button>
    </div>
  )
}

// Note that this is a higher-order function.
export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})()

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  whenUnauthedBeforeInit: AuthAction.REDIRECT_TO_LOGIN,
})(Account)
