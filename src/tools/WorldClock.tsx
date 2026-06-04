import { useState, useEffect } from 'react'
import ToolShell from '../components/ToolShell'

const CITIES = [
  { label: 'New York', tz: 'America/New_York' },
  { label: 'London', tz: 'Europe/London' },
  { label: 'Paris', tz: 'Europe/Paris' },
  { label: 'Dubai', tz: 'Asia/Dubai' },
  { label: 'Mumbai', tz: 'Asia/Kolkata' },
  { label: 'Singapore', tz: 'Asia/Singapore' },
  { label: 'Tokyo', tz: 'Asia/Tokyo' },
  { label: 'Sydney', tz: 'Australia/Sydney' },
  { label: 'Los Angeles', tz: 'America/Los_Angeles' },
  { label: 'São Paulo', tz: 'America/Sao_Paulo' },
  { label: 'Chicago', tz: 'America/Chicago' },
  { label: 'Toronto', tz: 'America/Toronto' },
]

function getTime(tz: string) {
  return new Date().toLocaleTimeString('en-US', { timeZone: tz, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
}
function getDate(tz: string) {
  return new Date().toLocaleDateString('en-US', { timeZone: tz, weekday: 'short', month: 'short', day: 'numeric' })
}
function getOffset(tz: string) {
  const s = new Intl.DateTimeFormat('en', { timeZone: tz, timeZoneName: 'shortOffset' }).formatToParts(new Date())
  return s.find((p) => p.type === 'timeZoneName')?.value ?? ''
}

export default function WorldClock() {
  const [, setTick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <ToolShell title="World Clock" description="Current time across major cities worldwide">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {CITIES.map((city) => (
          <div key={city.tz} className="bg-[#0a0c10] border border-white/10 rounded-lg px-4 py-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-white">{city.label}</span>
              <span className="text-xs text-slate-500">{getOffset(city.tz)}</span>
            </div>
            <div className="font-mono text-2xl text-indigo-300 font-semibold">{getTime(city.tz)}</div>
            <div className="text-xs text-slate-500 mt-0.5">{getDate(city.tz)}</div>
          </div>
        ))}
      </div>
    </ToolShell>
  )
}
