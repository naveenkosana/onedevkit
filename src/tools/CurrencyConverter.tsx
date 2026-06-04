import { useState, useEffect } from 'react'
import ToolShell from '../components/ToolShell'

const CURRENCIES = ['USD', 'EUR', 'GBP', 'INR', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'SGD', 'AED', 'BRL', 'MXN', 'KRW', 'SEK', 'NOK', 'DKK', 'NZD', 'HKD', 'ZAR']

interface Rates { [key: string]: number }

export default function CurrencyConverter() {
  const [rates, setRates] = useState<Rates | null>(null)
  const [base, setBase] = useState('USD')
  const [amount, setAmount] = useState('1')
  const [to, setTo] = useState('EUR')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [lastUpdated, setLastUpdated] = useState('')

  useEffect(() => {
    fetchRates(base)
  }, [base])

  async function fetchRates(currency: string) {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`https://open.er-api.com/v6/latest/${currency}`)
      const json = await res.json()
      if (json.result !== 'success') throw new Error('Failed to fetch rates')
      setRates(json.rates)
      setLastUpdated(new Date(json.time_last_update_utc).toLocaleDateString())
    } catch (e: any) {
      setError('Could not load rates. Try again later.')
    } finally {
      setLoading(false)
    }
  }

  const converted = rates && amount ? (parseFloat(amount) * (rates[to] ?? 0)).toFixed(4) : ''
  const allConverted = rates ? CURRENCIES.filter((c) => c !== base).map((c) => ({ code: c, value: (parseFloat(amount || '1') * (rates[c] ?? 0)).toFixed(2) })) : []

  return (
    <ToolShell title="Currency Converter" description="Real-time exchange rates via Open Exchange Rates API">
      <div className="flex flex-wrap gap-3 items-end mb-5">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-500">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-32 bg-[#0a0c10] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-500">From</label>
          <select value={base} onChange={(e) => setBase(e.target.value)} className="bg-slate-800 border border-white/10 text-white text-sm rounded-lg px-3 py-2 focus:outline-none">
            {CURRENCIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-500">To</label>
          <select value={to} onChange={(e) => setTo(e.target.value)} className="bg-slate-800 border border-white/10 text-white text-sm rounded-lg px-3 py-2 focus:outline-none">
            {CURRENCIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {error && <div className="p-3 bg-red-950/30 border border-red-500/30 rounded text-red-400 text-sm mb-4">{error}</div>}
      {loading && <div className="text-sm text-slate-500 mb-4">Loading rates…</div>}

      {rates && !loading && (
        <>
          <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-lg p-5 mb-5 text-center">
            <p className="text-slate-400 text-sm">{amount} {base} =</p>
            <p className="text-4xl font-bold text-indigo-300 my-1">{converted} <span className="text-xl">{to}</span></p>
            <p className="text-xs text-slate-500">Rate: 1 {base} = {rates[to]?.toFixed(4)} {to} · Updated {lastUpdated}</p>
          </div>

          <div>
            <p className="text-xs text-slate-500 mb-2">All rates for {amount} {base}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {allConverted.map(({ code, value }) => (
                <div key={code} className="bg-[#0a0c10] border border-white/10 rounded-lg px-3 py-2 flex justify-between items-center">
                  <span className="text-xs text-slate-500">{code}</span>
                  <span className="text-sm font-mono text-slate-200">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </ToolShell>
  )
}
