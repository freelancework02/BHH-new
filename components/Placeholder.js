import { Heart } from "lucide-react";

export default function Placeholder({ label, className = "", style = {} }) {
  return (
    <div
      className={`placeholder ${className}`}
      role="img"
      aria-label={label || "Decorative image placeholder"}
      style={style}
    >
      <Heart size={48} className="placeholder__icon" strokeWidth={1.5} aria-hidden="true" />
    </div>
  );
}
