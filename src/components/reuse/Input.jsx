export const Input = ({
  placeholder,
  className,
  type = "text",
  name,
  value,
  onChange,
  required = false,
  disabled = false,
  autoFocus = false,
}) => {
  const isTextarea = type === "textarea";

  return isTextarea ? (
    <textarea
      placeholder={placeholder}
      rows={2}
      className={` w-full p-3 border border-[#cc] ${className}`}
    />
  ) : (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      disabled={disabled}
      autoFocus={autoFocus}
      className={` w-full p-3 border rounded-sm border-[#ccc] mb-2 ${className}`}
    />
  );
};
