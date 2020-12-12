import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'

Sentry.init({
  dsn:
    'https://783c3fbfa77c456d9d9eada038a0f0af@o473538.ingest.sentry.io/5554343',
  autoSessionTracking: true,
  integrations: [new Integrations.BrowserTracing()],
  environment: process.env.NODE_ENV || 'development',
  beforeSend(event) {
    if (process.env.NODE_ENV === 'production') return event
    return null
  },
  tracesSampleRate: 1.0
})

export default Sentry
