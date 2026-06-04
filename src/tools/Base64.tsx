import { useState } from 'react'
import ToolShell from '../components/ToolShell'
import CopyButton from '../components/CopyButton'

export default function Base64Tool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')

  function process() {
    try {
      if (mode === 'encode') {
        setOutput(btoa(unescape(encodeURIComponent(input))))
      } else {
        setOutput(decodeURIComponent(escape(atob(input))))
      }
    } catch {
      setOutput('Error: invalid input')
    }
  }

  function swap() {
    setInput(output)
    setOutput('')
    setMode((m) => (m === 'encode' ? 'decode' : 'encode'))
  }

  return (
    <ToolShell title="Base64 Encoder / Decoder" description="Encode or decode Base64 strings">
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => setMode('encode')}
          className={`px-4 py-1.5 text-sm rounded-md ${mode === 'encode' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}
        >Encode</button>
        <button
          onClick={() => setMode('decode')}
          className={`px-4 py-1.5 text-sm rounded-md ${mode === 'decode' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}
        >Decode</button>
        <button onClick={process} className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm rounded-md ml-2">
          {mode === 'encode' ? 'Encode →' : 'Decode →'}
        </button>
        {output && (
          <button onClick={swap} className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded-md">⇅ Swap</button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <p className="text-xs text-slate-500 mb-1">Input</p>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'encode' ? 'Plain text...' : 'Base64 string...'}
            className="w-full h-64 bg-[#0a0c10] border border-white/10 rounded-lg p-3 text-sm font-mono text-slate-200 resize-none focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div>
          <p className="text-xs text-slate-500 mb-1">Output</p>
          <textarea
            readOnly
            value={output}
            className="w-full h-64 bg-[#0a0c10] border border-white/10 rounded-lg p-3 text-sm font-mono text-green-300 resize-none"
          />
          {output && <CopyButton text={output} className="mt-2" />}
        </div>
      </div>
    </ToolShell>
  )
}
