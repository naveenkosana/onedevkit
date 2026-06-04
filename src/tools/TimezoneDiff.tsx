import { useState } from 'react'
import ToolShell from '../components/ToolShell'

const TIMEZONES = [
  'UTC', 'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles',
  'America/Toronto', 'America/Sao_Paulo', 'Europe/London', 'Europe/Paris', 'Europe/Berlin',
  'Europe/Moscow', 'Asia/Dubai', 'Asia/Kolkata', 'Asia/Dhaka', 'Asia/Bangkok',
  'Asia/Singapore', 'Asia/Tokyo', 'Asia/Shanghai', 'Australia/Sydney', 'Pacific/Auckland',
]

function getOffsetHours(tz: string, date: Date): number {
  const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }))
  const tzDate = new Date(date.toLocaleString('en-US', { timeZone: tz }))
  return (tzDate.getTime() - utcDate.getTime()) / 3600000
}

function formatTime(tz: string, date: Date) {
  return date.toLocaleString('en-US', { timeZone: tz, hour: '2-digit', minute: '2-digit', weekday: 'short', month: 'short', day: 'numeric', hour12: false })
}

export default function TimezoneDiff() {
  const [tzA, setTzA] = useState('America/New_York')
  const [tzB, setTzB] = useState('Asia/Kolkata')
  const [dateStr, setDateStr] = useState(() => {
    const d = new Date()
    return d.toISOString().slice(0, 16)
  })

  const date = new Date(dateStr)
  const validDate = !isNaN(date.getTime())

  const offsetA = validDate ? getOffsetHours(tzA, date) : 0
  const offsetB = validDate ? getOffsetHours(tzB, date) : 0
  const diff = offsetB - offsetA

  const Select = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="flex-1 bg-slate-800 border border-white/10 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500"
    >
      {TIMEZONES.map((tz) => <option key={tz} value={tz}>{tz.replace('_', ' ')}</option>)}
    </select>
  )

  return (
    <ToolShell title="Timezone Difference" description="Calculate time difference between two timezones">
      <div className="flex flex-col gap-3 mb-5">
        <div>
          <label className="text-xs text-slate-500 mb-1 block">Reference date & time</label>
          <input
            type="datetime-local"
            value={dateStr}
            onChange={(e) => setDateStr(e.target.value)}
            className="bg-slate-800 border border-white/10 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="flex gap-3 flex-wrap">
          <div className="flex flex-col gap-1 flex-1 min-w-40">
            <label className="text-xs text-slate-500">From timezone</label>
            <Select value={tzA} onChange={setTzA} />
          </div>
          <div className="flex flex-col gap-1 flex-1 min-w-40">
            <label className="text-xs text-slate-500">To timezone</label>
            <Select value={tzB} onChange={setTzB} />
          </div>
        </div>
      </div>

      {validDate && (
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-[#0a0c10] border border-white/10 rounded-lg p-4">
              <p className="text-xs text-slate-500 mb-1">{tzA}</p>
              <p className="text-lg font-mono text-white">{formatTime(tzA, date)}</p>
              <p className="text-xs text-slate-500 mt-1">UTC{offsetA >= 0 ? '+' : ''}{offsetA}</p>
            </div>
            <div className="bg-[#0a0c10] border border-white/10 rounded-lg p-4">
              <p className="text-xs text-slate-500 mb-1">{tzB}</p>
              <p className="text-lg font-mono text-white">{formatTime(tzB, date)}</p>
              <p className="text-xs text-slate-500 mt-1">UTC{offsetB >= 0 ? '+' : ''}{offsetB}</p>
            </div>
          </div>
          <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-lg p-4 text-center">
            <p className="text-slate-400 text-sm">Difference</p>
            <p className="text-3xl font-bold text-indigo-300 mt-1">
              {diff > 0 ? '+' : ''}{diff} hour{Math.abs(diff) !== 1 ? 's' : ''}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {tzB} is {Math.abs(diff)} hour{Math.abs(diff) !== 1 ? 's' : ''} {diff >= 0 ? 'ahead of' : 'behind'} {tzA}
            </p>
          </div>
        </div>
      )}
    </ToolShell>
  )
}
