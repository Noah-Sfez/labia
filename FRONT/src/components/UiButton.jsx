const bgColors = {
  raspberry: "bg-raspberry-700 hover:bg-raspberry-600",
  raspberryLight: "bg-raspberry-100 hover:bg-raspberry-200",
  white: "bg-white hover:bg-raspberry-50",
};

const textColors = {
  white: "text-white",
  black: "text-black",
  raspberry: "text-raspberry-700",
};

export default function UiButton({
  children,
  onClick,
  bg = "raspberry",
  text = "white",
  disabled = false,
  ariaLabel,
  className = "",
  type = "button",
}) {
  const hasText =
    typeof children === "string" ||
    (Array.isArray(children) && children.some(c => typeof c === "string"));

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...(!hasText && ariaLabel ? { "aria-label": ariaLabel } : {})}
      className={`
        px-4 py-2
        rounded-2xl
        font-medium
        transition
        shadow-md
        focus:outline-none
        focus:ring-2 focus:ring-offset-2 focus:ring-raspberry-400
        disabled:opacity-50 disabled:cursor-not-allowed
        ${bgColors[bg]}
        ${textColors[text]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}
