import React from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie,
  Cell, Legend
} from 'recharts'
import StatCard from '../components/StatCard'
import RecentEvents from '../components/RecentEvents'
import { StatsResponse, ScoreDistribution, ThresholdConfig } from '../types'

interface OverviewProps {
  stats: StatsResponse | null
  distribution: ScoreDistribution | null
  config: ThresholdConfig | null
  loading: boolean
  error: string | null
}

const PIE_COLORS = {
  PASS:      '#10b981',
  SOFT_FLAG: '#f59e0b',
  CHALLENGE: '#ef4444',
}

const TOOLTIP_STYLE = {
  backgroundColor: '#1e2433',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '8px',
  color: '#e2e8f0',
  fontSize: '13px',
}

export default function Overview({
  stats, distribution, config, loading, error
}: OverviewProps) {

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center',
                    justifyContent: 'center', height: '60vh',
                    flexDirection: 'column', gap: '16px' }}>
        <div style={{ fontSize: '48px' }}>👻</div>
        <div style={{ color: '#64748b', fontSize: '16px' }}>
          Loading GhostGuard data...
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ display: 'flex', alignItems: 'center',
                    justifyContent: 'center', height: '60vh',
                    flexDirection: 'column', gap: '16px' }}>
        <div style={{ fontSize: '48px' }}>⚠️</div>
        <div style={{ color: '#ef4444', fontSize: '16px' }}>{error}</div>
        <div style={{ color: '#64748b', fontSize: '13px' }}>
          Make sure the backend is running: docker compose up
        </div>
      </div>
    )
  }

  // Build pie chart data
  const pieData = stats ? [
    { name: 'Pass',      value: stats.pass,      color: PIE_COLORS.PASS },
    { name: 'Soft Flag', value: stats.soft_flag, color: PIE_COLORS.SOFT_FLAG },
    { name: 'Challenge', value: stats.challenge, color: PIE_COLORS.CHALLENGE },
  ] : []

  // Build bar chart data from distribution
  const barData = distribution
    ? Object.entries(distribution.distribution).map(([range, count]) => ({
        range, count
      }))
    : []

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* Stat Cards */}
      <div style={{ display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '16px' }}>
        <StatCard
          title="Total Verifications"
          value={stats?.total?.toLocaleString() ?? '0'}
          subtitle="All time"
          color="#818cf8"
          icon="🔍"
        />
        <StatCard
          title="Pass Rate"
          value={`${stats?.pass_rate ?? 0}%`}
          subtitle={`${stats?.pass ?? 0} humans verified`}
          color="#10b981"
          icon="✓"
        />
        <StatCard
          title="Bot Rate"
          value={`${stats?.bot_rate ?? 0}%`}
          subtitle={`${stats?.challenge ?? 0} bots blocked`}
          color="#ef4444"
          icon="🤖"
        />
        <StatCard
          title="Avg Score"
          value={stats?.avg_score ?? 0}
          subtitle="Human confidence"
          color="#f59e0b"
          icon="📊"
        />
        <StatCard
          title="Pass Threshold"
          value={config?.pass_threshold ?? 75}
          subtitle="Minimum to pass"
          color="#818cf8"
          icon="🎯"
        />
        <StatCard
          title="Soft Threshold"
          value={config?.soft_threshold ?? 40}
          subtitle="Minimum to soft flag"
          color="#f59e0b"
          icon="⚠"
        />
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '24px' }}>

        {/* Score Distribution Bar Chart */}
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '16px',
          padding: '24px',
        }}>
          <h3 style={{ fontSize: '15px', fontWeight: 600,
                       color: '#e2e8f0', marginBottom: '20px' }}>
            Score Distribution
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3"
                             stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="range" tick={{ fontSize: 10, fill: '#64748b' }}
                     interval={1} />
              <YAxis tick={{ fontSize: 10, fill: '#64748b' }} />
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Bar dataKey="count" fill="#818cf8" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Verdict Pie Chart */}
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '16px',
          padding: '24px',
        }}>
          <h3 style={{ fontSize: '15px', fontWeight: 600,
                       color: '#e2e8f0', marginBottom: '20px' }}>
            Verdict Breakdown
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Legend
                formatter={(value) => (
                  <span style={{ color: '#94a3b8', fontSize: '13px' }}>
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Events Table */}
      <RecentEvents events={stats?.recent ?? []} />

    </div>
  )
}
