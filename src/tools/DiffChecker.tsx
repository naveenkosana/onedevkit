import { useState, useMemo } from 'react'
import * as Diff from 'diff'
import ToolShell from '../components/ToolShell'

export default function DiffChecker() {
  const [left, setLeft] = useState('')
  const [right, setRight] = useState('')

  const diff = useMemo(() => {
    if (!left && !right) return []
    return Diff.diffLines(left, right)
  }, [left, right])

  return (
    <ToolShell title="Diff Checker" description="Compare two text blocks and see the differences">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        <div>
          <p className="text-xs text-slate-500 mb-1">Original</p>
          <textarea
            value={left}
            onChange={(e) => setLeft(e.target.value)}
            placeholder="Paste original text..."
            className="w-full h-56 bg-[#0a0c10] border border-white/10 rounded-lg p-3 text-sm font-mono text-slate-200 resize-none focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div>
          <p className="text-xs text-slate-500 mb-1">Modified</p>
          <textarea
            value={right}
            onChange={(e) => setRight(e.target.value)}
            placeholder="Paste modified text..."
            className="w-full h-56 bg-[#0a0c10] border border-white/10 rounded-lg p-3 text-sm font-mono text-slate-200 resize-none focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {diff.length > 0 && (
        <div>
          <p className="text-xs text-slate-500 mb-2">Diff</p>
          <div className="bg-[#0a0c10] border border-white/10 rounded-lg p-3 font-mono text-sm overflow-auto max-h-80">
            {diff.map((part, i) => (
              <div
                key={i}
                className={`whitespace-pre-wrap ${
                  part.added ? 'bg-green-900/40 text-green-300' :
                  part.removed ? 'bg-red-900/40 text-red-300' :
                  'text-slate-500'
                }`}
              >
                {part.value.split('\n').filter((_, idx, arr) => idx < arr.length - 1 || part.value.endsWith('\n') || arr.length === 1).map((line, li) => (
                  <div key={li}>
                    <span className="select-none mr-2 opacity-50">{part.added ? '+' : part.removed ? '-' : ' '}</span>
                    {line}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </ToolShell>
  )
}
