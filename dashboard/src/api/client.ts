import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add admin key to every request if set
api.interceptors.request.use((config) => {
  const adminKey = localStorage.getItem('gg_admin_key')
  if (adminKey) {
    config.headers['X-Admin-Key'] = adminKey
  }
  return config
})

// Global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 503) {
      console.warn('GhostGuard backend not available')
    }
    return Promise.reject(error)
  }
)

export const ghostguardApi = {

  // Get overall stats
  getStats: async () => {
    const res = await api.get('/admin/stats')
    return res.data
  },

  // Get score distribution
  getScoreDistribution: async () => {
    const res = await api.get('/admin/score-distribution')
    return res.data
  },

  // Get threshold config
  getConfig: async () => {
    const res = await api.get('/admin/config')
    return res.data
  },

  // Update thresholds
  updateThresholds: async (passThreshold: number, softThreshold: number) => {
    const res = await api.post(
      `/admin/config/thresholds?pass_threshold=${passThreshold}&soft_threshold=${softThreshold}`
    )
    return res.data
  },

  // Clear logs (dev only)
  clearLogs: async () => {
    const res = await api.delete('/admin/logs')
    return res.data
  },

  // Health check
  health: async () => {
    const res = await api.get('/health')
    return res.data
  },
}

export default api
