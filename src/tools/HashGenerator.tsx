import { useState } from 'react'
import CryptoJS from 'crypto-js'
import ToolShell from '../components/ToolShell'
import CopyButton from '../components/CopyButton'

const algorithms = ['MD5', 'SHA1', 'SHA256', 'SHA512', 'SHA3'] as const

export default function HashGenerator() {
  const [input, setInput] = useState('')
  const [hmacKey, setHmacKey] = useState('')
  const [useHmac, setUseHmac] = useState(false)

  function computeHash(algo: typeof algorithms[number]) {
    if (!input) return ''
    try {
      if (useHmac && hmacKey) {
        return CryptoJS[`Hmac${algo}`](input, hmacKey).toString()
      }
      return CryptoJS[algo](input).toString()
    } catch {
      return 'Error'
    }
  }

  return (
    <ToolShell title="Hash Generator" description="Generate MD5, SHA1, SHA256, SHA512 and HMAC hashes">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text to hash..."
        className="w-full h-28 bg-[#0a0c10] border border-white/10 rounded-lg p-3 text-sm font-mono text-slate-200 resize-none focus:outline-none focus:border-indigo-500 mb-3"
      />

      <div className="flex items-center gap-3 mb-4">
        <label className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer">
          <input type="checkbox" checked={useHmac} onChange={(e) => setUseHmac(e.target.checked)} className="accent-indigo-500" />
          HMAC
        </label>
        {useHmac && (
          <input
            value={hmacKey}
            onChange={(e) => setHmacKey(e.target.value)}
            placeholder="Secret key..."
            className="flex-1 bg-[#0a0c10] border border-white/10 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:border-indigo-500"
          />
        )}
      </div>

      <div className="flex flex-col gap-2">
        {algorithms.map((algo) => {
          const hash = computeHash(algo)
          return (
            <div key={algo} className="bg-[#0a0c10] border border-white/10 rounded-lg px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="text-xs font-semibold text-indigo-400 w-14 shrink-0">{algo}</span>
              <span className="flex-1 font-mono text-xs text-slate-300 break-all">{hash || <span className="text-slate-600">—</span>}</span>
              {hash && <CopyButton text={hash} className="shrink-0" />}
            </div>
          )
        })}
      </div>
    </ToolShell>
  )
}
