import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../motion'
import { Phone } from '../components/Phone'
import { useI18n } from '../i18n'
import type { AppScreen, L } from '../data/services'

type Scene = { n: string; word: L; bg: string; fg: string; chip: string; screen: AppScreen; title: L; line: L; tags: L[] }

// Everything here restates what the official pages and the Play listing say Rocket does.
const scenes: Scene[] = [
  { n: '01', word: { en: 'Bills', bn: 'বিল' }, bg: '#89288f', fg: '#ffffff', chip: 'var(--px-silver)', screen: 'home', title: { en: 'Bills, sorted.', bn: 'বিল, মেটানো।' },
    line: { en: 'Electricity, gas, water, internet and more, paid from one place.', bn: 'বিদ্যুৎ, গ্যাস, পানি, ইন্টারনেটসহ আরও অনেক বিল, এক জায়গা থেকে।' },
    tags: [{ en: 'Electricity', bn: 'বিদ্যুৎ' }, { en: 'Gas', bn: 'গ্যাস' }, { en: 'Water', bn: 'পানি' }, { en: 'Internet', bn: 'ইন্টারনেট' }] },
  { n: '02', word: { en: 'Campus', bn: 'ক্যাম্পাস' }, bg: 'var(--px-silver)', fg: '#1d0a33', chip: '#89288f', screen: 'add-money', title: { en: 'Campus, covered.', bn: 'ক্যাম্পাস, নিশ্চিন্ত।' },
    line: { en: 'Education is a Bill Pay category, so fees are a few taps away, wherever class takes you.', bn: 'বিল পে-তে শিক্ষা একটি ক্যাটাগরি, তাই ফি দেওয়া মাত্র কয়েকটি ট্যাপ।' },
    tags: [{ en: 'Education', bn: 'শিক্ষা' }, { en: 'Add money', bn: 'অ্যাড মানি' }] },
  { n: '03', word: { en: 'Life', bn: 'জীবন' }, bg: '#ff6f59', fg: '#1d0a33', chip: '#ffffff', screen: 'store-locator', title: { en: 'Life, on tap.', bn: 'জীবন, হাতের মুঠোয়।' },
    line: { en: 'Top up your phone, pay at shops with a scan, and find the nearest ATM or agent.', bn: 'ফোনে টপ-আপ, স্ক্যান করে দোকানে পেমেন্ট, আর কাছের এটিএম বা এজেন্ট খুঁজে নিন।' },
    tags: [{ en: 'Top-up', bn: 'টপ-আপ' }, { en: 'Merchant pay', bn: 'মার্চেন্ট পে' }, { en: 'ATM', bn: 'এটিএম' }] },
  { n: '04', word: { en: 'Money', bn: 'টাকা' }, bg: '#2f7de1', fg: '#ffffff', chip: '#ffffff', screen: 'cash-out', title: { en: 'Money, in view.', bn: 'টাকা, নজরে।' },
    line: { en: 'Check your balance and statement any time, and build a habit of saving.', bn: 'যেকোনো সময় ব্যালেন্স ও স্টেটমেন্ট দেখুন, গড়ে তুলুন সঞ্চয়ের অভ্যাস।' },
    tags: [{ en: 'Balance', bn: 'ব্যালেন্স' }, { en: 'Statement', bn: 'স্টেটমেন্ট' }] },
  { n: '05', word: { en: 'Scan', bn: 'স্ক্যান' }, bg: '#ffb020', fg: '#1d0a33', chip: '#ffffff', screen: 'my-qr', title: { en: 'Scan. Pay. Done.', bn: 'স্ক্যান। পে। শেষ।' },
    line: { en: 'Pay with a QR or show your own My Rocket QR, and send money to any Rocket number.', bn: 'QR দিয়ে পেমেন্ট করুন বা আপনার মাই রকেট QR দেখান, আর যেকোনো রকেট নম্বরে টাকা পাঠান।' },
    tags: [{ en: 'Scan QR', bn: 'QR স্ক্যান' }, { en: 'My Rocket QR', bn: 'মাই রকেট QR' }, { en: 'Send money', bn: 'সেন্ড মানি' }] },
]

