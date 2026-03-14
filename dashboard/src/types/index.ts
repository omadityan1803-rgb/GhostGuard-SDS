export type Verdict = 'PASS' | 'SOFT_FLAG' | 'CHALLENGE'

export interface EventLog {
  session_id: string
  site_key: string
  score: number
  verdict: Verdict
  user_agent: string
  timestamp: number
}

export interface StatsResponse {
  total: number
  pass: number
  soft_flag: number
  challenge: number
  avg_score: number
  pass_rate: number
  bot_rate: number
  recent: EventLog[]
}

export interface ScoreDistribution {
  distribution: Record<string, number>
  total: number
}

export interface ThresholdConfig {
  pass_threshold: number
  soft_threshold: number
  rate_limit: number
  cache_ttl_sec: number
  env: string
}
