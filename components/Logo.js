import Image from "next/image";

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
        <Image
          src="/images/logo-heart-icon.png"
          alt="Blessed Hearts Homecare Heart Logo"
          width={764}
          height={684}
          style={{
            width: "100%",
            height: "auto",
            objectFit: "contain"
          }}
          priority
        />
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

