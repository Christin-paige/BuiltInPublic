import { useEffect, useState } from 'react'

const REQUIRED_HEADERS = [
  'permissions-policy',
  'referrer-policy',
  'x-frame-options',
  'strict-transport-security',
  'content-security-policy',
]

export default function SecurityHeaderChecker() {
  const [missingHeaders, setMissingHeaders] = useState<string[]>([])
  const [status, setStatus] = useState<'checking' | 'ok' | 'missing'>('checking')

  useEffect(() => {
    fetch(window.location.href)
      .then((res) => {
        const headers = res.headers
        const missing = REQUIRED_HEADERS.filter(
          (key) => !headers.get(key)
        )
        setMissingHeaders(missing)
        setStatus(missing.length > 0 ? 'missing' : 'ok')
      })
      .catch(() => {
        setStatus('missing')
      })
  }, [])

  if (status === 'checking') return <p>🔍 Checking security headers...</p>

  return (
    <div>
      {status === 'ok' ? (
        <p>✅ All required headers are present!</p>
      ) : (
        <>
          <p>⚠️ Missing required security headers:</p>
          <ul>
            {missingHeaders.map((header) => (
              <li key={header}>{header}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
