import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Banknote, FileText, PhoneCall, Send } from 'lucide-react'
import { gsap, reducedMotion } from '../motion'
import { useI18n } from '../i18n'
import { Split } from './Split'
import { RocketMark } from './RocketMark'
import { PlayGlyph } from '../components/Icon'

/**
 * Hero: giant faded words are the headline, with the hand and phone overlapping them.
 * Words rise out of a mask, drift apart on scroll, and the hand follows the pointer at its own depth.
 */
export function PxHero() {
  const { t } = useI18n()
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (!root.current || reducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'expo.out' } })
        .from('.hero-mark', { scale: 0.75, opacity: 0, rotate: -12, duration: 1.4 }, 0)
        .from('.hero-line .px-char', { yPercent: 110, opacity: 0, duration: 1, stagger: 0.03 }, 0.05)
        .from('.hero-hand', { yPercent: 10, xPercent: 6, opacity: 0, duration: 1.3 }, 0.15)
        .from('.hero-info > *, .hero-pill', { y: 22, opacity: 0, duration: 0.8, stagger: 0.07 }, 0.5)
        .from('.hero-chip', { scale: 0.5, opacity: 0, duration: 0.9, stagger: 0.1, ease: 'back.out(1.7)' }, 0.7)

      // Scroll: the three lines drift apart sideways, the hand lifts away a little slower than the page.
      const st = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 1 }
      gsap.to('.hero-l1', { xPercent: -10, ease: 'none', scrollTrigger: st })
      gsap.to('.hero-l2', { xPercent: 12, ease: 'none', scrollTrigger: st })
      gsap.to('.hero-l3', { xPercent: -6, ease: 'none', scrollTrigger: st })
      gsap.to('.hero-mark', { rotate: '+=10', scale: 1.1, ease: 'none', scrollTrigger: st })
      gsap.to('.hero-hand', { yPercent: -6, ease: 'none', scrollTrigger: st })

      // Pointer depth: the words and the hand move in opposite directions.
      const wx = gsap.quickTo('.hero-words', 'x', { duration: 1.1, ease: 'power3.out' })
      const hx = gsap.quickTo('.hero-depth', 'x', { duration: 0.9, ease: 'power3.out' })
      const hy = gsap.quickTo('.hero-depth', 'y', { duration: 0.9, ease: 'power3.out' })
      const onMove = (e: PointerEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5, ny = e.clientY / window.innerHeight - 0.5
        wx(-nx * 40); hx(nx * 22); hy(ny * 14)
      }
      window.addEventListener('pointermove', onMove, { passive: true })
      return () => window.removeEventListener('pointermove', onMove)
    }, root)
    return () => ctx.revert()
  }, [])

  const word = 'block text-[clamp(4.6rem,15.5vw,15.5rem)] font-extrabold uppercase leading-[0.84] tracking-[-0.05em]'
  const chip = 'hero-chip px-bob grid h-[68px] w-[68px] place-items-center rounded-full border border-white/40 bg-white/20 text-white shadow-[0_18px_30px_-16px_rgba(29,10,51,0.55)] backdrop-blur-md'
  return (
    <section ref={root} aria-labelledby="px-hero-h" className="relative isolate overflow-hidden bg-[radial-gradient(120%_70%_at_65%_100%,#c987d0_0%,#a653ad_38%,#89288f_62%,#6a1d71_100%)] text-white lg:min-h-[max(780px,100svh)]">
      {/* The Rocket mark, enlarged and faint, behind everything */}
      <RocketMark className="hero-mark pointer-events-none absolute -right-[8%] top-[6%] -z-10 w-[62%] text-white opacity-[0.07]" />

      {/* Top row: who, and what to do */}
      <div className="wrap relative z-[3] grid gap-8 pt-[calc(var(--header-h)+1.5rem)] lg:grid-cols-[1fr_minmax(0,24rem)] lg:gap-20 lg:pt-[calc(var(--header-h)+2rem)]">
        <p className="hero-info text-[0.95rem] font-semibold text-white/80">{t({ en: 'Rocket by Dutch-Bangla Bank', bn: 'ডাচ্-বাংলা ব্যাংকের রকেট' })}</p>
        <div className="hero-info">
          <p className="text-[clamp(1.02rem,1.25vw,1.2rem)] font-medium leading-[1.55] text-white/90">
            {t({ en: 'Send, spend, pay and cash out from one app, backed by a real Dutch-Bangla Bank account.', bn: 'এক অ্যাপেই টাকা পাঠান, খরচ করুন, পেমেন্ট করুন ও তুলুন: পেছনে আছে আসল ডাচ্-বাংলা ব্যাংক অ্যাকাউন্ট।' })}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link to="/open-account" className="group inline-flex min-h-[52px] items-center gap-3 rounded-full bg-white px-6 text-[0.98rem] font-bold text-[var(--px-purple)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_20px_30px_-14px_rgba(29,10,51,0.6)]">
              {t({ en: 'Open an account', bn: 'অ্যাকাউন্ট খুলুন' })}
              <ArrowRight size={18} aria-hidden className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <a href="tel:*322%23" className="inline-flex min-h-[52px] items-center gap-2.5 rounded-full border border-white/60 px-5 text-[0.98rem] font-bold text-white transition-[background-color,color,border-color] duration-300 hover:border-white hover:bg-white hover:text-[var(--px-purple)]">
              <PhoneCall size={18} aria-hidden />
              {t({ en: 'Dial', bn: 'ডায়াল' })} <span className="tabular-nums">*322#</span>
            </a>
          </div>
        </div>
      </div>

      {/* The headline: three giant faded lines, overlapped by the hand */}
      <div className="hero-words relative z-[1] mt-6 select-none px-[3vw] text-white opacity-[0.34] lg:absolute lg:inset-x-0 lg:top-[24%] lg:mt-0">
        <h1 id="px-hero-h">
          <span className="hero-l1 block lg:ml-[14vw]"><Split as="span" className={`hero-line ${word}`} text={{ en: 'Launch', bn: 'টাকা' }} /></span>
          <span className="hero-l2 block"><Split as="span" className={`hero-line ${word}`} text={{ en: 'your', bn: 'চলুক' }} /></span>
          <span className="hero-l3 block lg:ml-[26vw]"><Split as="span" className={`hero-line ${word}`} text={{ en: 'money.', bn: 'রকেটে।' }} /></span>
        </h1>
      </div>

      {/* Hand and phone, in front of the words */}
      <div className="relative z-[2] mx-auto -mt-[12vw] aspect-[4/3] w-[110%] max-w-[900px] -translate-x-[4%] lg:absolute lg:bottom-0 lg:left-1/2 lg:mx-0 lg:mt-0 lg:w-[76vw] lg:max-w-[1280px] lg:-translate-x-1/2">
        <div className="hero-depth absolute inset-0">
          <img src="/hero/rocket-hand.webp" width={2000} height={1500} alt={t({ en: 'A hand holding a phone showing the Rocket app home screen', bn: 'রকেট অ্যাপের হোম স্ক্রিন দেখানো ফোন হাতে' })}
            className="hero-hand absolute inset-0 h-full w-full object-contain drop-shadow-[0_40px_60px_rgba(40,8,50,0.45)]" {...{ fetchpriority: 'high' }} />
        </div>
      </div>

      {/* Service chips: icon only, labelled for assistive tech */}
      <div className="absolute left-[8vw] top-[23%] z-[3] hidden gap-3 lg:flex" role="list">
        <span role="listitem" aria-label={t({ en: 'Send Money', bn: 'সেন্ড মানি' })} className={chip}><Send size={26} aria-hidden /></span>
        <span role="listitem" aria-label={t({ en: 'Cash Out', bn: 'ক্যাশ আউট' })} className={chip} style={{ animationDelay: '1.2s' }}><Banknote size={26} aria-hidden /></span>
        <span role="listitem" aria-label={t({ en: 'Pay Bills', bn: 'বিল পেমেন্ট' })} className={chip} style={{ animationDelay: '2.1s' }}><FileText size={26} aria-hidden /></span>
      </div>

      <p className="hero-pill wrap relative z-[3] mb-8 mt-6 flex items-center gap-2 text-[0.9rem] font-semibold text-white lg:absolute lg:inset-x-0 lg:bottom-9 lg:m-0 lg:mx-auto lg:w-full">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2">
          <PlayGlyph size={18} />
          {t({ en: '10M+ downloads on Google Play', bn: 'গুগল প্লে-তে ১ কোটির বেশি ডাউনলোড' })}
        </span>
      </p>
    </section>
  )
}
