import React, { useState } from 'react'
import { EventLog, Verdict } from '../types'
import VerdictBadge from '../components/VerdictBadge'

interface LogsProps {
  events: EventLog[]
}

function timeAgo(timestamp: number): string {
  const diff = Math.floor(Date.now() / 1000) - timestamp
  if (diff < 60)    return `${diff}s ago`
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return new Date(timestamp * 1000).toLocaleDateString()
}

export default function Logs({ events }: LogsProps) {
  const [filter,  setFilter]  = useState<'ALL' | Verdict>('ALL')
  const [search,  setSearch]  = useState('')
  const [minScore, setMinScore] = useState(0)
  const [maxScore, setMaxScore] = useState(100)

  const filtered = events.filter(e => {
    if (filter !== 'ALL' && e.verdict !== filter) return false
    if (e.score < minScore || e.score > maxScore)  return false
    if (search && !e.session_id.includes(search) &&
        !e.site_key.includes(search))              return false
    return true
  })

  const inputStyle = {
    padding: '8px 12px',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(255,255,255,0.05)',
    color: '#e2e8f0',
    fontSize: '13px',
    outline: 'none',
  }

  const filterBtnStyle = (active: boolean) => ({
    padding: '6px 14px',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.1)',
    background: active ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.04)',
    color: active ? '#818cf8' : '#94a3b8',
    fontSize: '13px',
    cursor: 'pointer',
    fontWeight: active ? 600 : 400,
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* Filter Bar */}
      <div style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '16px',
        padding: '16px 24px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        alignItems: 'center',
      }}>
        <input
          style={{ ...inputStyle, minWidth: '200px' }}
          placeholder="Search session ID or site key..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <div style={{ display: 'flex', gap: '6px' }}>
          {(['ALL', 'PASS', 'SOFT_FLAG', 'CHALLENGE'] as const).map(v => (
            <button
              key={v}
              style={filterBtnStyle(filter === v)}
              onClick={() => setFilter(v)}
            >
              {v === 'ALL' ? 'All' :
               v === 'SOFT_FLAG' ? 'Soft Flag' : v.charAt(0) + v.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center',
                      gap: '8px', marginLeft: 'auto' }}>
          <span style={{ fontSize: '13px', color: '#64748b' }}>Score:</span>
          <input
            type="number" min={0} max={100}
            style={{ ...inputStyle, width: '60px' }}
            value={minScore}
            onChange={e => setMinScore(Number(e.target.value))}
          />
          <span style={{ color: '#64748b' }}>–</span>
          <input
            type="number" min={0} max={100}
            style={{ ...inputStyle, width: '60px' }}
            value={maxScore}
            onChange={e => setMaxScore(Number(e.target.value))}
          />
        </div>

        <span style={{ fontSize: '13px', color: '#64748b' }}>
          {filtered.length} results
        </span>
      </div>

      {/* Logs Table */}
      <div style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '16px',
        overflow: 'hidden',
      }}>
        {/* Table Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '80px 1fr 140px 120px 120px 100px',
          padding: '12px 24px',
          fontSize: '12px',
          color: '#64748b',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          background: 'rgba(0,0,0,0.2)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          <span>Score</span>
          <span>Session ID</span>
          <span>Verdict</span>
          <span>Site Key</span>
          <span>User Agent</span>
          <span>Time</span>
        </div>

        {filtered.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center',
                        color: '#64748b' }}>
            No events match your filters.
          </div>
        ) : (
          filtered.map((event, index) => (
            <div
              key={index}
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr 140px 120px 120px 100px',
                padding: '12px 24px',
                alignItems: 'center',
                borderBottom: index < filtered.length - 1
                  ? '1px solid rgba(255,255,255,0.04)'
                  : 'none',
                fontSize: '13px',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.background =
                  'rgba(255,255,255,0.03)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.background =
                  'transparent'
              }}
            >
              {/* Score circle */}
              <div style={{
                width: '40px', height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '14px',
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

              {/* Session ID */}
              <span style={{ color: '#94a3b8', fontFamily: 'monospace',
                             fontSize: '12px' }}>
                {event.session_id}
              </span>

              {/* Verdict */}
              <VerdictBadge verdict={event.verdict} size="sm" />

              {/* Site Key */}
              <span style={{ color: '#64748b', fontFamily: 'monospace',
                             fontSize: '12px' }}>
                {event.site_key?.slice(0, 12)}
              </span>

              {/* User Agent */}
              <span style={{ color: '#64748b', fontSize: '12px',
                             overflow: 'hidden', textOverflow: 'ellipsis',
                             whiteSpace: 'nowrap' }}
                    title={event.user_agent}>
                {event.user_agent?.slice(0, 20) || '—'}
              </span>

              {/* Time */}
              <span style={{ color: '#64748b' }}>
                {timeAgo(event.timestamp)}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
