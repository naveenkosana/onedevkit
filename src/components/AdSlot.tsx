// ─────────────────────────────────────────────────────────
// HOW TO ACTIVATE ADS after AdSense approval:
//
// 1. Uncomment the <script> tag in index.html and replace
//    ca-pub-XXXXXXXXXXXXXXXX with your publisher ID.
//
// 2. In AdSense dashboard, create two ad units:
//    - "OneDevKit Banner"  (Responsive / Display)
//    - "OneDevKit Leaderboard" (728x90 / Leaderboard)
//
// 3. Replace INLINE_SLOT_ID and LEADERBOARD_SLOT_ID below
//    with the slot IDs from your AdSense dashboard.
//
// 4. Uncomment the <ins> blocks in AdSlotInline and AdSlotBottom.
// ─────────────────────────────────────────────────────────

const PUB_ID = 'ca-pub-7186319685677309'
const INLINE_SLOT_ID = 'XXXXXXXXXX'        // ← inline ad slot ID
const LEADERBOARD_SLOT_ID = 'XXXXXXXXXX'   // ← leaderboard slot ID

interface Props {
  className?: string
}

export function AdSlotInline({ className = '' }: Props) {
  return (
    <div
      className={`flex items-center justify-center rounded-lg text-xs ${className}`}
      style={{ background: 'var(--ad-bg)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
    >
      {/* Uncomment below after AdSense approval ↓ */}
      {/* <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={PUB_ID}
        data-ad-slot={INLINE_SLOT_ID}
        data-ad-format="auto"
        data-full-width-responsive="true"
      /> */}
      Advertisement
    </div>
  )
}

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
      {/* Uncomment below after AdSense approval ↓ */}
      {/* <ins
        className="adsbygoogle"
        style={{ display: 'inline-block', width: '728px', height: '90px' }}
        data-ad-client={PUB_ID}
        data-ad-slot={LEADERBOARD_SLOT_ID}
      /> */}
      Advertisement — 728×90 leaderboard
    </div>
  )
}

// Suppress unused variable warnings until IDs are filled in
void PUB_ID; void INLINE_SLOT_ID; void LEADERBOARD_SLOT_ID

export default AdSlotInline
