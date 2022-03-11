import InputCheckbox from "components/Input/Checkbox"
import InputText from "components/Input/Text"
import { useRef } from "react"

const SignIn = ({ handleSignIn }) => {
  const email = useRef()
  const password = useRef()
  const rememberMe = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    handleSignIn({
      email: email.current.value,
      password: password.current.value,
      rememberMe: rememberMe.current.value,
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

      <div className="flex items-center justify-between">
        <InputCheckbox
          label="Remeber Me"
          inputProps={{
            id: "remeber-me",
            ref: rememberMe,
          }}
        />

        <div className="text-sm">
          <a href="#" className="font-medium text-gray-600 hover:text-black">
            Forgot your password?
          </a>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="w-full rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white"
        >
          Sign in
        </button>
      </div>
    </form>
  )
}

export default SignIn
