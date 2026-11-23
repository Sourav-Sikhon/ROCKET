import { useI18n } from '../i18n'
import { useReveal } from '../components/ui'
import { Trophy } from '../components/art'
import { awardCards } from './Awards'

// The four shown here use images and names from the original Rocket site (cropped to the object).
const shown = [2, 3, 4, 5].map((i) => awardCards[i])

/** "Awards received by Dutch-Bangla Bank": a lavender panel with a gold trophy and four awards. */
export function AwardStrip() {
  const { t } = useI18n()
  const ref = useReveal<HTMLElement>()
  return (
    <section ref={ref} aria-labelledby="award-h" className="pb-10 pt-4">
      <div className="wrap">
        <div className="reveal relative overflow-hidden rounded-[32px] bg-[linear-gradient(100deg,#f4f8fe_0%,#e3edfb_100%)] lg:grid lg:grid-cols-[250px_minmax(0,0.9fr)_minmax(0,1.9fr)] lg:items-center">
          <div aria-hidden className="relative mx-auto h-[220px] w-[260px] lg:h-full lg:min-h-[240px] lg:w-full">
            <svg viewBox="0 0 260 240" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
              <defs>
                <linearGradient id="aw-rib" x1="0" x2="1" y1="0.4" y2="0.6">
                  <stop offset="0" stopColor="#9d3fa4" /><stop offset="0.7" stopColor="#9a63e6" stopOpacity="0.8" /><stop offset="1" stopColor="#c9aef2" stopOpacity="0.35" />
                </linearGradient>
              </defs>
              <path d="M6 108 C40 168 118 178 258 108 C190 142 110 148 6 108 Z" fill="url(#aw-rib)" />
              <path d="M6 108 C26 90 60 88 96 98 C60 96 30 100 6 108 Z" fill="#89288F" opacity="0.9" />
            </svg>
            <Trophy className="absolute left-1/2 top-3 h-[200px] w-auto -translate-x-1/2" />
          </div>

          <div className="px-7 pb-2 pt-2 lg:px-2 lg:py-10">
            <p className="eyebrow flex items-center gap-3 text-[0.72rem] text-[#89288F]"><span aria-hidden className="h-[2px] w-6 bg-plum" />{t({ en: 'Awards & Recognition', bn: 'পুরস্কার ও স্বীকৃতি' })}</p>
            <h2 id="award-h" className="mt-4 text-[clamp(1.5rem,2vw,1.9rem)] font-extrabold leading-[1.2] tracking-[-0.02em] text-ink">{t({ en: 'Awards received by Dutch-Bangla Bank', bn: 'ডাচ্-বাংলা ব্যাংকের প্রাপ্ত পুরস্কার' })}</h2>
          </div>

          <ul className="grid grid-cols-2 gap-y-8 px-4 py-8 lg:grid-cols-4 lg:px-0 lg:py-10 lg:pr-6">
            {shown.map((a) => (
              <li key={a.img} className="flex flex-col items-center border-l border-[#cfdcef] px-3 text-center max-lg:odd:border-l-0">
                <span className="flex h-[76px] w-full items-center justify-center">
                  <img src={a.img} width={a.w} height={a.h} alt="" loading="lazy" className="max-h-[72px] w-auto max-w-[96px] object-contain mix-blend-multiply" />
                </span>
                <span className="mt-4 text-[0.85rem] font-bold leading-snug text-ink-2">{t(a.t)}</span>
                {a.d && <span className="mt-1 text-[0.78rem] leading-snug text-ink-3">{t(a.d)}</span>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
