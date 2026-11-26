export function useAnalytics() {
  const config = useRuntimeConfig()

  function trackGoal(goalName: string, params: Record<string, any> = {}) {
    if (import.meta.server || typeof window === 'undefined') return

    const w = window as any
    const ymId = Number(config.public.yandexMetrikaId)

    if (ymId && typeof w.ym === 'function') {
      try {
        w.ym(ymId, 'reachGoal', goalName, params)
      } catch {
        // Ignore blocked tracker errors
      }
    }

    if (typeof w.gtag === 'function') {
      try {
        w.gtag('event', goalName, params)
      } catch {
        // Ignore blocked tracker errors
      }
    }
  }

  return { trackGoal }
}
