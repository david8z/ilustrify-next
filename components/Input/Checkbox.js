const InputCheckbox = ({ label, inputProps = {}, ...props }) => {
  return (
    <div
      {...props}
      className={["flex cursor-pointer items-center", props.className]}
    >
      <div className="mt-1">
        <input
          type="checkbox"
          {...inputProps}
          className={[
            "block w-full rounded-md border-2 bg-white px-3 py-2 placeholder-gray-400",
            inputProps.className,
          ]}
        />
      </div>
      {label && (
        <label
          htmlFor="remember-me"
          className="ml-2 block cursor-pointer text-sm"
        >
          {label}
        </label>
      )}
    </div>
  )
}

export default InputCheckbox
