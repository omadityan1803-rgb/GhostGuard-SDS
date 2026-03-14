import React from 'react'

interface NavbarProps {
  currentPage: string
  onNavigate: (page: string) => void
  lastUpdated: Date | null
  onRefresh: () => void
}

export default function Navbar({
  currentPage,
  onNavigate,
  lastUpdated,
  onRefresh
}: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50"
         style={{ background: 'rgba(15,17,23,0.95)',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(10px)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto',
                    padding: '0 24px', height: '60px',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between' }}>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '24px' }}>👻</span>
          <span style={{ fontWeight: 700, fontSize: '18px',
                         color: '#e2e8f0', letterSpacing: '-0.3px' }}>
            GhostGuard
          </span>
          <span style={{ fontSize: '11px', padding: '2px 8px',
                         background: 'rgba(99,102,241,0.2)',
                         color: '#818cf8', borderRadius: '20px',
                         border: '1px solid rgba(99,102,241,0.3)' }}>
            ADMIN
          </span>
        </div>

        {/* Nav Links */}
        <div style={{ display: 'flex', gap: '4px' }}>
          {['Overview', 'Logs'].map((page) => (
            <button
              key={page}
              onClick={() => onNavigate(page)}
              style={{
                padding: '6px 16px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: currentPage === page ? 600 : 400,
                background: currentPage === page
                  ? 'rgba(99,102,241,0.2)'
                  : 'transparent',
                color: currentPage === page ? '#818cf8' : '#94a3b8',
                transition: 'all 0.2s',
              }}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {lastUpdated && (
            <span style={{ fontSize: '12px', color: '#64748b' }}>
              Updated {lastUpdated.toLocaleTimeString()}
            </span>
          )}
          <button
            onClick={onRefresh}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.05)',
              color: '#94a3b8',
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            ↻ Refresh
          </button>
        </div>
      </div>
    </nav>
  )
}
