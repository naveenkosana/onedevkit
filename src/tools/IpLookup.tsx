import { useState } from 'react'
import ToolShell from '../components/ToolShell'

interface IpData {
  ip: string
  city: string
  region: string
  country_name: string
  org: string
  timezone: string
  latitude: number
  longitude: number
  postal: string
  country_code: string
}

export default function IpLookup() {
  const [ip, setIp] = useState('')
  const [data, setData] = useState<IpData | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function lookup(target?: string) {
    setLoading(true)
    setError('')
    setData(null)
    try {
      const url = target ? `https://ipapi.co/${target}/json/` : 'https://ipapi.co/json/'
      const res = await fetch(url)
      const json = await res.json()
      if (json.error) throw new Error(json.reason ?? 'Lookup failed')
      setData(json)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const Row = ({ label, value }: { label: string; value: string | number }) => (
    <div className="flex justify-between py-2 border-b border-white/5 last:border-0">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-sm text-slate-200 font-medium text-right max-w-xs">{value}</span>
    </div>
  )

  return (
    <ToolShell title="IP Lookup" description="Get geolocation and network info for any IP address">
      <div className="flex gap-2 mb-4 flex-wrap">
        <input
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          placeholder="Enter IP (leave blank for your own)"
          onKeyDown={(e) => e.key === 'Enter' && lookup(ip || undefined)}
          className="flex-1 min-w-48 bg-[#0a0c10] border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
        />
        <button onClick={() => lookup(ip || undefined)} disabled={loading} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm rounded-lg disabled:opacity-50">
          {loading ? 'Looking up…' : 'Lookup'}
        </button>
        <button onClick={() => lookup()} disabled={loading} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded-lg disabled:opacity-50">
          My IP
        </button>
      </div>

      {error && <div className="p-3 bg-red-950/30 border border-red-500/30 rounded text-red-400 text-sm mb-4">{error}</div>}

      {data && (
        <div className="bg-[#0a0c10] border border-white/10 rounded-lg divide-y divide-white/5">
          <div className="px-4 py-3 flex items-center gap-3">
            <span className="text-3xl">{data.country_code ? String.fromCodePoint(...[...data.country_code].map((c) => 0x1F1E0 - 65 + c.charCodeAt(0))) : ''}</span>
            <div>
              <p className="text-lg font-bold text-white">{data.ip}</p>
              <p className="text-sm text-slate-400">{data.city}, {data.region}, {data.country_name}</p>
            </div>
          </div>
          <div className="px-4 py-1">
            <Row label="Organization" value={data.org} />
            <Row label="Timezone" value={data.timezone} />
            <Row label="Coordinates" value={`${data.latitude}, ${data.longitude}`} />
            <Row label="Postal code" value={data.postal} />
          </div>
        </div>
      )}
    </ToolShell>
  )
}
