import { useState, useMemo } from 'react'
import ToolShell from '../components/ToolShell'

export default function RegexTester() {
  const [pattern, setPattern] = useState('')
  const [flags, setFlags] = useState('g')
  const [text, setText] = useState('')

  const result = useMemo(() => {
    if (!pattern) return { matches: [], error: '', highlighted: text }
    try {
      const re = new RegExp(pattern, flags)
      const matches: string[] = []
      let m
      const re2 = new RegExp(pattern, flags.includes('g') ? flags : flags + 'g')
      while ((m = re2.exec(text)) !== null) {
        matches.push(m[0])
        if (!flags.includes('g')) break
      }
      const highlighted = text.replace(re, (match) => `<mark class="bg-yellow-400/30 text-yellow-200 rounded px-0.5">${match}</mark>`)
      return { matches, error: '', highlighted }
    } catch (e: any) {
      return { matches: [], error: e.message, highlighted: text }
    }
  }, [pattern, flags, text])

  return (
    <ToolShell title="Regex Tester" description="Test regular expressions with live match highlighting">
      <div className="flex gap-2 mb-3 flex-wrap">
        <div className="flex flex-1 min-w-0 bg-[#0a0c10] border border-white/10 rounded-lg overflow-hidden">
          <span className="px-3 flex items-center text-slate-500 text-sm border-r border-white/10">/</span>
          <input
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="pattern"
            className="flex-1 bg-transparent px-3 py-2 text-sm font-mono text-white focus:outline-none"
          />
          <span className="px-3 flex items-center text-slate-500 text-sm border-l border-white/10">/</span>
          <input
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
            placeholder="flags"
            className="w-16 bg-transparent px-2 py-2 text-sm font-mono text-indigo-300 focus:outline-none"
          />
        </div>
      </div>

      {result.error && (
        <div className="mb-3 p-2 bg-red-950/30 border border-red-500/30 rounded text-red-400 text-sm">{result.error}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <p className="text-xs text-slate-500 mb-1">Test String</p>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to test against..."
            className="w-full h-56 bg-[#0a0c10] border border-white/10 rounded-lg p-3 text-sm font-mono text-slate-200 resize-none focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div>
          <p className="text-xs text-slate-500 mb-1">
            Highlighted Matches
            {result.matches.length > 0 && (
              <span className="ml-2 bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded text-[10px]">
                {result.matches.length} match{result.matches.length !== 1 ? 'es' : ''}
              </span>
            )}
          </p>
          <div
            className="w-full h-56 bg-[#0a0c10] border border-white/10 rounded-lg p-3 text-sm font-mono text-slate-200 overflow-auto whitespace-pre-wrap break-all"
            dangerouslySetInnerHTML={{ __html: result.highlighted }}
          />
        </div>
      </div>

      {result.matches.length > 0 && (
        <div className="mt-3">
          <p className="text-xs text-slate-500 mb-2">Matches</p>
          <div className="flex flex-wrap gap-2">
            {result.matches.map((m, i) => (
              <span key={i} className="bg-yellow-400/10 border border-yellow-400/20 text-yellow-200 text-xs font-mono px-2 py-1 rounded">
                {m}
              </span>
            ))}
          </div>
        </div>
      )}
    </ToolShell>
  )
}
