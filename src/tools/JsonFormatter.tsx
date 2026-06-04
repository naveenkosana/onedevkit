import { useState } from 'react'
import ToolShell from '../components/ToolShell'
import CopyButton from '../components/CopyButton'

export default function JsonFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [indent, setIndent] = useState(2)

  function format() {
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed, null, indent))
      setError('')
    } catch (e: any) {
      setError(e.message)
      setOutput('')
    }
  }

  function minify() {
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed))
      setError('')
    } catch (e: any) {
      setError(e.message)
    }
  }

  return (
    <ToolShell title="JSON Formatter" description="Format, validate and minify JSON">
      <div className="flex gap-2 mb-3 items-center">
        <button onClick={format} className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm rounded-md">Format</button>
        <button onClick={minify} className="px-4 py-1.5 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded-md">Minify</button>
        <label className="text-sm text-slate-400 ml-2">Indent:</label>
        <select
          value={indent}
          onChange={(e) => setIndent(Number(e.target.value))}
          className="bg-slate-800 border border-white/10 text-white text-sm rounded px-2 py-1"
        >
          <option value={2}>2</option>
          <option value={4}>4</option>
        </select>
        {output && <CopyButton text={output} className="ml-auto" />}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <p className="text-xs text-slate-500 mb-1">Input</p>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"key": "value"}'
            className="w-full h-80 bg-[#0a0c10] border border-white/10 rounded-lg p-3 text-sm font-mono text-slate-200 resize-none focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div>
          <p className="text-xs text-slate-500 mb-1">Output</p>
          {error ? (
            <div className="h-80 bg-red-950/30 border border-red-500/30 rounded-lg p-3 text-sm text-red-400 font-mono">{error}</div>
          ) : (
            <textarea
              readOnly
              value={output}
              className="w-full h-80 bg-[#0a0c10] border border-white/10 rounded-lg p-3 text-sm font-mono text-green-300 resize-none focus:outline-none"
            />
          )}
        </div>
      </div>
    </ToolShell>
  )
}
