import { NavLink } from 'react-router-dom'
import { groups } from '../nav'
import { Code2, Sun, Moon } from 'lucide-react'
import { useTheme } from '../ThemeContext'

export default function BottomNav() {
  const { theme, toggle } = useTheme()

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50"
      style={{ background: 'var(--bg-sidebar)', borderTop: '1px solid var(--border-subtle)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
    >
      <div className="flex items-center justify-around h-14">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 px-3 py-1 ${isActive ? 'text-indigo-400' : ''}`
          }
          style={({ isActive }) => isActive ? {} : { color: 'var(--text-muted)' }}
        >
          <Code2 size={18} />
          <span className="text-[9px]">Home</span>
        </NavLink>

        {groups.map((group) => (
          <NavLink
            key={group.id}
            to={group.tools[0].path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-3 py-1 ${isActive ? 'text-indigo-400' : ''}`
            }
            style={({ isActive }) => isActive ? {} : { color: 'var(--text-muted)' }}
          >
            <group.icon size={18} />
            <span className="text-[9px] text-center leading-tight">{group.label.split(' ')[0]}</span>
          </NavLink>
        ))}

        <button
          onClick={toggle}
          className="flex flex-col items-center gap-0.5 px-3 py-1 transition-colors"
          style={{ color: 'var(--text-muted)' }}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          <span className="text-[9px]">Theme</span>
        </button>
      </div>
    </nav>
  )
}
