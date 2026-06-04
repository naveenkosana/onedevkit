import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { groups, allTools } from '../nav'
import { AdSlotInline } from '../components/AdSlot'
import { Code2, Search } from 'lucide-react'

export default function Home() {
  const [query, setQuery] = useState('')
  const trimmed = query.trim().toLowerCase()

  const searchResults = trimmed
    ? allTools.filter(
        (t) =>
          t.label.toLowerCase().includes(trimmed) ||
          t.description.toLowerCase().includes(trimmed)
      )
    : null

  return (
    <div>
      {/* Hero */}
      <div className="flex items-center gap-3 mb-1">
        <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center shrink-0">
          <Code2 size={20} className="text-white" />
        </div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>OneDevKit</h1>
      </div>
      <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
        Free developer tools that work in your browser. No login, no tracking, no fluff.
      </p>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--text-muted)' }} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tools…"
          className="w-full rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-colors"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-primary)',
          }}
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs px-1.5 py-0.5 rounded"
            style={{ color: 'var(--text-muted)' }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Search results */}
      {searchResults !== null ? (
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>
            {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{query}"
          </p>
          {searchResults.length === 0 ? (
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No tools match your search.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
              {searchResults.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Grouped tools */
        <div className="flex flex-col gap-8">
          {groups.map((group) => (
            <div key={group.id}>
              <div className="flex items-center gap-2 mb-3">
                <group.icon size={14} className="text-indigo-400" />
                <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-label)' }}>
                  {group.label}
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
                {group.tools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <AdSlotInline className="h-16 mt-10" />

      <p className="text-center text-xs mt-4 pb-2" style={{ color: 'var(--text-muted)' }}>
        Built with ♥ by <span className="text-indigo-400 font-medium">AnonymousKK</span>
      </p>
    </div>
  )
}

function ToolCard({ tool }: { tool: (typeof allTools)[number] }) {
  return (
    <NavLink
      to={tool.path}
      className="group flex flex-col items-center justify-center gap-3 rounded-2xl px-4 py-6 transition-all duration-150 text-center"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'var(--bg-card-hover)'
        e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'var(--bg-card)'
        e.currentTarget.style.borderColor = 'var(--border)'
      }}
    >
      <div className="w-12 h-12 rounded-xl bg-indigo-500/10 group-hover:bg-indigo-500/20 flex items-center justify-center transition-colors">
        <tool.icon size={22} className="text-indigo-400 group-hover:text-indigo-300 transition-colors" />
      </div>
      <span className="text-sm font-medium leading-tight" style={{ color: 'var(--text-primary)' }}>
        {tool.label}
      </span>
      <span className="hidden sm:block text-xs leading-snug" style={{ color: 'var(--text-secondary)' }}>
        {tool.description}
      </span>
    </NavLink>
  )
}
