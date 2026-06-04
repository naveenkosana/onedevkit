import { useState, useMemo } from 'react'
import ToolShell from '../components/ToolShell'

function decodeBase64Url(str: string) {
  const base64 = str.replace(/-/g, '+').replace(/_/g, '/')
  const padded = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, '=')
  return JSON.parse(atob(padded))
}

export default function JwtDecoder() {
  const [token, setToken] = useState('')

  const decoded = useMemo(() => {
    if (!token.trim()) return null
    try {
      const parts = token.trim().split('.')
      if (parts.length !== 3) return { error: 'Invalid JWT: must have 3 parts' }
      const header = decodeBase64Url(parts[0])
      const payload = decodeBase64Url(parts[1])
      const now = Math.floor(Date.now() / 1000)
      const expired = payload.exp ? payload.exp < now : null
      return { header, payload, expired }
    } catch {
      return { error: 'Invalid JWT: could not decode' }
    }
  }, [token])

  const Section = ({ title, data }: { title: string; data: object }) => (
    <div className="bg-[#0a0c10] border border-white/10 rounded-lg p-4">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{title}</p>
      <pre className="text-sm text-green-300 font-mono overflow-auto">{JSON.stringify(data, null, 2)}</pre>
    </div>
  )

  return (
    <ToolShell title="JWT Decoder" description="Decode and inspect JSON Web Tokens">
      <textarea
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Paste a JWT token here..."
        className="w-full h-28 bg-[#0a0c10] border border-white/10 rounded-lg p-3 text-sm font-mono text-slate-200 resize-none focus:outline-none focus:border-indigo-500 mb-4"
      />

      {decoded && (
        decoded.error ? (
          <div className="p-3 bg-red-950/30 border border-red-500/30 rounded text-red-400 text-sm">{decoded.error}</div>
        ) : (
          <div className="flex flex-col gap-3">
            {decoded.expired !== null && (
              <div className={`px-3 py-2 rounded text-sm ${decoded.expired ? 'bg-red-950/30 border border-red-500/30 text-red-400' : 'bg-green-950/30 border border-green-500/30 text-green-400'}`}>
                {decoded.expired ? '⚠ Token is expired' : '✓ Token is not expired'}
                {decoded.payload?.exp && ` — expires ${new Date(decoded.payload.exp * 1000).toLocaleString()}`}
              </div>
            )}
            <Section title="Header" data={decoded.header} />
            <Section title="Payload" data={decoded.payload} />
            <div className="bg-[#0a0c10] border border-white/10 rounded-lg p-4">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Signature</p>
              <p className="text-sm text-yellow-300 font-mono break-all">{token.split('.')[2]}</p>
              <p className="text-xs text-slate-600 mt-2">Signature cannot be verified client-side without the secret key.</p>
            </div>
          </div>
        )
      )}
    </ToolShell>
  )
}
