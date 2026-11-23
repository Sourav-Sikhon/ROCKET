import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react'
import { services } from '../data/services'
import { Icon } from '../components/Icon'
import { Phone } from '../components/Phone'
import { useI18n } from '../i18n'
import { useReveal } from '../components/ui'
import { reducedMotion } from '../motion'

const N = services.length
const GAP = 20

/** Cards in view: 4 on wide desktop, 3 on laptop, 2 on tablet, 1 on phones. */
function useVisible() {
  const get = () => (typeof window === 'undefined' ? 4 : window.innerWidth >= 1280 ? 4 : window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1)
  const [v, setV] = useState(get)
  useEffect(() => {
    const on = () => setV(get())
    window.addEventListener('resize', on)
    return () => window.removeEventListener('resize', on)
  }, [])
  return v
}

/**
 * Home product block: each service is one card (its full app screen, then icon, title and subtitle).
 * The row slides by itself, pauses on hover, focus or the pause button, and has Previous / Next at the bottom right.
 */
export function Products() {
  const { t } = useI18n()
  const ref = useReveal<HTMLElement>()
  const v = useVisible()
  const last = N - v
  const [index, setIndex] = useState(0)
  const [hold, setHold] = useState(false)
  const [paused, setPaused] = useState(() => reducedMotion())
  const at = Math.min(index, last)

  useEffect(() => {
    if (paused || hold) return
    const id = window.setInterval(() => setIndex((i) => (Math.min(i, last) >= last ? 0 : Math.min(i, last) + 1)), 4500)
    return () => window.clearInterval(id)
  }, [paused, hold, last])

  const go = (d: number) => setIndex(at + d < 0 ? last : at + d > last ? 0 : at + d)
  const sq = 'grid h-12 w-12 place-items-center rounded-2xl border border-[#d5e2f4] bg-white text-plum transition-[background-color,color,transform] duration-200 hover:bg-plum hover:text-white active:scale-95'

  return (
    <section ref={ref} aria-labelledby="prod-h" className="bg-[linear-gradient(180deg,#fff_0%,#eaf2fc_22%,#eaf2fc_100%)] pb-16 pt-14 md:pb-20 md:pt-20">
      <div className="wrap">
        <div className="reveal max-w-[44rem]">
          <h2 id="prod-h" className="text-[clamp(1.9rem,3vw,2.7rem)] font-extrabold leading-[1.15] tracking-[-0.02em] text-ink">
            {t({ en: 'One app for everyday banking', bn: 'প্রতিদিনের ব্যাংকিং, এক অ্যাপে' })}
          </h2>
          <p className="font-display mt-3 text-ink-2">
            {t({ en: 'Send, withdraw, add money and pay: backed by a real Dutch-Bangla Bank account.', bn: 'টাকা পাঠান, তুলুন, যোগ করুন ও পেমেন্ট করুন: পেছনে আছে আসল ডাচ্-বাংলা ব্যাংক অ্যাকাউন্ট।' })}
          </p>
        </div>

        <div
          role="group"
          aria-roledescription="carousel"
          aria-label={t({ en: 'Rocket services', bn: 'রকেটের সেবা' })}
          onMouseEnter={() => setHold(true)}
          onMouseLeave={() => setHold(false)}
          onFocus={() => setHold(true)}
          onBlur={() => setHold(false)}
          className="reveal mt-10"
          data-d="60"
        >
          <div className="-mx-2 overflow-x-clip px-2 pb-6 pt-3">
            <ul
              className="flex transition-transform duration-[800ms] ease-[var(--ease-out-expo)]"
              style={{ gap: GAP, transform: `translateX(calc(${-at} * (100% + ${GAP}px) / ${v}))` }}
              aria-live={paused || hold ? 'polite' : 'off'}
            >
              {services.map((s, i) => {
                const shown = i >= at && i < at + v
                return (
                  <li key={s.slug} className="flex-none" style={{ width: `calc((100% - ${GAP * (v - 1)}px) / ${v})` }} aria-hidden={!shown}>
                    <article className="group flex h-full flex-col overflow-hidden rounded-[18px] border border-[#d9e5f5] bg-white transition-[transform,border-color,box-shadow] duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:border-plum hover:shadow-[0_26px_40px_-26px_rgba(137,40,143,0.5)]">
                      <span aria-hidden className="relative flex shrink-0 justify-center overflow-hidden bg-[linear-gradient(180deg,#e3edfb,#d3e3f8)] px-4 pb-6 pt-7">
                        <span className="absolute -left-8 -top-10 h-40 w-40 rounded-full bg-white/45" />
                        <span className="relative block w-[164px] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-1.5">
                          <Phone screen={s.screen} className="w-full" />
                        </span>
                      </span>
                      <div className="flex flex-1 flex-col px-6 pb-5 pt-5">
                        <div className="flex items-center gap-3">
                          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-plum text-white transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105"><Icon name={s.icon} size={22} /></span>
                          <h3 className="font-display text-[1.2rem] font-semibold leading-snug text-ink">{t(s.name)}</h3>
                        </div>
                        <p className="mt-3 line-clamp-3 text-[0.92rem] leading-[1.6] text-ink-2">{t(s.short)}</p>
                        <Link to={`/services/${s.slug}`} tabIndex={shown ? 0 : -1} className="mt-auto inline-flex items-center gap-2 pt-4 text-[0.9rem] font-bold text-plum">
                          {t({ en: 'Learn more', bn: 'আরও জানুন' })}
                          <ArrowRight size={16} aria-hidden className="transition-transform duration-300 group-hover:translate-x-1.5" />
                        </Link>
                      </div>
                    </article>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="mt-2 flex items-center justify-between gap-4">
            <div className="flex items-center gap-1.5" aria-hidden>
              {Array.from({ length: last + 1 }, (_, n) => (
                <button key={n} type="button" tabIndex={-1} onClick={() => setIndex(n)} className="grid h-6 place-items-center">
                  <span className={`block h-1.5 rounded-sm bg-plum transition-[width,opacity] duration-300 ${n === at ? 'w-7 opacity-100' : 'w-2 opacity-30'}`} />
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => setPaused((p) => !p)} aria-pressed={paused} aria-label={paused ? t({ en: 'Start automatic sliding', bn: 'স্বয়ংক্রিয় স্লাইড চালু করুন' }) : t({ en: 'Pause automatic sliding', bn: 'স্বয়ংক্রিয় স্লাইড থামান' })} className={sq}>
                {paused ? <Play size={18} aria-hidden /> : <Pause size={18} aria-hidden />}
              </button>
              <button type="button" onClick={() => go(-1)} aria-label={t({ en: 'Previous service', bn: 'আগের সেবা' })} className={sq}><ArrowLeft size={20} aria-hidden /></button>
              <button type="button" onClick={() => go(1)} aria-label={t({ en: 'Next service', bn: 'পরের সেবা' })} className={sq}><ArrowRight size={20} aria-hidden /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
