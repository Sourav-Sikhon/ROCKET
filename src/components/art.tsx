/* Decorative vector art for the hero, awards strip and footer. All aria-hidden. */

/** Shaheed Minar, stylised: a tall central spire with leaning blades, in soft lavender. */
export function ShaheedMinar({ className = '', tone = 'light' }: { className?: string; tone?: 'light' | 'line' }) {
  const mirror = (x: number) => 440 - x
  const blades = [
    { ax: 210, ay: 78, b0: 188, b1: 160 },
    { ax: 200, ay: 124, b0: 150, b1: 108 },
    { ax: 192, ay: 166, b0: 112, b1: 62 },
    { ax: 184, ay: 200, b0: 72, b1: 26 },
  ]
  if (tone === 'line') {
    return (
      <svg aria-hidden viewBox="0 0 440 260" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
        <path d="M220 4 L232 236 L208 236 Z" />
        {blades.map((b, i) => (
          <g key={i}>
            <path d={`M${b.ax} ${b.ay} L${b.b0} 236 L${b.b1} 236 Z`} />
            <path d={`M${mirror(b.ax)} ${b.ay} L${mirror(b.b0)} 236 L${mirror(b.b1)} 236 Z`} />
          </g>
        ))}
        <path d="M20 236 H420 M40 246 H400" />
      </svg>
    )
  }
  return (
    <svg aria-hidden viewBox="0 0 440 260" className={className}>
      <defs>
        <linearGradient id="minar-a" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#b2a5db" /><stop offset="1" stopColor="#d6cdee" />
        </linearGradient>
        <linearGradient id="minar-b" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#c8bee7" /><stop offset="1" stopColor="#e6e0f5" />
        </linearGradient>
      </defs>
      {blades.map((b, i) => (
        <g key={i} fill="url(#minar-b)" stroke="#f6f2fc" strokeWidth="1.5" strokeLinejoin="round">
          <path d={`M${b.ax} ${b.ay} L${b.b0} 236 L${b.b1} 236 Z`} />
          <path d={`M${mirror(b.ax)} ${b.ay} L${mirror(b.b0)} 236 L${mirror(b.b1)} 236 Z`} />
        </g>
      ))}
      <path d="M220 4 L233 236 L207 236 Z" fill="url(#minar-a)" stroke="#f6f2fc" strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="18" y="236" width="404" height="9" rx="2" fill="#cdc4e8" />
      <rect x="40" y="245" width="360" height="7" rx="2" fill="#e6dff5" />
    </svg>
  )
}

/** Soft tree line, a grey-lavender band that fades into the page. */
export function Trees({ className = '' }: { className?: string }) {
  // Three overlapping canopy silhouettes with an irregular top edge, so it reads as a tree line, not shapes.
  const canopy = (base: number, a: number, b: number, c: number, ph: number) => {
    let d = `M0 90 L0 ${base}`
    for (let x = 0; x <= 1000; x += 6) {
      const y = base - (Math.abs(Math.sin(x / 17 + ph)) * a + Math.abs(Math.sin(x / 7.3 + ph * 2)) * b + Math.abs(Math.sin(x / 43 + ph)) * c)
      d += ` L${x} ${y.toFixed(1)}`
    }
    return d + ' L1000 90 Z'
  }
  return (
    <svg aria-hidden viewBox="0 0 1000 90" preserveAspectRatio="none" className={className}>
      <defs>
        <filter id="trees-blur"><feGaussianBlur stdDeviation="0.9" /></filter>
        <linearGradient id="trees-fade" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#a8a1c2" /><stop offset="1" stopColor="#d9d4ea" />
        </linearGradient>
      </defs>
      <g filter="url(#trees-blur)" fill="url(#trees-fade)">
        <path d={canopy(58, 16, 9, 14, 0.4)} opacity="0.5" />
        <path d={canopy(66, 12, 8, 11, 1.7)} opacity="0.6" />
        <path d={canopy(74, 8, 6, 8, 3.1)} opacity="0.75" />
      </g>
    </svg>
  )
}

/** The loop that wraps the bottom-left of the phone, drawn over the hand. */
export function RibbonFront({ className = '' }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 454 391" className={className} preserveAspectRatio="none">
      <defs>
        <linearGradient id="rib-f" x1="0" x2="1" y1="1" y2="0">
          <stop offset="0" stopColor="#89288F" stopOpacity="0.95" /><stop offset="0.55" stopColor="#8f4ce0" stopOpacity="0.85" /><stop offset="1" stopColor="#c8a8f2" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <path d="M58 300 C52 346 134 382 232 373 C302 366 336 326 348 236 C334 312 298 354 228 362 C148 370 86 340 58 300 Z" fill="url(#rib-f)" opacity="0.9" />
    </svg>
  )
}

