import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { gsap, reducedMotion } from '../motion'
import { Icon } from '../components/Icon'
import { Phone } from '../components/Phone'
import { useI18n } from '../i18n'
import { services } from '../data/services'

// One colourway per card: [background, text, chip].
const ways: [string, string, string][] = [
  ['#89288f', '#ffffff', '#c5c8d2'],
  ['#c5c8d2', '#1d0a33', '#89288f'],
  ['#ff6f59', '#1d0a33', '#ffffff'],
  ['#2f7de1', '#ffffff', '#ffffff'],
  ['#ffb020', '#1d0a33', '#ffffff'],
  ['#e9d8f2', '#1d0a33', '#89288f'],
  ['#8fe3c0', '#1d0a33', '#ffffff'],
  ['#ffc2e2', '#1d0a33', '#89288f'],
]
const cards = services.filter((s) => s.featured)

/**
 * Every main service as its own card. The cards stack: each one sticks as the next slides up over it,
 * and the ones underneath shrink back a little, so the page reads like a deck being dealt.
 */
export function PxStack() {
  const { t } = useI18n()
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (!root.current || reducedMotion()) return
    const ctx = gsap.context(() => {
      const els = gsap.utils.toArray<HTMLElement>('.stk-card')
      els.forEach((el, i) => {
        if (i === els.length - 1) return
        // Shrink and dim with a filter, never with opacity: the card underneath must stay fully solid.
        gsap.fromTo(el, { scale: 1, filter: 'brightness(1)' }, { scale: 0.94, filter: 'brightness(0.88)', ease: 'none', scrollTrigger: { trigger: els[i + 1], start: 'top 80%', end: 'top 14%', scrub: true } })
      })
      els.forEach((el) => {
        gsap.from(el.querySelectorAll('.stk-in > *'), { y: 30, opacity: 0, duration: 0.8, stagger: 0.07, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 75%' } })
        gsap.from(el.querySelector('.stk-phone'), { yPercent: 14, rotate: 4, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 75%' } })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} aria-labelledby="px-stk-h" className="bg-white py-20 md:py-28">
      <div className="wrap">
        <div className="max-w-[46rem]">
          <h2 id="px-stk-h" className="text-[clamp(2.6rem,5.6vw,5.2rem)] font-extrabold text-[var(--px-ink)]">{t({ en: 'Everything Rocket does.', bn: 'রকেট যা যা করে।' })}</h2>
          <p className="mt-5 max-w-[34rem] text-[1.1rem] font-medium leading-[1.55] text-[var(--px-ink)]/70">{t({ en: 'One service at a time. Scroll, and each card lands on the last.', bn: 'একবারে একটি সেবা। স্ক্রল করুন, প্রতিটি কার্ড আগেরটির ওপর এসে বসবে।' })}</p>
        </div>

        <ol className="mt-12 pb-6">
          {cards.map((s, i) => {
            const [bg, fg, chip] = ways[i % ways.length]
            return (
              <li key={s.slug} className="stk-card sticky mb-6 origin-top overflow-hidden rounded-[32px] md:mb-10" style={{ top: `${104 + i * 14}px`, background: bg, color: fg }}>
                <div className="grid min-h-[min(520px,72svh)] items-center gap-6 p-7 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:p-12">
                  <div className="stk-in relative z-[1]">
                    <span className="grid h-16 w-16 place-items-center rounded-2xl" style={{ background: chip, color: chip === '#ffffff' || chip === '#c5c8d2' ? '#1d0a33' : '#fff' }}><Icon name={s.icon} size={30} /></span>
                    <h3 className="mt-8 text-[clamp(2.2rem,5vw,4.8rem)] font-extrabold leading-[0.98]">{t(s.name)}</h3>
                    <p className="mt-4 max-w-[30rem] text-[clamp(1.02rem,1.3vw,1.25rem)] font-medium leading-[1.5]" style={{ opacity: 0.9 }}>{t(s.short)}</p>
                    <Link to={`/services/${s.slug}`} className="group mt-8 inline-flex min-h-[48px] items-center gap-2 rounded-full px-6 text-[0.98rem] font-bold" style={{ background: fg, color: bg }}>
                      {t({ en: 'How it works', bn: 'কীভাবে কাজ করে' })}<ArrowRight size={18} aria-hidden className="transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                  <div aria-hidden className="relative hidden h-full min-h-[360px] md:block">
                    <div className="stk-phone absolute left-1/2 top-[8%] w-[min(250px,70%)] -translate-x-1/2 drop-shadow-[0_30px_40px_rgba(29,10,51,0.3)]"><Phone screen={s.screen} className="w-full" /></div>
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
        <Link to="/services" className="group inline-flex items-center gap-2 text-[1.05rem] font-bold text-[var(--px-purple)]">
          {t({ en: 'See every service', bn: 'সব সেবা দেখুন' })}<ArrowRight size={18} aria-hidden className="transition-transform duration-300 group-hover:translate-x-1.5" />
        </Link>
      </div>
    </section>
  )
}
