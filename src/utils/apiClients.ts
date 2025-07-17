class APIClient {
  private baseURL: string

  constructor() {
    this.baseURL = import.meta.env.VITE_APP_URL || ""
  }

  async analyzeIP(): Promise<{ ipv4: unknown; ipv6: unknown }> {
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Analysis failed: ${response.statusText}`)
    }

    const data = await response.json()
    return data.data
  }

  async getHistory(limit = 10): Promise<unknown[]> {
    const response = await fetch(`/api/history?limit=${limit}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch history: ${response.statusText}`)
    }

    const data = await response.json()
    return data.data
  }

  async getAnalytics(apiKey: string): Promise<unknown> {
    const response = await fetch("/api/analytics", {
      headers: {
        "X-API-Key": apiKey,
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch analytics: ${response.statusText}`)
    }

    const data = await response.json()
    return data.data
  }

  async healthCheck(): Promise<unknown> {
    const response = await fetch("/api/health")
    const data = await response.json()
    return data
  }
}

export const apiClient = new APIClient()
