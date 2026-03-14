import { useState, useEffect, useCallback } from 'react'
import { ghostguardApi } from '../api/client'
import { StatsResponse, ScoreDistribution, ThresholdConfig } from '../types'

interface UseStatsReturn {
  stats: StatsResponse | null
  distribution: ScoreDistribution | null
  config: ThresholdConfig | null
  loading: boolean
  error: string | null
  refresh: () => void
  lastUpdated: Date | null
}

export function useStats(autoRefreshMs = 10000): UseStatsReturn {
  const [stats,        setStats]        = useState<StatsResponse | null>(null)
  const [distribution, setDistribution] = useState<ScoreDistribution | null>(null)
  const [config,       setConfig]       = useState<ThresholdConfig | null>(null)
  const [loading,      setLoading]      = useState(true)
  const [error,        setError]        = useState<string | null>(null)
  const [lastUpdated,  setLastUpdated]  = useState<Date | null>(null)

  const fetchAll = useCallback(async () => {
    try {
      setError(null)
      const [statsData, distData, configData] = await Promise.all([
        ghostguardApi.getStats(),
        ghostguardApi.getScoreDistribution(),
        ghostguardApi.getConfig(),
      ])
      setStats(statsData)
      setDistribution(distData)
      setConfig(configData)
      setLastUpdated(new Date())
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ||
        err?.message ||
        'Failed to connect to GhostGuard backend'
      )
    } finally {
      setLoading(false)
    }
  }, [])

  // Initial fetch
  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  // Auto refresh
  useEffect(() => {
    if (autoRefreshMs <= 0) return
    const interval = setInterval(fetchAll, autoRefreshMs)
    return () => clearInterval(interval)
  }, [fetchAll, autoRefreshMs])

  return {
    stats,
    distribution,
    config,
    loading,
    error,
    refresh: fetchAll,
    lastUpdated,
  }
}
