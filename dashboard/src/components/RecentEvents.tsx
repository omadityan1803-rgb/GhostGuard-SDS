import React from 'react'
import { EventLog } from '../types'
import VerdictBadge from './VerdictBadge'
import ScoreGauge from './ScoreGauge'

interface RecentEventsProps {
  events: EventLog[]
}

function timeAgo(timestamp: number): string {
  const diff = Math.floor(Date.now() / 1000) - timestamp
  if (diff < 60)    return `${diff}s ago`
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

export default function RecentEvents({ events }: RecentEventsProps) {
  if (!events || events.length === 0) {
    return (
      <div style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '16px',
        padding: '40px',
        textAlign: 'center',
        color: '#64748b'
      }}>
        No verification events yet. Start the demo to see live data.
      </div>
    )
  }

  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '16px',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 24px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span style={{ fontWeight: 600, fontSize: '15px', color: '#e2e8f0' }}>
          Recent Verifications
        </span>
        <span style={{ fontSize: '12px', color: '#64748b' }}>
          Last {events.length} events
        </span>
      </div>

      {/* Table header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '100px 1fr 120px 100px 100px',
        padding: '10px 24px',
        fontSize: '12px',
        color: '#64748b',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        background: 'rgba(0,0,0,0.2)',
      }}>
        <span>Score</span>
        <span>Session</span>
        <span>Verdict</span>
        <span>Site Key</span>
        <span>Time</span>
      </div>

      {/* Rows */}
      {events.map((event, index) => (
        <div
          key={index}
          style={{
            display: 'grid',
            gridTemplateColumns: '100px 1fr 120px 100px 100px',
            padding: '14px 24px',
            alignItems: 'center',
            borderBottom: index < events.length - 1
              ? '1px solid rgba(255,255,255,0.04)'
              : 'none',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLDivElement).style.background =
              'rgba(255,255,255,0.03)'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLDivElement).style.background = 'transparent'
          }}
        >
          {/* Score with color bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '13px',
              fontWeight: 700,
              background:
                event.score >= 75 ? 'rgba(16,185,129,0.15)' :
                event.score >= 40 ? 'rgba(245,158,11,0.15)' :
                                    'rgba(239,68,68,0.15)',
              color:
                event.score >= 75 ? '#10b981' :
                event.score >= 40 ? '#f59e0b' :
                                    '#ef4444',
            }}>
              {event.score}
            </div>
          </div>

          {/* Session ID */}
          <span style={{ fontSize: '13px', color: '#94a3b8',
                         fontFamily: 'monospace' }}>
            {event.session_id}
          </span>

          {/* Verdict */}
          <VerdictBadge
            verdict={event.verdict as any}
            size="sm"
          />

          {/* Site key */}
          <span style={{ fontSize: '12px', color: '#64748b',
                         fontFamily: 'monospace' }}>
            {event.site_key?.slice(0, 10)}...
          </span>

          {/* Time */}
          <span style={{ fontSize: '12px', color: '#64748b' }}>
            {timeAgo(event.timestamp)}
          </span>
        </div>
      ))}
    </div>
  )
}
