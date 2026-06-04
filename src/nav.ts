import {
  Braces, Regex, GitCompare, Binary, Link, KeyRound, Hash, FileText,
  Fingerprint, Palette, Clock, Globe, Calendar, DollarSign, Network,
} from 'lucide-react'

export interface Tool {
  id: string
  label: string
  description: string
  path: string
  icon: typeof Braces
}

export interface Group {
  id: string
  label: string
  icon: typeof Braces
  tools: Tool[]
}

export const groups: Group[] = [
  {
    id: 'code',
    label: 'Code & Data',
    icon: Braces,
    tools: [
      { id: 'json', label: 'JSON Formatter', description: 'Format, validate and minify JSON', path: '/json', icon: Braces },
      { id: 'regex', label: 'Regex Tester', description: 'Test and debug regular expressions live', path: '/regex', icon: Regex },
      { id: 'diff', label: 'Diff Checker', description: 'Compare two texts and highlight changes', path: '/diff', icon: GitCompare },
    ],
  },
  {
    id: 'encoding',
    label: 'Text & Encoding',
    tools: [
      { id: 'base64', label: 'Base64', description: 'Encode and decode Base64 strings', path: '/base64', icon: Binary },
      { id: 'url', label: 'URL Encoder/Decoder', description: 'Encode, decode or parse URLs', path: '/url', icon: Link },
      { id: 'jwt', label: 'JWT Decoder', description: 'Inspect JWT headers and payloads', path: '/jwt', icon: KeyRound },
      { id: 'hash', label: 'Hash Generator', description: 'Generate MD5, SHA256, SHA512 hashes', path: '/hash', icon: Hash },
      { id: 'markdown', label: 'Markdown Preview', description: 'Write markdown with a live preview', path: '/markdown', icon: FileText },
    ],
    icon: Binary,
  },
  {
    id: 'generators',
    label: 'Generators',
    tools: [
      { id: 'uuid', label: 'UUID Generator', description: 'Generate one or bulk v4 UUIDs', path: '/uuid', icon: Fingerprint },
      { id: 'color', label: 'Color Converter', description: 'Convert between HEX, RGB, HSL and Tailwind', path: '/color', icon: Palette },
    ],
    icon: Fingerprint,
  },
  {
    id: 'time',
    label: 'Time & Date',
    tools: [
      { id: 'worldclock', label: 'World Clock', description: 'Current time across major cities', path: '/worldclock', icon: Clock },
      { id: 'timezone', label: 'Timezone Diff', description: 'Calculate offset between two timezones', path: '/timezone', icon: Globe },
      { id: 'cron', label: 'Cron Explainer', description: 'Translate cron expressions to plain English', path: '/cron', icon: Calendar },
    ],
    icon: Clock,
  },
  {
    id: 'network',
    label: 'Network & Finance',
    tools: [
      { id: 'ip', label: 'IP Lookup', description: 'Geolocate and inspect any IP address', path: '/ip', icon: Network },
      { id: 'currency', label: 'Currency Converter', description: 'Live exchange rates for 20+ currencies', path: '/currency', icon: DollarSign },
    ],
    icon: Network,
  },
]

export const allTools: Tool[] = groups.flatMap((g) => g.tools)
