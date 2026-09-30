import { useId } from "react"

// Israel IPTV mark: a TV screen carrying the two flag stripes, with a play button in the centre.
export function LogoMark({ className = "h-9 w-9", title }: { className?: string; title?: string }) {
  const id = useId().replace(/:/g, "")
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <defs>
        <linearGradient id={`screen-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7DB2FF" />
          <stop offset="1" stopColor="#2D63D4" />
        </linearGradient>
        <clipPath id={`clip-${id}`}>
          <rect x="4" y="8" width="56" height="40" rx="10" />
        </clipPath>
      </defs>
      {/* screen */}
      <rect x="4" y="8" width="56" height="40" rx="10" fill={`url(#screen-${id})`} />
      {/* flag stripes */}
      <g clipPath={`url(#clip-${id})`} fill="#FFFFFF">
        <rect x="0" y="13" width="64" height="4.5" />
        <rect x="0" y="38.5" width="64" height="4.5" />
      </g>
      {/* play button */}
      <path d="M27.5 21.6c0-1.2 1.3-1.9 2.3-1.3l10.4 6.4c1 .6 1 2 0 2.6l-10.4 6.4c-1 .6-2.3-.1-2.3-1.3z" fill="#FFFFFF" />
      {/* stand */}
      <rect x="22" y="52" width="20" height="4" rx="2" fill="#5B9BFF" />
    </svg>
  )
}

// Full lockup: mark + "ISRAEL IPTV" wordmark. Always reads left-to-right, also on Hebrew pages.
export default function Logo({ className = "", size = "md" }: { className?: string; size?: "md" | "lg" }) {
  const mark = size === "lg" ? "h-11 w-11" : "h-9 w-9"
  const text = size === "lg" ? "text-2xl" : "text-xl"
  return (
    <span dir="ltr" className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className={`${mark} shrink-0 transition-transform duration-300 group-hover:scale-110`} />
      <span className={`${text} font-extrabold leading-none tracking-[0.06em]`}>
        <span className="text-foreground">ISRAEL</span>
        <span className="text-primary"> IPTV</span>
      </span>
    </span>
  )
}
