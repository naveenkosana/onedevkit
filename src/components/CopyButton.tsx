import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

interface Props {
  text: string
  className?: string
}

export default function CopyButton({ text, className = '' }: Props) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      disabled={!text}
      className={`cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md font-medium transition-all duration-150 select-none disabled:opacity-30 disabled:cursor-not-allowed ${
        copied
          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
          : 'bg-slate-700 hover:bg-slate-600 text-white active:scale-95'
      } ${className}`}
    >
      <span
        className="transition-all duration-150 overflow-hidden"
        style={{ width: copied ? '14px' : '14px' }}
      >
        {copied
          ? <Check size={13} className="shrink-0" />
          : <Copy size={13} className="shrink-0" />
        }
      </span>
      <span className="transition-all duration-150" style={{ minWidth: '2.5rem', textAlign: 'left' }}>
        {copied ? 'Copied!' : 'Copy'}
      </span>
    </button>
  )
}
