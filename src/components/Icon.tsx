import type { IconName } from '../data/services'

// Station pictograms: one 24px grid, 2px stroke, round caps.
const paths: Record<IconName, JSX.Element> = {
  cashin: (<><rect x="3" y="9" width="18" height="11" rx="2" /><path d="M12 3v8M8.5 7.5 12 11l3.5-3.5" /><circle cx="12" cy="15.5" r="1.6" /></>),
  cashout: (<><rect x="3" y="9" width="18" height="11" rx="2" /><path d="M12 11V3M8.5 6.5 12 3l3.5 3.5" /><circle cx="12" cy="15.5" r="1.6" /></>),
  atm: (<><rect x="3.5" y="3" width="17" height="12" rx="1.5" /><path d="M7 19h10M9 15v4M15 15v4M7.5 7h9M7.5 10.5h5" /></>),
  send: (<><path d="M21 3 10 14" /><path d="M21 3 14.5 21l-4.5-7-7-4.5Z" /></>),
  bank: (<><path d="M3 9.5 12 4l9 5.5" /><path d="M5 10v7M9.7 10v7M14.3 10v7M19 10v7M3 20h18" /></>),
  globe: (<><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.6 2.6 3.8 5.6 3.8 9s-1.2 6.4-3.8 9c-2.6-2.6-3.8-5.6-3.8-9S9.4 5.6 12 3Z" /></>),
  salary: (<><rect x="3" y="6" width="18" height="13" rx="2" /><path d="M8 6V4.5h8V6M3 12h18M11 12v2h2v-2" /></>),
  balance: (<><path d="M4 20V10M10 20V5M16 20v-7M21 20H3" /></>),
  bill: (<><path d="M6 3h12v18l-3-2-3 2-3-2-3 2Z" /><path d="M9 8h6M9 11.5h6M9 15h3" /></>),
  shop: (<><path d="M3.5 9 5 4h14l1.5 5" /><path d="M3.5 9a2.8 2.8 0 0 0 5.67 0 2.8 2.8 0 0 0 5.66 0 2.8 2.8 0 0 0 5.67 0" /><path d="M5 11.5V20h14v-8.5M10 20v-5h4v5" /></>),
  topup: (<><rect x="6.5" y="2.5" width="11" height="19" rx="2" /><path d="M10.5 18.5h3M12 7.5v6M9.5 10l2.5-2.5 2.5 2.5" /></>),
  qr: (<><path d="M3 8V3h5M16 3h5v5M21 16v5h-5M8 21H3v-5" /><rect x="7" y="7" width="4" height="4" /><rect x="13" y="13" width="4" height="4" /><path d="M13 7h4v3M7 14v3h3" /></>),
}

export function Icon({ name, size = 24, className = '' }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      {paths[name]}
    </svg>
  )
}

export function PlayGlyph({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4.2 2.6 13.6 12l-9.4 9.4a1.6 1.6 0 0 1-.7-1.3V3.9c0-.5.3-1 .7-1.3Z" fill="#00d26a" />
      <path d="M16.9 8.7 13.6 12 4.2 2.6c.4-.2 1-.3 1.5 0l11.2 6.1Z" fill="#00a9f4" />
      <path d="M16.9 15.3 5.7 21.4c-.5.3-1.1.2-1.5 0l9.4-9.4 3.3 3.3Z" fill="#ff3d44" />
      <path d="m20.3 10.6-3.4-1.9L13.6 12l3.3 3.3 3.4-1.9c1.1-.6 1.1-2.2 0-2.8Z" fill="#ffc400" />
    </svg>
  )
}
