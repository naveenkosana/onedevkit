import { useState } from 'react'
import ToolShell from '../components/ToolShell'
import CopyButton from '../components/CopyButton'

export default function UrlTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [parseMode, setParseMode] = useState(false)

  function process() {
    try {
      if (mode === 'encode') {
        setOutput(encodeURIComponent(input))
      } else {
        setOutput(decodeURIComponent(input))
      }
    } catch {
      setOutput('Error: invalid input')
    }
  }

  function parseUrl() {
    try {
      const u = new URL(input)
      const params = Object.fromEntries(u.searchParams.entries())
      setOutput(JSON.stringify({
        protocol: u.protocol,
        host: u.host,
        pathname: u.pathname,
        params,
        hash: u.hash,
      }, null, 2))
    } catch {
      setOutput('Error: invalid URL')
    }
  }

  return (
    <ToolShell title="URL Encoder / Decoder" description="Encode, decode, or parse URLs and query strings">
      <div className="flex gap-2 mb-3 flex-wrap">
        <button onClick={() => { setMode('encode'); setParseMode(false) }} className={`px-4 py-1.5 text-sm rounded-md ${mode === 'encode' && !parseMode ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}>Encode</button>
        <button onClick={() => { setMode('decode'); setParseMode(false) }} className={`px-4 py-1.5 text-sm rounded-md ${mode === 'decode' && !parseMode ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}>Decode</button>
        <button onClick={() => setParseMode(true)} className={`px-4 py-1.5 text-sm rounded-md ${parseMode ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}>Parse URL</button>
        <button onClick={parseMode ? parseUrl : process} className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm rounded-md ml-2">Run →</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <p className="text-xs text-slate-500 mb-1">Input</p>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={parseMode ? 'https://example.com/path?foo=bar&baz=1' : mode === 'encode' ? 'hello world / test' : 'hello%20world%20%2F%20test'}
            className="w-full h-48 bg-[#0a0c10] border border-white/10 rounded-lg p-3 text-sm font-mono text-slate-200 resize-none focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div>
          <p className="text-xs text-slate-500 mb-1">Output</p>
          <textarea readOnly value={output} className="w-full h-48 bg-[#0a0c10] border border-white/10 rounded-lg p-3 text-sm font-mono text-green-300 resize-none" />
          {output && <CopyButton text={output} className="mt-2" />}
        </div>
      </div>
    </ToolShell>
  )
}
