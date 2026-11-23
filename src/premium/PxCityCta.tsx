import { useLayoutEffect, useRef } from 'react'
import { FileCheck2, KeyRound, Landmark, MessageSquareText } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { gsap, reducedMotion } from '../motion'
import { AppStoreButton, PlayButton } from '../components/ui'
import { useI18n } from '../i18n'
import type { L } from '../data/services'
import { RocketMark } from './RocketMark'

// Only assurances the official pages state; no third-party certifications are claimed.
const trust: { icon: LucideIcon; t: L }[] = [
  { icon: Landmark, t: { en: 'A real Dutch-Bangla Bank PLC account', bn: 'আসল ডাচ্-বাংলা ব্যাংক পিএলসি অ্যাকাউন্ট' } },
  { icon: KeyRound, t: { en: 'Your 4-digit PIN guards every account', bn: 'আপনার ৪ ডিজিটের পিন অ্যাকাউন্ট সুরক্ষিত রাখে' } },
  { icon: MessageSquareText, t: { en: 'An SMS confirms every transaction', bn: 'প্রতিটি লেনদেনে এসএমএস নিশ্চিতকরণ' } },
  { icon: FileCheck2, t: { en: 'Official agent lists are published', bn: 'অফিসিয়াল এজেন্ট তালিকা প্রকাশিত' } },
]

/**
 * Closing call to action. Rings spread out from the headline like a launch pulse, soft colour fields drift behind,
 * and the mark crosses the section on a curve. The Dhaka landmark line art lives in the footer only.
 * Everything plays once as it enters, so nothing is left hidden if you scroll fast.
 */
export function PxCityCta() {
  const { t } = useI18n()
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (!root.current || reducedMotion()) return
    const ctx = gsap.context(() => {
      const enter = { trigger: root.current, start: 'top 80%', once: true }
      gsap.timeline({ defaults: { ease: 'expo.out' }, scrollTrigger: enter })
        .from('.cta-line', { yPercent: 60, opacity: 0, filter: 'blur(12px)', duration: 0.9, stagger: 0.12 }, 0)
        .from('.cta-sub', { y: 20, opacity: 0, duration: 0.7 }, 0.3)
        .from('.cta-actions > *', { y: 22, opacity: 0, duration: 0.6, stagger: 0.08 }, 0.45)
        .from('.cta-trust > *', { y: 24, opacity: 0, duration: 0.6, stagger: 0.06 }, 0.6)
        .from('.cta-ring', { scale: 0.3, opacity: 0, duration: 1.8, stagger: 0.12 }, 0)

      // Scroll-linked: the mark crosses, the rings breathe, the colour fields drift.
      const st = { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 1 }
      gsap.fromTo('.cta-fly', { xPercent: -60, yPercent: 60, rotate: -28, scale: 0.7 }, { xPercent: 70, yPercent: -40, rotate: 14, scale: 1.15, ease: 'none', scrollTrigger: st })
      gsap.fromTo('.cta-rings', { scale: 0.85 }, { scale: 1.15, ease: 'none', scrollTrigger: st })
      gsap.fromTo('.cta-blob-a', { x: -80, y: 60 }, { x: 80, y: -60, ease: 'none', scrollTrigger: st })
      gsap.fromTo('.cta-blob-b', { x: 80, y: -40 }, { x: -80, y: 60, ease: 'none', scrollTrigger: st })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} aria-labelledby="px-cta-h" className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f6ecfa_30%,#ecdcf4_65%,#e3cdef_100%)] pb-20 pt-24 text-[var(--px-ink)] md:pt-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* Colour fields */}
        <div className="cta-blob-a absolute -left-[8%] top-[8%] h-[46vw] w-[46vw] rounded-full bg-[#c987d0] opacity-40 blur-[90px]" />
        <div className="cta-blob-b absolute -right-[10%] top-[28%] h-[42vw] w-[42vw] rounded-full bg-[#89288f] opacity-[0.22] blur-[100px]" />
        {/* Dot pattern, strongest at the edges */}
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(137,40,143,0.26) 1.5px, transparent 1.6px)', backgroundSize: '30px 30px', maskImage: 'radial-gradient(60% 55% at 50% 38%, transparent 25%, #000 100%)', WebkitMaskImage: 'radial-gradient(60% 55% at 50% 38%, transparent 25%, #000 100%)' }} />
        {/* Launch pulse: rings around the headline */}
        <div className="cta-rings absolute left-1/2 top-[34%] h-0 w-0">
          {[34, 54, 76, 100].map((vw, i) => (
            <span key={vw} className="cta-ring absolute rounded-full border border-[var(--px-purple)]" style={{ width: `${vw}vw`, height: `${vw}vw`, left: `${-vw / 2}vw`, top: `${-vw / 2}vw`, opacity: 0.2 - i * 0.035 }} />
          ))}
        </div>
        <RocketMark className="cta-fly absolute left-[8%] top-[22%] w-[min(30vw,380px)] text-[var(--px-purple)] opacity-[0.16]" />
      </div>

      <div className="wrap relative text-center">
        <h2 id="px-cta-h" className="text-[clamp(3.2rem,9vw,8.6rem)] font-extrabold">
          <span className="block overflow-hidden pb-[0.08em]"><span className="cta-line block">{t({ en: 'Ready for liftoff?', bn: 'যাত্রা শুরু করুন।' })}</span></span>
          <span className="block overflow-hidden pb-[0.08em]"><span className="cta-line block text-[var(--px-purple)]">{t({ en: 'Take Rocket along.', bn: 'রকেট সঙ্গে নিন।' })}</span></span>
        </h2>
        <p className="cta-sub mx-auto mt-7 max-w-[34rem] text-[1.15rem] font-medium leading-[1.5] text-[var(--px-ink)]/70">{t({ en: 'Get the app, and your Dutch-Bangla Bank account goes wherever you do.', bn: 'অ্যাপটি নিন, আপনার ডাচ্-বাংলা ব্যাংক অ্যাকাউন্ট আপনার সঙ্গেই চলবে।' })}</p>
        <div className="cta-actions mt-10 flex flex-wrap items-center justify-center gap-4">
          <PlayButton />
          <AppStoreButton />
        </div>

        <ul className="cta-trust mt-24 grid gap-3 text-left sm:grid-cols-2 lg:grid-cols-4" aria-label={t({ en: 'Security and trust', bn: 'নিরাপত্তা ও আস্থা' })}>
          {trust.map((x, i) => (
            <li key={i} className="flex items-center gap-4 rounded-[20px] border border-[var(--px-line)] bg-white/85 p-4 backdrop-blur-sm">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[var(--px-soft)] text-[var(--px-purple)]"><x.icon size={22} aria-hidden /></span>
              <span className="text-[0.95rem] font-bold leading-snug">{t(x.t)}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
