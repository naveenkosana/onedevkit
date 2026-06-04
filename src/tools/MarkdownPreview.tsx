import { useState } from 'react'
import { marked } from 'marked'
import ToolShell from '../components/ToolShell'

const DEFAULT = `# Hello, OneDevKit!

A **markdown** preview tool.

- Item one
- Item two
- Item three

\`\`\`js
const greet = (name) => \`Hello, \${name}!\`
\`\`\`

> Blockquote example

[Link example](https://onedevkit.vercel.app)
`

export default function MarkdownPreview() {
  const [text, setText] = useState(DEFAULT)
  const [split, setSplit] = useState(true)

  const html = marked.parse(text) as string

  return (
    <ToolShell title="Markdown Previewer" description="Write markdown and see a live preview">
      <div className="flex gap-2 mb-3">
        <button onClick={() => setSplit(true)} className={`px-3 py-1.5 text-sm rounded-md ${split ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}>Split</button>
        <button onClick={() => setSplit(false)} className={`px-3 py-1.5 text-sm rounded-md ${!split ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}>Preview only</button>
      </div>
      <div className={`grid gap-3 ${split ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
        {split && (
          <div>
            <p className="text-xs text-slate-500 mb-1">Markdown</p>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-96 bg-[#0a0c10] border border-white/10 rounded-lg p-3 text-sm font-mono text-slate-200 resize-none focus:outline-none focus:border-indigo-500"
            />
          </div>
        )}
        <div>
          <p className="text-xs text-slate-500 mb-1">Preview</p>
          <div
            className="prose prose-invert prose-sm max-w-none h-96 overflow-auto bg-[#0a0c10] border border-white/10 rounded-lg p-4 text-slate-200"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </ToolShell>
  )
}
