import { useState, useMemo } from 'react'
import cronstrue from 'cronstrue'
import ToolShell from '../components/ToolShell'

const EXAMPLES = [
  { label: 'Every minute', cron: '* * * * *' },
  { label: 'Every hour', cron: '0 * * * *' },
  { label: 'Every day at midnight', cron: '0 0 * * *' },
  { label: 'Every Monday 9am', cron: '0 9 * * 1' },
  { label: 'Every 15 minutes', cron: '*/15 * * * *' },
  { label: 'First day of month', cron: '0 0 1 * *' },
  { label: 'Weekdays at 9am', cron: '0 9 * * 1-5' },
]

const FIELDS = ['Minute', 'Hour', 'Day of Month', 'Month', 'Day of Week']

export default function CronExplainer() {
  const [cron, setCron] = useState('*/15 * * * *')

  const parts = cron.trim().split(/\s+/)

  const explanation = useMemo(() => {
    try {
      return { text: cronstrue.toString(cron), error: '' }
    } catch {
      return { text: '', error: 'Invalid cron expression' }
    }
  }, [cron])

  return (
    <ToolShell title="Cron Explainer" description="Translate cron expressions into plain English">
      <div className="mb-4">
        <label className="text-xs text-slate-500 mb-1 block">Cron expression</label>
        <input
          value={cron}
          onChange={(e) => setCron(e.target.value)}
          placeholder="*/15 * * * *"
          className="w-full bg-[#0a0c10] border border-white/10 rounded-lg px-4 py-3 text-lg font-mono text-white focus:outline-none focus:border-indigo-500"
        />
      </div>

      {explanation.error ? (
        <div className="p-3 bg-red-950/30 border border-red-500/30 rounded text-red-400 text-sm mb-4">{explanation.error}</div>
      ) : (
        <div className="p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-lg mb-4">
          <p className="text-xs text-slate-500 mb-1">Meaning</p>
          <p className="text-white font-medium">{explanation.text}</p>
        </div>
      )}

      <div className="grid grid-cols-5 gap-2 mb-4">
        {FIELDS.map((field, i) => (
          <div key={field} className="bg-[#0a0c10] border border-white/10 rounded-lg p-2 text-center">
            <p className="text-[10px] text-slate-600 mb-1">{field}</p>
            <p className="font-mono text-sm text-indigo-300">{parts[i] ?? '?'}</p>
          </div>
        ))}
      </div>

      <div>
        <p className="text-xs text-slate-500 mb-2">Examples</p>
        <div className="flex flex-wrap gap-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex.cron}
              onClick={() => setCron(ex.cron)}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-md font-mono"
            >
              {ex.cron} <span className="text-slate-500 font-sans">— {ex.label}</span>
            </button>
          ))}
        </div>
      </div>
    </ToolShell>
  )
}
