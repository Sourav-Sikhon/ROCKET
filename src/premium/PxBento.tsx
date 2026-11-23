import { useLayoutEffect, useRef } from 'react'
import { GraduationCap, MapPin, PiggyBank, QrCode } from 'lucide-react'
import { gsap, reducedMotion } from '../motion'
import { Phone } from '../components/Phone'
import { useI18n } from '../i18n'
import type { L } from '../data/services'

// Drop real clips here (public/media/*.mp4) to turn a tile into live video, e.g. { bills: { src: '/media/bills.mp4', poster: '/media/bills.jpg' } }.
// No video files exist in the project yet, so every tile falls back to its illustrated state.
const media: Record<string, { src: string; poster?: string }> = {}

function Clip({ id }: { id: string }) {
  const m = media[id]
  if (!m) return null
  return <video aria-hidden className="absolute inset-0 -z-10 h-full w-full object-cover" src={m.src} poster={m.poster} autoPlay muted loop playsInline preload="metadata" />
}

const bills: L[] = [
  { en: 'Electricity', bn: 'বিদ্যুৎ' }, { en: 'Gas', bn: 'গ্যাস' }, { en: 'Water', bn: 'পানি' }, { en: 'Internet', bn: 'ইন্টারনেট' },
  { en: 'Education', bn: 'শিক্ষা' }, { en: 'Govt. Fee', bn: 'সরকারি ফি' }, { en: 'Insurance', bn: 'বিমা' },
]
const nearby: L[] = [{ en: 'Branch', bn: 'শাখা' }, { en: 'ATM', bn: 'এটিএম' }, { en: 'Fast Track', bn: 'ফাস্ট ট্র্যাক' }, { en: 'Merchant', bn: 'মার্চেন্ট' }]

