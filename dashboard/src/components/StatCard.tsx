import React from 'react'

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  color?: string
  icon?: string
}

export default function StatCard({
  title,
  value,
  subtitle,
  color = '#818cf8',
  icon
}: StatCardProps) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '16px',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      transition: 'border-color 0.2s',
    }}>
      <div style={{ display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between' }}>
        <span style={{ fontSize: '13px', color: '#64748b',
                       fontWeight: 500, textTransform: 'uppercase',
                       letterSpacing: '0.5px' }}>
          {title}
        </span>
        {icon && (
          <span style={{ fontSize: '20px',
                         padding: '6px',
                         background: `${color}20`,
                         borderRadius: '8px' }}>
            {icon}
          </span>
        )}
      </div>

      <div style={{ fontSize: '36px', fontWeight: 700,
                    color, lineHeight: 1 }}>
        {value}
      </div>

      {subtitle && (
        <div style={{ fontSize: '13px', color: '#64748b' }}>
          {subtitle}
        </div>
      )}
    </div>
  )
}
