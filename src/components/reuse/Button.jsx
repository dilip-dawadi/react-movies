export const Button = ({
  label,
  onClick,
  type = "button",
  disable = false,
  className,
}) => {
  return (
    <button
      className={className}
      onClick={onClick}
      type={type}
      disabled={disable}
    >
      {label}
    </button>
  );
};
