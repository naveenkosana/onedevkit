import { NavLink } from 'react-router-dom'
import { groups } from '../nav'
import { Code2, Sun, Moon } from 'lucide-react'
import { useTheme } from '../ThemeContext'

export default function Sidebar() {
  const { theme, toggle } = useTheme()

  return (
    <aside
      className="hidden lg:flex flex-col w-56 min-h-screen py-4 fixed top-0 left-0"
      style={{
        background: 'var(--bg-sidebar)',
        borderRight: '1px solid var(--border-subtle)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <NavLink to="/" className="flex items-center gap-2 px-4 pb-5 mb-2" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="w-7 h-7 rounded-md bg-indigo-500 flex items-center justify-center shrink-0">
          <Code2 size={16} className="text-white" />
        </div>
        <span className="font-bold text-sm tracking-wide" style={{ color: 'var(--text-primary)' }}>OneDevKit</span>
      </NavLink>

      <nav className="flex-1 overflow-y-auto px-2">
        {groups.map((group) => (
          <div key={group.id} className="mb-4">
            <p className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
              {group.label}
            </p>
            {group.tools.map((tool) => (
              <NavLink
                key={tool.id}
                to={tool.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors mb-0.5 ${
                    isActive ? 'bg-indigo-500/20 text-indigo-400' : 'hover:bg-black/10'
                  }`
                }
                style={({ isActive }) => isActive ? {} : { color: 'var(--text-secondary)' }}
              >
                <tool.icon size={14} />
                {tool.label}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <div className="px-4 pt-3 flex items-center justify-between" style={{ borderTop: '1px solid var(--border-subtle)' }}>
        <div>
          <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>onedevskit.vercel.app</p>
          <p className="text-[10px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
            Built by <span className="text-indigo-400 font-medium">AnonymousKK</span>
          </p>
          <NavLink to="/privacy" className="text-[10px] text-indigo-400 hover:underline">Privacy Policy</NavLink>
        </div>
        <button
          onClick={toggle}
          className="w-7 h-7 rounded-md flex items-center justify-center transition-colors hover:bg-black/10"
          style={{ color: 'var(--text-secondary)' }}
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </div>
    </aside>
  )
}
