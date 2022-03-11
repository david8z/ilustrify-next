import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth"
import Link from "next/link"
import { useEffect, useState } from "react"
import { listenUserStyles, addStyle } from "services/firebase"

const Demo = () => {
  const [styles, setStyles] = useState([])
  const authUser = useAuthUser()
  useEffect(() => {
    let unsubscribe
    if (authUser) {
      unsubscribe = listenUserStyles({ setStyles, authUser })
    }
    return () => unsubscribe && unsubscribe()
  }, [])

  const handelAddStyle = () => {
    addStyle({ styles })
  }
  return (
    <div className="px-4">
      <div className="flex flex-col space-y-2">
        {styles.map(({ name, slug }) => (
          <Link href={`/account/custom-illustrations/${slug}`} key={slug}>
            <a>
              <div className="w-full rounded-md border-2 border-black">
                {name}
              </div>
            </a>
          </Link>
        ))}
      </div>
      <button
        onClick={handelAddStyle}
        className="mt-4 w-full rounded-md bg-black py-3 text-white"
      >
        ADD STYLE
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
})(Demo)
