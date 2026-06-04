interface Props {
  className?: string
}

export function AdSlotInline({ className = '' }: Props) {
  return (
    <div
      className={`flex items-center justify-center rounded-lg text-xs ${className}`}
      style={{ background: 'var(--ad-bg)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
    >
      Advertisement
    </div>
  )
}

// Sticky leaderboard — desktop only, sits just above the bottom edge
export function AdSlotBottom() {
  return (
    <div
      className="hidden lg:flex fixed bottom-0 left-56 right-0 z-40 h-14 items-center justify-center text-xs"
      style={{
        background: 'var(--bg-sidebar)',
        borderTop: '1px solid var(--border)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        color: 'var(--text-muted)',
      }}
    >
      Advertisement — 728×90 leaderboard
    </div>
  )
}

export default AdSlotInline
