import * as React from "react"

export function CompassPinIcon({ className }: { className?: string }) {
  const uid = React.useId().replace(/:/g, "")
  const gradientId = `compassSbGold_${uid}`
  const primary = "#1B2D4F"
  const accent = "#C8963E"
  const accent2 = "#D4A853"

  return (
    <svg viewBox="10 40 280 310" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={accent} />
          <stop offset="50%" stopColor={accent2} />
          <stop offset="100%" stopColor={accent} />
        </linearGradient>
      </defs>

      {/* Pin body */}
      <path
        d="M150,50 C230,50 280,110 280,170 C280,240 150,340 150,340 C150,340 20,240 20,170 C20,110 70,50 150,50Z"
        fill="none"
        stroke={primary}
        strokeWidth="8"
      />
      <path d="M150,58 C224,58 272,114 272,170 C272,234 150,330 150,330 C150,330 28,234 28,170 C28,114 76,58 150,58Z" fill={primary} opacity="0.04" />

      {/* Compass inside */}
      <g transform="translate(150,170)">
        <circle cx="0" cy="0" r="80" fill="none" stroke={primary} strokeWidth="3" opacity="0.5" />

        {[0, 90, 180, 270].map((angle) => {
          const rad = (angle * Math.PI) / 180
          return (
            <line
              key={`t-${angle}`}
              x1={66 * Math.sin(rad)}
              y1={-66 * Math.cos(rad)}
              x2={76 * Math.sin(rad)}
              y2={-76 * Math.cos(rad)}
              stroke={angle === 0 ? accent : primary}
              strokeWidth="4"
              opacity="0.8"
            />
          )
        })}

        {[0, 90, 180, 270].map((angle) => {
          const rad = (angle * Math.PI) / 180
          const tipX = 55 * Math.sin(rad)
          const tipY = -55 * Math.cos(rad)
          const lRad = ((angle - 90) * Math.PI) / 180
          const rRad = ((angle + 90) * Math.PI) / 180
          const bLX = 6 * Math.sin(lRad)
          const bLY = -6 * Math.cos(lRad)
          const bRX = 6 * Math.sin(rRad)
          const bRY = -6 * Math.cos(rRad)
          const isN = angle === 0
          return (
            <g key={`r-${angle}`}>
              <polygon points={`${tipX},${tipY} 0,0 ${bRX},${bRY}`} fill={isN ? "#C0392B" : primary} opacity={isN ? 0.95 : 0.75} />
              <polygon points={`${tipX},${tipY} 0,0 ${bLX},${bLY}`} fill={isN ? "#E74C3C" : primary} opacity={isN ? 0.7 : 0.4} />
            </g>
          )
        })}

        {[45, 135, 225, 315].map((angle) => {
          const rad = (angle * Math.PI) / 180
          const tipX = 34 * Math.sin(rad)
          const tipY = -34 * Math.cos(rad)
          const lRad = ((angle - 90) * Math.PI) / 180
          const rRad = ((angle + 90) * Math.PI) / 180
          return (
            <g key={`m-${angle}`}>
              <polygon
                points={`${tipX},${tipY} 0,0 ${3 * Math.sin(rRad)},${-3 * Math.cos(rRad)}`}
                fill={`url(#${gradientId})`}
                opacity="0.7"
              />
              <polygon points={`${tipX},${tipY} 0,0 ${3 * Math.sin(lRad)},${-3 * Math.cos(lRad)}`} fill={accent} opacity="0.4" />
            </g>
          )
        })}

        <circle cx="0" cy="0" r="6" fill="none" stroke={`url(#${gradientId})`} strokeWidth="2.5" />
        <circle cx="0" cy="0" r="2.5" fill={accent} />
      </g>
    </svg>
  )
}
