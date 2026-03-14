import React from 'react'

interface ScoreGaugeProps {
  score: number
  size?: number
}

export default function ScoreGauge({ score, size = 120 }: ScoreGaugeProps) {
  const radius      = (size / 2) - 12
  const circumference = Math.PI * radius  // Half circle
  const progress    = (score / 100) * circumference
  const cx          = size / 2
  const cy          = size / 2

  // Color based on score
  const color =
    score >= 75 ? '#10b981' :
    score >= 40 ? '#f59e0b' :
                  '#ef4444'

  const label =
    score >= 75 ? 'Human' :
    score >= 40 ? 'Uncertain' :
                  'Bot'

  return (
    <div style={{ display: 'flex', flexDirection: 'column',
                  alignItems: 'center', gap: '8px' }}>
      <svg
        width={size}
        height={size / 2 + 20}
        viewBox={`0 0 ${size} ${size / 2 + 20}`}
      >
        {/* Background arc */}
        <path
          d={`M 12 ${cy} A ${radius} ${radius} 0 0 1 ${size - 12} ${cy}`}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="10"
          strokeLinecap="round"
        />

        {/* Score arc */}
        <path
          d={`M 12 ${cy} A ${radius} ${radius} 0 0 1 ${size - 12} ${cy}`}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${progress} ${circumference}`}
          style={{ transition: 'stroke-dasharray 1s ease, stroke 0.3s ease' }}
        />

        {/* Score text */}
        <text
          x={cx}
          y={cy - 4}
          textAnchor="middle"
          fill={color}
          fontSize={size * 0.22}
          fontWeight="700"
        >
          {score}
        </text>

        {/* Label text */}
        <text
          x={cx}
          y={cy + 16}
          textAnchor="middle"
          fill="#64748b"
          fontSize="12"
          fontWeight="500"
        >
          {label}
        </text>
      </svg>
    </div>
  )
}
