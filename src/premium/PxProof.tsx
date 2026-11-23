import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../motion'
import { useI18n } from '../i18n'
import { Split } from './Split'
import { BadgePercent, ShieldCheck } from 'lucide-react'

const word = 'px-display block font-extrabold uppercase leading-[0.86] tracking-[-0.05em]'

/**
 * Two statements, one pinned stage. "Most secure" rises letter by letter; on scroll it lifts away and a purple
 * circle opens from the centre, and "Country's lowest cash-out charge" lands in three sizes, LOWEST biggest.
 */
export function PxProof() {
  const { t } = useI18n()
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (!root.current) return
    const mm = gsap.matchMedia()
    mm.add('(min-width: 700px) and (prefers-reduced-motion: no-preference)', () => {
      const q = (s: string) => root.current!.querySelectorAll(s)
      gsap.set('.pb-layer', { clipPath: 'circle(0% at 50% 50%)' })

      // On arrival: the first statement builds itself.
      gsap.from('.pa .px-char', { yPercent: 115, rotate: 6, duration: 1.1, stagger: 0.035, ease: 'expo.out', scrollTrigger: { trigger: root.current, start: 'top 70%' } })
      gsap.from('.pa-icon', { scale: 0.6, rotate: -12, opacity: 0, duration: 1.6, ease: 'expo.out', scrollTrigger: { trigger: root.current, start: 'top 70%' } })

      const tl = gsap.timeline({
        defaults: { ease: 'power3.inOut' },
        scrollTrigger: { trigger: root.current, pin: true, scrub: 0.6, start: 'top top', end: '+=240%', anticipatePin: 1 },
      })
      tl.to({}, { duration: 0.4 }) // hold the first statement
        .to(q('.pa .px-char'), { yPercent: -115, rotate: -6, duration: 0.8, stagger: { each: 0.03, from: 'center' }, ease: 'power3.in' }, 0.4)
        .to('.pa-icon', { scale: 1.35, opacity: 0, duration: 0.9, ease: 'power3.in' }, 0.4)
        .to('.pb-layer', { clipPath: 'circle(150% at 50% 50%)', duration: 1.3, ease: 'power2.inOut' }, 0.7)
        .from(q('.pb-w .px-char'), { yPercent: 115, duration: 0.9, stagger: 0.025, ease: 'expo.out' }, 1.6)
        .from('.pb-big', { scale: 1.35, duration: 1.2, ease: 'expo.out' }, 1.6)
        .from('.pb-icon', { rotate: -25, scale: 0.7, opacity: 0, duration: 1.6, ease: 'power2.out' }, 1.3)
        .to({}, { duration: 0.7 }) // hold the second
    })
    return () => mm.revert()
  }, [])

  return (
    <section ref={root} aria-label="Rocket" className="relative z-[1] overflow-hidden bg-[var(--px-soft)] text-[var(--px-ink)] min-[700px]:h-screen">
      {/* Wide screens: the pinned stage */}
      <div className="hidden h-full min-[700px]:block">
        <div className="pa absolute inset-0 grid place-items-center text-center">
          <ShieldCheck aria-hidden strokeWidth={1} className="pa-icon pointer-events-none absolute left-1/2 top-1/2 h-[min(88vh,820px)] w-[min(88vh,820px)] -translate-x-1/2 -translate-y-1/2 text-[var(--px-purple)] opacity-[0.1]" />
          <p className="px-pop px-pop-ink text-[clamp(5rem,17vw,19rem)] text-[var(--px-purple)]">
            <Split as="span" className={word} text={{ en: 'Most', bn: 'সবচেয়ে' }} />
            <Split as="span" className={word} text={{ en: 'secure', bn: 'নিরাপদ' }} />
          </p>
        </div>

        <div className="pb-layer absolute inset-0 overflow-hidden bg-[var(--px-purple)] text-white">
          <BadgePercent aria-hidden strokeWidth={1} className="pb-icon pointer-events-none absolute -right-[4%] top-1/2 h-[min(96vh,900px)] w-[min(96vh,900px)] -translate-y-1/2 text-white opacity-[0.12]" />
          <p className="pb-w px-pop px-pop-deep absolute inset-0 flex flex-col justify-center px-[6vw]">
            <span className="block self-start text-[clamp(2.4rem,6.4vw,7rem)]"><Split as="span" className={word} text={{ en: "Country's", bn: 'দেশের' }} /></span>
            <span className="pb-big block self-center text-[clamp(6rem,21vw,23rem)] text-white"><Split as="span" className={word} text={{ en: 'lowest', bn: 'সবচেয়ে কম' }} /></span>
            <span className="block self-end text-[clamp(2.2rem,8vw,8.6rem)]"><Split as="span" className={word} text={{ en: 'cash-out charge', bn: 'ক্যাশ আউট চার্জ' }} /></span>
          </p>
        </div>
      </div>

      {/* Narrow screens: the same two statements, stacked */}
      <div className="min-[700px]:hidden">
        <p className="px-display wrap py-16 text-[clamp(3.4rem,17vw,6rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.045em] text-[var(--px-purple)]">{t({ en: 'Most secure', bn: 'সবচেয়ে নিরাপদ' })}</p>
        <p className="px-display bg-[var(--px-purple)] py-16 text-white">
          <span className="wrap block text-[clamp(1.6rem,7vw,2.6rem)] font-extrabold uppercase">{t({ en: "Country's", bn: 'দেশের' })}</span>
          <span className="wrap block text-[clamp(4rem,22vw,8rem)] font-extrabold uppercase leading-[0.9] text-white">{t({ en: 'lowest', bn: 'সবচেয়ে কম' })}</span>
          <span className="wrap block text-[clamp(1.8rem,9vw,3.4rem)] font-extrabold uppercase leading-[1]">{t({ en: 'cash-out charge', bn: 'ক্যাশ আউট চার্জ' })}</span>
        </p>
      </div>
    </section>
  )
}
