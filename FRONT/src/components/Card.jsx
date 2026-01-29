export default function Card({
  icon,
  title,
  description,
  className,
  onClick,
  ariaLabel,
}) {
  const safeId = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  const titleId = `card-title-${safeId}`;
  const descId = `card-desc-${safeId}`;

  return (
    <button
      type="button"
      onClick={onClick}

      aria-labelledby={ariaLabel ? undefined : titleId}
      aria-describedby={ariaLabel ? undefined : descId}
      aria-label={ariaLabel}

      className={`
        w-120 h-64
        bg-white
        border-2 border-raspberry-700
        rounded-xl
        shadow-md
        flex flex-col items-center justify-center
        p-6
        cursor-pointer
        transition
        hover:shadow-lg

        focus:outline-none
        focus-visible:ring-4
        focus-visible:ring-raspberry-500
        focus-visible:ring-offset-2
        focus-visible:ring-offset-raspberry-50

        active:scale-[0.98]

        ${className || ""}
      `}
    >
      <div aria-hidden="true" className="mb-4 text-raspberry-700">
        {icon}
      </div>

      <h2
        id={titleId}
        className="text-xl font-semibold text-raspberry-900 mb-2 text-center"
      >
        {title}
      </h2>

      <p
        id={descId}
        className="text-base font-normal text-raspberry-700 text-center max-w-[400px]"
      >
        {description}
      </p>
    </button>
  );
}
