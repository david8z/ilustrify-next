import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth"
import { useRouter } from "next/router"

const Demo = () => {
  const router = useRouter()
  const { style } = router.query
  return <div className="px-4">Página del estilo {style}</div>
}

// Note that this is a higher-order function.
export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})()

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  whenUnauthedBeforeInit: AuthAction.REDIRECT_TO_LOGIN,
})(Demo)
