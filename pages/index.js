import Link from "next/link"

export default function Home() {
  return (
    <div>
      Hello world!
      <br></br>
      <Link href="/account">
        <a>Acceder a la cuenta</a>
      </Link>
    </div>
  )
}
