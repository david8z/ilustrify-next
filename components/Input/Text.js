const InputText = ({ label, inputProps = {}, ...props }) => {
  return (
    <div {...props}>
      {label && (
        <label
          htmlFor={inputProps?.id}
          className={["block text-sm font-medium"]}
        >
          {label}
        </label>
      )}
      <div className="mt-1">
        <input
          {...inputProps}
          className={[
            "block w-full rounded-md border-2 bg-white px-3 py-2 placeholder-gray-400",
            inputProps.className,
          ]}
        />
      </div>
    </div>
  )
}

export default InputText
