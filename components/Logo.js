export default function Logo({ variant = "color", title = "Blessed Hearts Homecare" }) {
  const fill = variant === "white" ? "#ffffff" : "url(#bhh-gradient)";
  return (
    <svg
      viewBox="0 0 420 60"
      role="img"
      aria-label={title}
      style={{ height: "2.5rem", width: "auto" }}
    >
      <defs>
        <linearGradient id="bhh-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF2D7A" />
          <stop offset="50%" stopColor="#FF5A3C" />
          <stop offset="100%" stopColor="#FF7A1A" />
        </linearGradient>
      </defs>
      <path
        d="M28 14c5-6 15-6 19 1 4 8-3 15-19 27C12 30 5 23 9 15c4-7 14-7 19-1z"
        fill={variant === "white" ? "#ffffff" : "#FF2D7A"}
      />
      <text
        x="52"
        y="40"
        fontFamily="Poppins, Arial, sans-serif"
        fontWeight="700"
        fontSize="26"
        fill={fill}
      >
        Blessed Hearts
      </text>
      <text
        x="52"
        y="55"
        fontFamily="Montserrat, Arial, sans-serif"
        fontWeight="600"
        fontSize="11"
        letterSpacing="2"
        fill={variant === "white" ? "#ffffff" : "#5A1A5E"}
      >
        HOME CARE
      </text>
    </svg>
  );
}
