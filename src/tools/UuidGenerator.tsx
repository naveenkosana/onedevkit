import { useState } from 'react'
import ToolShell from '../components/ToolShell'
import CopyButton from '../components/CopyButton'

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export default function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([uuidv4()])
  const [count, setCount] = useState(5)
  const [uppercase, setUppercase] = useState(false)
  const [noDashes, setNoDashes] = useState(false)

  function transform(id: string) {
    let s = id
    if (noDashes) s = s.replace(/-/g, '')
    if (uppercase) s = s.toUpperCase()
    return s
  }

  function generate() {
    setUuids(Array.from({ length: count }, uuidv4))
  }

  function copyAll() {
    navigator.clipboard.writeText(uuids.map(transform).join('\n'))
  }

  return (
    <ToolShell title="UUID Generator" description="Generate one or multiple v4 UUIDs">
      <div className="flex flex-wrap gap-3 items-center mb-4">
        <div className="flex items-center gap-2">
          <label className="text-sm text-slate-400">Count:</label>
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(Math.min(100, Math.max(1, Number(e.target.value))))}
            className="w-16 bg-slate-800 border border-white/10 text-white text-sm rounded px-2 py-1 focus:outline-none"
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer">
          <input type="checkbox" checked={uppercase} onChange={(e) => setUppercase(e.target.checked)} className="accent-indigo-500" />
          Uppercase
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer">
          <input type="checkbox" checked={noDashes} onChange={(e) => setNoDashes(e.target.checked)} className="accent-indigo-500" />
          No dashes
        </label>
        <button onClick={generate} className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm rounded-md">Generate</button>
        <CopyButton text={uuids.map(transform).join('\n')} />
      </div>

      <div className="flex flex-col gap-1.5">
        {uuids.map((id, i) => (
          <div key={i} className="flex items-center gap-2 bg-[#0a0c10] border border-white/10 rounded-lg px-4 py-2.5">
            <span className="flex-1 font-mono text-sm text-slate-200 break-all">{transform(id)}</span>
            <CopyButton text={transform(id)} className="shrink-0" />
          </div>
        ))}
      </div>
    </ToolShell>
  )
}
