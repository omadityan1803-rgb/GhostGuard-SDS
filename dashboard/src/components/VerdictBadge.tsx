import React from 'react'
import { Verdict } from '../types'

interface VerdictBadgeProps {
  verdict: Verdict
  size?: 'sm' | 'md'
}

const VERDICT_STYLES: Record<Verdict, {
  bg: string; color: string; border: string; label: string; icon: string
}> = {
  PASS: {
    bg:     'rgba(16,185,129,0.15)',
    color:  '#10b981',
    border: 'rgba(16,185,129,0.3)',
    label:  'PASS',
    icon:   '✓',
  },
  SOFT_FLAG: {
    bg:     'rgba(245,158,11,0.15)',
    color:  '#f59e0b',
    border: 'rgba(245,158,11,0.3)',
    label:  'SOFT FLAG',
    icon:   '⚠',
  },
  CHALLENGE: {
    bg:     'rgba(239,68,68,0.15)',
    color:  '#ef4444',
    border: 'rgba(239,68,68,0.3)',
    label:  'CHALLENGE',
    icon:   '✗',
  },
}

export default function VerdictBadge({ verdict, size = 'md' }: VerdictBadgeProps) {
  const style = VERDICT_STYLES[verdict] || VERDICT_STYLES['SOFT_FLAG']
  const isSmall = size === 'sm'

  return (
    <span style={{
      display:      'inline-flex',
      alignItems:   'center',
      gap:          '4px',
      padding:      isSmall ? '2px 8px' : '4px 12px',
      borderRadius: '20px',
      fontSize:     isSmall ? '11px' : '13px',
      fontWeight:   600,
      background:   style.bg,
      color:        style.color,
      border:       `1px solid ${style.border}`,
      letterSpacing: '0.3px',
    }}>
      <span>{style.icon}</span>
      {style.label}
    </span>
  )
}
