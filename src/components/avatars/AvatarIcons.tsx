// Reusable SVG Avatar Component - Male
export function MaleAvatar({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Head */}
      <circle cx="32" cy="20" r="12" fill="currentColor" />
      {/* Body */}
      <path
        d="M32 32 L20 48 L20 56 L44 56 L44 48 L32 32"
        fill="currentColor"
      />
      {/* Eyes */}
      <circle cx="28" cy="18" r="2" fill="white" />
      <circle cx="36" cy="18" r="2" fill="white" />
      {/* Mouth */}
      <path d="M 28 22 Q 32 24 36 22" stroke="white" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

// Reusable SVG Avatar Component - Female
export function FemaleAvatar({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Head */}
      <circle cx="32" cy="18" r="12" fill="currentColor" />
      {/* Hair */}
      <path
        d="M 20 18 Q 20 8 32 8 Q 44 8 44 18"
        fill="currentColor"
      />
      {/* Body/Dress */}
      <path
        d="M 24 30 L 20 50 L 44 50 L 40 30 Z"
        fill="currentColor"
      />
      {/* Neck bridge */}
      <rect x="29" y="29" width="6" height="2" fill="currentColor" />
      {/* Eyes */}
      <circle cx="28" cy="16" r="2" fill="white" />
      <circle cx="36" cy="16" r="2" fill="white" />
      {/* Smile */}
      <path d="M 28 20 Q 32 22 36 20" stroke="white" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

// Avatar component - auto-selects based on gender
export function Avatar({
  gender,
  className = "w-16 h-16",
}: {
  gender: "male" | "female";
  className?: string;
}) {
  return gender === "male" ? (
    <MaleAvatar className={className} />
  ) : (
    <FemaleAvatar className={className} />
  );
}
