import { useEffect, useState } from 'react'
import { appScreens, type AppScreen } from '../data/services'
import { useI18n } from '../i18n'

/**
 * Device frame around a real Rocket app screenshot (from the official
 * Google Play listing). Screens crossfade and rise along the line when
 * `screen` changes.
 */
export function Phone({ screen, className = '', priority = false, tilt = 0, light = false }: { screen: AppScreen; className?: string; priority?: boolean; tilt?: number; light?: boolean }) {
  const { t } = useI18n()
  const [shown, setShown] = useState<AppScreen[]>([screen])
  useEffect(() => {
    setShown((prev) => (prev[prev.length - 1] === screen ? prev : [...prev.slice(-1), screen]))
  }, [screen])

  return (
    <div
      className={`relative aspect-[9/19] ${light ? "rounded-[0.95rem]" : "rounded-[1.5rem]"} ${light ? "bg-white p-[3px] ring-1 ring-[rgba(29,10,51,0.08)]" : "bg-[#141016] p-[7px]"} shadow-[0_40px_80px_-30px_rgba(74,17,80,0.55),0_18px_30px_-18px_rgba(27,19,32,0.5)] ${className}`}
      style={tilt ? { transform: `rotate(${tilt}deg)` } : undefined}
    >
      <div className={`relative h-full w-full overflow-hidden ${light ? "rounded-[0.8rem]" : "rounded-[1.05rem]"} bg-white`}>
        {shown.map((s, i) => {
          const last = i === shown.length - 1
          return (
            <img
              key={s}
              src={appScreens[s].src}
              alt={last ? t(appScreens[s].alt) : ''}
              aria-hidden={!last}
              loading={priority ? 'eager' : 'lazy'}
              decoding="async"
              className={`absolute inset-0 h-full w-full object-cover object-top ${shown.length > 1 ? (last ? 'phone-in' : 'phone-out') : ''}`}
            />
          )
        })}
      </div>
    </div>
  )
}
