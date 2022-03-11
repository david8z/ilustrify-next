import InputText from "components/Input/Text"
import { useRef } from "react"

const SignUp = ({ handleSignUp }) => {
  const email = useRef()
  const password = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    handleSignUp({
      email: email.current.value,
      password: password.current.value,
    })
  }
  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <InputText
        label="Email Address"
        inputProps={{
          type: "email",
          id: "email",
          autoComplete: "email",
          required: true,
          ref: email,
        }}
      />
      <InputText
        label="Password"
        inputProps={{
          type: "password",
          id: "password",
          autoComplete: "current-password",
          required: true,
          ref: password,
        }}
      />

      <div>
        <button
          type="submit"
          className="w-full rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white"
        >
          Sign Up
        </button>
      </div>
    </form>
  )
}

export default SignUp
