import { ReactNode } from 'react'

interface Props {
  title: string
  description: string
  children: ReactNode
}

export default function ToolShell({ title, description, children }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>{title}</h1>
        <p className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>{description}</p>
      </div>
      {children}
    </div>
  )
}
