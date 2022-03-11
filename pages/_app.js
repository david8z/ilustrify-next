import "styles/globals.css"
import initAuth from "initAuth" // the module you created above
import { useRouter } from "next/router"
import AccountLayout from "components/AppLayout/AccountLayout"

initAuth()

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  return (
    <>
      {router.pathname.startsWith("/account") ? (
        <AccountLayout>
          <Component {...pageProps} />
        </AccountLayout>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  )
}

export default MyApp
