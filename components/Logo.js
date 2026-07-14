export default function Logo({ variant = "color", title = "Blessed Hearts Homecare" }) {
  const isWhite = variant === "white";
  
  return (
    <div 
      className="logo-container" 
      style={{ 
        display: "inline-flex", 
        alignItems: "center", 
        gap: "14px", 
        height: "3.4rem" 
      }}
    >
      <div 
        className="logo-icon-wrapper" 
        style={{ 
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "3.4rem", 
          height: "3.4rem" 
        }}
      >
        <svg 
          viewBox="0 0 120 120" 
          width="100%" 
          height="100%" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="logo-heart-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff2d7a" />
              <stop offset="50%" stopColor="#ff5a3c" />
              <stop offset="100%" stopColor="#ff7a1a" />
            </linearGradient>
            <linearGradient id="logo-heart-grad-white" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0.7)" />
            </linearGradient>
          </defs>
          
          {/* Glowing outer soft ambient circle */}
          <circle 
            cx="60" 
            cy="60" 
            r="54" 
            fill={isWhite ? "rgba(255, 255, 255, 0.04)" : "rgba(255, 45, 122, 0.04)"} 
          />

          {/* Handcrafted, elegant heart outline / ribbon */}
          <path
            d="M 60,19 C 60,19 66,10 76,10 C 90,10 102,21 102,36 C 102,53 85,75 60,95 C 35,75 18,53 18,36 C 18,21 30,10 44,10 C 54,10 60,19 60,19 Z"
            stroke={`url(#${isWhite ? "logo-heart-grad-white" : "logo-heart-grad"})`}
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill={isWhite ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 90, 60, 0.05)"}
          />

          {/* House Silhouette with Symmetrical Heart Cutout */}
          <path
            d="M 60,42 L 40,58 H 45 V 78 H 75 V 58 H 80 L 60,42 Z M 60,73 C 58.2,71.5 54,67.5 54,64 C 54,61.5 56.2,59.5 58.5,59.5 C 59.5,59.5 60,60.5 60,61 C 60,60.5 60.5,59.5 61.5,59.5 C 63.8,59.5 66,61.5 66,64 C 66,67.5 61.8,71.5 60,73 Z"
            fill={isWhite ? "#ffffff" : "var(--plum, #5a1a5e)"}
            fillRule="evenodd"
          />
        </svg>
      </div>
      <div 
        className="logo-text-wrapper" 
        style={{ 
          display: "flex", 
          flexDirection: "column", 
          justifyContent: "center",
          lineHeight: "1.15"
        }}
      >
        <span 
          style={{ 
            fontFamily: 'var(--font-heading, "Poppins", sans-serif)', 
            fontWeight: "750", 
            fontSize: "1.45rem", 
            color: isWhite ? "#ffffff" : "var(--plum)",
            letterSpacing: "-0.3px"
          }}
        >
          Blessed Hearts
        </span>
        <span 
          style={{ 
            fontFamily: 'var(--font-cta, "Montserrat", sans-serif)', 
            fontWeight: "600", 
            fontSize: "0.65rem", 
            color: isWhite ? "rgba(255, 255, 255, 0.8)" : "var(--pink)",
            letterSpacing: "3px",
            marginTop: "3px"
          }}
        >
          HOME CARE
        </span>
      </div>
    </div>
  );
}