/**
 * "How Rocket changes everyday life": the section pins and the page slides sideways, one full-bleed
 * colour panel per scene. Numbers, phones and chips drift at different speeds for depth.
 * On narrow screens the scenes stack as colour cards.
 */
export function PxEveryday() {
  const { t } = useI18n()
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (!root.current) return
    const mm = gsap.matchMedia()
    mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      const track = root.current!.querySelector<HTMLElement>('.lf-track')!
      const bar = root.current!.querySelector<HTMLElement>('.lf-bar')!
      const dots = gsap.utils.toArray<HTMLElement>('.lf-dot')
      const panels = gsap.utils.toArray<HTMLElement>('.lf-panel')
      const dist = () => track.scrollWidth - window.innerWidth
      const tween = gsap.to(track, {
        x: () => -dist(), ease: 'none',
        scrollTrigger: {
          trigger: root.current, pin: true, scrub: 0.6, start: 'top top', end: () => `+=${dist() * 1.1}`, anticipatePin: 1, invalidateOnRefresh: true,
          onUpdate: (self) => {
            bar.style.transform = `scaleX(${self.progress})`
            const i = Math.round(self.progress * (panels.length - 1))
            dots.forEach((d, k) => d.toggleAttribute('data-on', k === i))
          },
        },
      })
      panels.forEach((p) => {
        const trigger = { trigger: p, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true }
        gsap.fromTo(p.querySelector('.lf-w1'), { xPercent: 16 }, { xPercent: -16, ease: 'none', scrollTrigger: trigger })
        gsap.fromTo(p.querySelector('.lf-w2'), { xPercent: -16 }, { xPercent: 16, ease: 'none', scrollTrigger: trigger })
        gsap.fromTo(p.querySelector('.lf-phone'), { xPercent: 22, rotate: 5 }, { xPercent: -10, rotate: -2, ease: 'none', scrollTrigger: trigger })
        gsap.fromTo(p.querySelectorAll('.lf-copy > *'), { xPercent: 16, opacity: 0.2 }, { xPercent: 0, opacity: 1, stagger: 0.05, ease: 'none', scrollTrigger: { ...trigger, end: 'center center' } })
      })
    })
    mm.add('(max-width: 899px), (prefers-reduced-motion: reduce)', () => {
      gsap.utils.toArray<HTMLElement>('.lf-card').forEach((el) => {
        gsap.from(el, { y: 40, opacity: 0, duration: 0.7, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 90%' } })
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <section ref={root} aria-labelledby="px-lf-h" className="relative overflow-hidden bg-white text-[var(--px-ink)] max-[899px]:py-16 min-[900px]:h-screen">
      {/* Wide screens: one horizontal track, pinned while it slides */}
      <div className="lf-track hidden h-full w-max min-[900px]:flex">
        <div className="lf-panel flex h-full w-screen shrink-0 items-center px-[max(24px,6vw)] pt-[72px]">
          <div className="max-w-[60rem]">
            <h2 id="px-lf-h" className="text-[clamp(3rem,7vw,7rem)] font-extrabold leading-[0.95]">{t({ en: 'How Rocket changes everyday life.', bn: 'রকেট কীভাবে দৈনন্দিন জীবন বদলে দেয়।' })}</h2>
            <p className="mt-8 inline-flex items-center gap-3 text-[1.05rem] font-bold text-[var(--px-purple)]">
              {t({ en: 'Keep scrolling', bn: 'স্ক্রল করতে থাকুন' })}
              <svg aria-hidden width="48" height="14" viewBox="0 0 48 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 7h45M40 1l6 6-6 6" /></svg>
            </p>
          </div>
        </div>

        {scenes.map((s) => (
          <div key={s.n} className="lf-panel relative flex h-full w-screen shrink-0 items-center overflow-hidden px-[max(24px,6vw)] pt-[72px]" style={{ background: s.bg, color: s.fg }}>
            {/* Pattern: a dot grid, a soft glow, and giant faded words that drift in opposite directions */}
            <div aria-hidden className="pointer-events-none absolute inset-0" style={{ backgroundImage: `radial-gradient(${s.fg}30 1.5px, transparent 1.6px)`, backgroundSize: '28px 28px', maskImage: 'linear-gradient(100deg, transparent 15%, #000 75%)', WebkitMaskImage: 'linear-gradient(100deg, transparent 15%, #000 75%)' }} />
            <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(60% 70% at 78% 62%, ${s.fg}30, transparent 70%)` }} />
            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[6%] select-none uppercase leading-[0.82] tracking-[-0.05em]" style={{ color: s.fg, opacity: 0.13 }}>
              <span className="lf-w1 block whitespace-nowrap text-[clamp(10rem,24vw,26rem)] font-extrabold">{t(s.word)} {t(s.word)}</span>
              <span className="lf-w2 block whitespace-nowrap pl-[18vw] text-[clamp(10rem,24vw,26rem)] font-extrabold">{t(s.word)} {t(s.word)}</span>
            </div>
            <div className="lf-copy relative z-[1] max-w-[34rem]">
              <h3 className="text-[clamp(3rem,6.4vw,6rem)] font-extrabold leading-[0.98]">{t(s.title)}</h3>
              <p className="mt-6 max-w-[28rem] text-[clamp(1.05rem,1.4vw,1.3rem)] font-medium leading-[1.5]" style={{ opacity: 0.9 }}>{t(s.line)}</p>
              <ul className="mt-8 flex flex-wrap gap-2.5">
                {s.tags.map((g, i) => <li key={i} className="rounded-full px-5 py-2.5 text-[0.95rem] font-bold" style={{ background: s.chip, color: s.chip === '#ffffff' || s.chip === 'var(--px-silver)' ? '#1d0a33' : '#fff' }}>{t(g)}</li>)}
              </ul>
            </div>
            <div aria-hidden className="lf-phone absolute bottom-[-14%] right-[10%] w-[min(25vw,330px)] drop-shadow-[0_40px_50px_rgba(29,10,51,0.3)]"><Phone screen={s.screen} className="w-full" /></div>
          </div>
        ))}
      </div>

      {/* Progress along the bottom edge */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] hidden h-[6px] bg-[var(--px-line)] min-[900px]:block">
        <span className="lf-bar absolute inset-0 origin-left scale-x-0 bg-[var(--px-ink)]" />
      </div>
      <div aria-hidden className="pointer-events-none absolute bottom-6 left-1/2 z-[2] hidden -translate-x-1/2 gap-2 min-[900px]:flex">
        {[0, ...scenes.map((_, i) => i + 1)].map((k) => <span key={k} className="lf-dot h-2 w-2 rounded-full bg-[var(--px-ink)]/25 transition-[width,background-color] duration-300 data-[on]:w-7 data-[on]:bg-[var(--px-ink)]" ref={(el) => { if (el && k === 0) el.setAttribute('data-on', '') }} />)}
      </div>

      {/* Narrow screens: colour cards */}
      <div className="wrap min-[900px]:hidden">
        <h2 className="text-[clamp(2.4rem,9vw,3.4rem)] font-extrabold">{t({ en: 'How Rocket changes everyday life.', bn: 'রকেট কীভাবে দৈনন্দিন জীবন বদলে দেয়।' })}</h2>
        <ul className="mt-8 grid gap-4">
          {scenes.map((s) => (
            <li key={s.n} className="lf-card relative overflow-hidden rounded-[26px] p-6" style={{ background: s.bg, color: s.fg }}>
              <h3 className="text-[1.9rem] font-extrabold">{t(s.title)}</h3>
              <p className="mt-2 max-w-[16rem] text-[0.98rem] font-medium leading-[1.5]" style={{ opacity: 0.9 }}>{t(s.line)}</p>
              <ul className="mt-4 flex max-w-[60%] flex-wrap gap-2">{s.tags.map((g, i) => <li key={i} className="rounded-full px-3 py-1.5 text-[0.8rem] font-bold" style={{ background: s.chip, color: s.chip === '#89288f' ? '#fff' : '#1d0a33' }}>{t(g)}</li>)}</ul>
              <div aria-hidden className="absolute -bottom-10 right-4 w-[120px]"><Phone screen={s.screen} className="w-full" /></div>
              <div className="h-24" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