/** Gold trophy for the awards strip. */
export function Trophy({ className = '' }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 150 232" className={className}>
      <defs>
        <linearGradient id="gold" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#c98a2a" /><stop offset="0.3" stopColor="#f8d877" /><stop offset="0.55" stopColor="#e5a73c" /><stop offset="1" stopColor="#b97b1f" />
        </linearGradient>
      </defs>
      <path d="M32 34 C4 34 2 80 40 90" fill="none" stroke="url(#gold)" strokeWidth="9" strokeLinecap="round" />
      <path d="M118 34 C146 34 148 80 110 90" fill="none" stroke="url(#gold)" strokeWidth="9" strokeLinecap="round" />
      <path d="M28 18 H122 C122 92 100 122 75 128 C50 122 28 92 28 18 Z" fill="url(#gold)" />
      <path d="M40 24 C42 78 54 104 68 116 C52 98 44 72 44 24 Z" fill="#fff" opacity="0.35" />
      <ellipse cx="75" cy="18" rx="47" ry="6" fill="#f6d36c" />
      <rect x="67" y="126" width="16" height="34" fill="url(#gold)" />
      <ellipse cx="75" cy="150" rx="17" ry="6" fill="#e5a73c" />
      <path d="M42 170 H108 L118 218 H32 Z" fill="#1a1824" />
      <rect x="54" y="188" width="42" height="14" rx="2" fill="url(#gold)" />
      <path d="M44 172 H106" stroke="#3a3748" strokeWidth="2" />
    </svg>
  )
}

/** Jatiya Sangsad Bhaban, line art: the central block with its great circle and triangle cut-outs, flanking prisms and the lake. */
export function SangsadLine({ className = '' }: { className?: string }) {
  const prism = (x: number) => (
    <g key={x}>
      <path d={`M${x} 150 V92 L${x + 22} 80 L${x + 44} 92 V150`} />
      <circle cx={x + 22} cy="112" r="9" />
      <path d={`M${x + 22} 80 V150`} />
    </g>
  )
  return (
    <svg aria-hidden viewBox="0 0 560 190" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round">
      {[40, 92, 144].map(prism)}
      {[372, 424, 476].map(prism)}
      <path d="M196 150 V52 L226 34 H334 L364 52 V150" />
      <path d="M196 52 H364" />
      <circle cx="280" cy="98" r="34" />
      <circle cx="280" cy="98" r="22" />
      <path d="M262 52 L280 66 L298 52" />
      <path d="M214 150 V118 L232 106 V150 M346 150 V118 L328 106 V150" />
      <path d="M20 150 H540" />
      <path d="M10 162 C60 154 90 170 140 162 S220 154 280 162 S380 170 420 162 S500 154 550 162" />
      <path d="M30 174 C80 168 110 182 160 174 S240 168 300 174 S400 182 440 174 S510 168 540 174" />
    </svg>
  )
}

/** Long, soft contour lines for the footer: river waves and a faint horizon. */
export function ContourLines({ className = '' }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 1440 120" preserveAspectRatio="none" className={className} fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M0 30 C180 8 320 52 520 30 S880 8 1080 30 S1320 52 1440 26" />
      <path d="M0 52 C200 30 340 74 540 52 S900 30 1100 52 S1340 74 1440 48" />
      <path d="M0 74 C220 52 360 96 560 74 S920 52 1120 74 S1360 96 1440 70" />
      <path d="M0 96 C240 74 380 118 580 96 S940 74 1140 96 S1380 118 1440 92" />
    </svg>
  )
}

/** Business scene: awning, shelves and counter in line art, a backdrop for the photo. */
export function ShopScene({ className = '' }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 520 440" className={className} fill="none" strokeLinejoin="round" strokeLinecap="round">
      <rect x="20" y="70" width="480" height="330" rx="10" fill="#dce9fb" />
      <path d="M20 70 H500 L470 18 H50 Z" fill="#89288F" fillOpacity=".14" stroke="#89288F" strokeWidth="2" strokeOpacity=".5" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <path key={i} d={`M${50 + i * 70} 18 L${20 + i * 80} 70`} stroke="#89288F" strokeOpacity=".35" strokeWidth="2" />
      ))}
      <path d="M20 70 Q56 96 100 70 Q140 96 180 70 Q220 96 260 70 Q300 96 340 70 Q380 96 420 70 Q460 96 500 70" stroke="#89288F" strokeWidth="2" strokeOpacity=".5" />
      <g stroke="#6d86b0" strokeWidth="2" strokeOpacity=".55">
        <path d="M44 150 H170 M44 200 H170 M44 250 H170" />
        <path d="M350 150 H476 M350 200 H476 M350 250 H476" />
        <rect x="56" y="118" width="22" height="32" rx="3" /><rect x="88" y="126" width="18" height="24" rx="3" /><rect x="118" y="112" width="26" height="38" rx="3" />
        <rect x="58" y="170" width="28" height="30" rx="3" /><rect x="98" y="164" width="22" height="36" rx="3" />
        <rect x="364" y="120" width="24" height="30" rx="3" /><rect x="398" y="112" width="28" height="38" rx="3" /><rect x="438" y="126" width="20" height="24" rx="3" />
        <rect x="370" y="168" width="22" height="32" rx="3" /><rect x="404" y="176" width="30" height="24" rx="3" />
      </g>
      <rect x="20" y="318" width="480" height="82" fill="#89288F" fillOpacity=".16" stroke="#89288F" strokeOpacity=".45" strokeWidth="2" />
      <path d="M20 318 H500" stroke="#89288F" strokeOpacity=".6" strokeWidth="3" />
    </svg>
  )
}

