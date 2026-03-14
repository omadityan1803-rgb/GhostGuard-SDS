import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Overview from './pages/Overview'
import Logs from './pages/Logs'
import { useStats } from './hooks/useStats'

export default function App() {
  const [currentPage, setCurrentPage] = useState('Overview')
  const { stats, distribution, config,
          loading, error, refresh, lastUpdated } = useStats(10000)

  return (
    <div style={{ minHeight: '100vh', background: '#0f1117' }}>

      <Navbar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        lastUpdated={lastUpdated}
        onRefresh={refresh}
      />

      {/* Page content */}
      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '84px 24px 40px',
      }}>

        {/* Page title */}
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 700,
                       color: '#e2e8f0', marginBottom: '6px' }}>
            {currentPage === 'Overview' ? '📊 Overview' : '📋 Event Logs'}
          </h1>
          <p style={{ color: '#64748b', fontSize: '14px' }}>
            {currentPage === 'Overview'
              ? 'Real-time human verification analytics'
              : 'Detailed verification event history with filters'}
          </p>
        </div>

        {currentPage === 'Overview' && (
          <Overview
            stats={stats}
            distribution={distribution}
            config={config}
            loading={loading}
            error={error}
          />
        )}

        {currentPage === 'Logs' && (
          <Logs events={stats?.recent ?? []} />
        )}

      </main>
    </div>
  )
}