/** Bento of everyday media. Tiles wipe in with a clip-path while their contents settle from a larger scale. */
export function PxBento() {
  const { t } = useI18n()
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (!root.current || reducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.bt-tile').forEach((el, i) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 90%' }, delay: (i % 3) * 0.08 })
        tl.fromTo(el, { clipPath: 'inset(100% 0% 0% 0% round 28px)' }, { clipPath: 'inset(0% 0% 0% 0% round 28px)', duration: 1.1, ease: 'expo.inOut' })
          .fromTo(el.querySelector('.bt-in'), { scale: 1.25, yPercent: 8 }, { scale: 1, yPercent: 0, duration: 1.3, ease: 'expo.out' }, 0.1)
      })
      gsap.from('.bt-head > *', { y: 40, opacity: 0, duration: 0.9, stagger: 0.1, ease: 'expo.out', scrollTrigger: { trigger: '.bt-head', start: 'top 85%' } })
    }, root)
    return () => ctx.revert()
  }, [])

  const tile = 'bt-tile relative isolate overflow-hidden rounded-[28px]'
  return (
    <section ref={root} aria-labelledby="px-bt-h" className="relative bg-[var(--px-soft)] py-20 text-[var(--px-ink)] md:py-28">
      <div className="wrap">
        <div className="bt-head flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 id="px-bt-h" className="max-w-[12ch] text-[clamp(2.8rem,6.4vw,6rem)] font-extrabold">{t({ en: 'Made for how you move.', bn: 'আপনার চলার মতো করে।' })}</h2>
          <p className="max-w-[26rem] text-[1.05rem] font-medium leading-[1.5] text-[var(--px-ink)]/70">{t({ en: 'Bills, campus, shops and savings, all in motion.', bn: 'বিল, ক্যাম্পাস, দোকান ও সঞ্চয়, সবকিছু চলমান।' })}</p>
        </div>

        <div className="mt-12 grid auto-rows-[200px] grid-cols-2 gap-4 [grid-auto-flow:dense] md:auto-rows-[220px] lg:grid-cols-4">
          {/* Bills */}
          <article className={`${tile} col-span-2 row-span-2 bg-[var(--px-purple)] p-7 text-white md:p-9`}>
            <Clip id="bills" />
            <div className="bt-in flex h-full flex-col justify-between">
              <h3 className="text-[clamp(2rem,4vw,3.6rem)] font-extrabold">{t({ en: 'Pay every bill.', bn: 'সব বিল মেটান।' })}</h3>
              <ul className="flex flex-wrap gap-2.5">
                {bills.map((b, i) => (
                  <li key={i} className="px-bob rounded-full bg-white/20 px-4 py-2.5 text-[0.95rem] font-bold backdrop-blur-sm" style={{ ['--r' as string]: `${(i % 3 - 1) * 2}deg`, animationDelay: `${i * 0.35}s` }}>{t(b)}</li>
                ))}
              </ul>
            </div>
          </article>

          {/* Scan */}
          <article className={`${tile} bg-[var(--px-red)] p-6 text-white`}>
            <Clip id="scan" />
            <div className="bt-in flex h-full flex-col justify-between">
              <QrCode size={52} strokeWidth={1.6} aria-hidden />
              <h3 className="text-[clamp(1.6rem,2.4vw,2.2rem)] font-extrabold">{t({ en: 'Scan. Pay. Done.', bn: 'স্ক্যান। পে। শেষ।' })}</h3>
            </div>
          </article>

          {/* Add money phone */}
          <article className={`${tile} row-span-2 bg-[var(--px-blue)] p-6 text-white`}>
            <Clip id="add" />
            <div className="bt-in flex h-full flex-col">
              <h3 className="text-[clamp(1.6rem,2.4vw,2.2rem)] font-extrabold">{t({ en: 'Add money, your way.', bn: 'নিজের মতো অ্যাড মানি।' })}</h3>
              <div aria-hidden className="mx-auto mt-5 w-[min(150px,70%)] translate-y-[4%]"><Phone screen="add-money" className="w-full" /></div>
            </div>
          </article>

          {/* Saving */}
          <article className={`${tile} bg-[var(--px-green-l)] p-6 text-[var(--px-green-d)]`}>
            <Clip id="save" />
            <div className="bt-in flex h-full flex-col justify-between">
              <PiggyBank size={52} strokeWidth={1.6} aria-hidden className="text-[var(--px-green)]" />
              <h3 className="text-[clamp(1.6rem,2.4vw,2.2rem)] font-extrabold">{t({ en: 'Build a saving habit.', bn: 'সঞ্চয়ের অভ্যাস গড়ুন।' })}</h3>
            </div>
          </article>

          {/* Campus */}
          <article className={`${tile} col-span-2 bg-white p-7`}>
            <Clip id="campus" />
            <div className="bt-in flex h-full items-end justify-between gap-4">
              <div>
                <h3 className="text-[clamp(1.8rem,3vw,2.8rem)] font-extrabold">{t({ en: 'Built for campus life.', bn: 'ক্যাম্পাস জীবনের জন্য।' })}</h3>
                <p className="mt-2 max-w-[22rem] text-[0.98rem] font-medium text-[var(--px-ink)]/70">{t({ en: 'Pay education bills right from the app.', bn: 'অ্যাপ থেকেই শিক্ষা-সংক্রান্ত বিল দিন।' })}</p>
              </div>
              <GraduationCap size={84} strokeWidth={1.3} aria-hidden className="shrink-0 text-[var(--px-blue)]" />
            </div>
          </article>

          {/* Nearby */}
          <article className={`${tile} col-span-2 bg-[var(--px-black)] p-7 text-[var(--px-ink)]`}>
            <Clip id="near" />
            <div className="bt-in flex h-full flex-col justify-between">
              <div className="flex items-center gap-3"><MapPin size={30} aria-hidden className="text-[var(--px-purple)]" /><h3 className="text-[clamp(1.8rem,3vw,2.8rem)] font-extrabold">{t({ en: 'Find it nearby.', bn: 'কাছেই খুঁজুন।' })}</h3></div>
              <ul className="flex flex-wrap gap-2.5">
                {nearby.map((n, i) => <li key={i} className="rounded-full border border-[var(--px-ink)]/25 px-4 py-2 text-[0.92rem] font-bold">{t(n)}</li>)}
              </ul>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