/** Three small offer illustrations in the brand's two inks. */
export function OfferArt({ kind, className = '' }: { kind: 'gift' | 'topup' | 'qr'; className?: string }) {
  const p = '#89288F'
  if (kind === 'gift') return (
    <svg aria-hidden viewBox="0 0 220 180" className={className} fill="none" strokeLinejoin="round" strokeLinecap="round">
      <ellipse cx="110" cy="164" rx="78" ry="9" fill="#89288F" fillOpacity=".12" />
      <rect x="44" y="82" width="132" height="76" rx="8" fill="#fff" stroke={p} strokeWidth="3" />
      <rect x="34" y="62" width="152" height="26" rx="7" fill="#f3e3f4" stroke={p} strokeWidth="3" />
      <path d="M110 62 V158" stroke={p} strokeWidth="3" />
      <path d="M110 62 C96 28 62 30 70 50 C76 62 100 62 110 62 C120 62 144 62 150 50 C158 30 124 28 110 62Z" fill="#f3e3f4" stroke={p} strokeWidth="3" />
      <circle cx="176" cy="40" r="5" fill={p} /><circle cx="42" cy="34" r="4" fill="#3b82d6" /><path d="M190 96 l6 -10 M200 108 l10 -4" stroke="#3b82d6" strokeWidth="3" />
    </svg>
  )
  if (kind === 'topup') return (
    <svg aria-hidden viewBox="0 0 220 180" className={className} fill="none" strokeLinejoin="round" strokeLinecap="round">
      <ellipse cx="110" cy="166" rx="64" ry="8" fill="#89288F" fillOpacity=".12" />
      <rect x="66" y="14" width="88" height="148" rx="14" fill="#fff" stroke={p} strokeWidth="3" />
      <rect x="76" y="32" width="68" height="104" rx="6" fill="#eaf2fc" />
      <path d="M92 76 h36 M110 58 v36" stroke={p} strokeWidth="6" />
      <circle cx="110" cy="149" r="4" fill={p} />
      <circle cx="170" cy="56" r="20" fill="#f3e3f4" stroke={p} strokeWidth="3" /><path d="M170 46 v20 M163 52 q7 -6 14 0 M163 62 q7 6 14 0" stroke={p} strokeWidth="2.6" />
      <path d="M44 70 h14 M36 86 h22 M46 102 h12" stroke="#3b82d6" strokeWidth="3.4" />
    </svg>
  )
  return (
    <svg aria-hidden viewBox="0 0 220 180" className={className} fill="none" strokeLinejoin="round" strokeLinecap="round">
      <ellipse cx="110" cy="166" rx="76" ry="8" fill="#89288F" fillOpacity=".12" />
      <path d="M40 66 L52 28 H168 L180 66 Z" fill="#f3e3f4" stroke={p} strokeWidth="3" />
      <path d="M40 66 q14 16 28 0 q14 16 28 0 q14 16 28 0 q14 16 28 0 q14 16 28 0" stroke={p} strokeWidth="3" />
      <rect x="48" y="78" width="124" height="80" rx="6" fill="#fff" stroke={p} strokeWidth="3" />
      <rect x="82" y="90" width="56" height="56" rx="5" fill="#eaf2fc" stroke="#3b82d6" strokeWidth="2.4" />
      <path d="M92 100 h14 v14 h-14z M114 100 h14 v14 h-14z M92 122 h14 v14 h-14z M114 124 h6 v6 h-6z M124 134 h4" stroke={p} strokeWidth="3" />
      <path d="M186 96 l8 -8 M192 112 h12" stroke="#3b82d6" strokeWidth="3.4" />
    </svg>
  )
}
