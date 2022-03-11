import SignIn from "components/Form/SignIn"
import Logo from "components/Logo"
import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth"
import firebase from "firebase/app"
import Link from "next/link"

// import {
//   getAuth,
//   signInWithEmailAndPassword,
//   setPersistence,
//   browserSessionPersistence,
// } from "firebase/auth"

const Signin = () => {
  const handleSignIn = ({ email, password, rememberMe }) => {
    // TODO:IMPROVE ERROR HANDLING
    try {
      if (!rememberMe) {
        firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.SESSION)
          .then(() =>
            firebase.auth().signInWithEmailAndPassword(email, password)
          )
      } else {
        firebase.auth().signInWithEmailAndPassword(email, password)
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <div className="rounded-0 flex min-h-full min-w-full flex-col items-center justify-center py-12 px-0 sm:px-6 lg:px-8">
        <Link href="/">
          <a className="drop-shadow-lg">
            <Logo height={80} width={80} />
          </a>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold ">
          Welcome Back
        </h2>

        <div className="mt-2 w-full border-y-2 border-black bg-white p-8 drop-shadow-lg sm:max-w-md sm:rounded-md sm:border-x-2 ">
          <SignIn handleSignIn={handleSignIn} />
        </div>
        <div className="flex w-full justify-end text-gray-300 underline hover:text-black sm:max-w-md">
          <Link href="/signup">
            <a className="p-2">Sign Up</a>
          </Link>
        </div>
      </div>
    </>
  )
}

// Note that this is a higher-order function.
export const getServerSideProps = withAuthUserTokenSSR({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})()

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})(Signin)
