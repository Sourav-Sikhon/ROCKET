import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { gsap, reducedMotion } from '../motion'
import { useI18n } from '../i18n'
import { Icon } from '../components/Icon'
import { Split } from './Split'
import type { IconName, L } from '../data/services'

// Business needs the official pages cover: merchant pay, salary and allowance disbursement, Bill Pay categories, remittance.
const kinds: { to: string; icon: IconName; name: L; line: L; bg: string; fg: string; chip: string }[] = [
  { to: '/services/merchant-payment', icon: 'shop', name: { en: 'Merchants', bn: 'মার্চেন্ট' }, line: { en: 'Accept payment from customers at your counter.', bn: 'কাউন্টারে গ্রাহকের পেমেন্ট গ্রহণ করুন।' }, bg: 'var(--px-green)', fg: '#ffffff', chip: '#ffffff' },
  { to: '/services/salary-disbursement', icon: 'salary', name: { en: 'Corporate & Government', bn: 'কর্পোরেট ও সরকারি' }, line: { en: 'Pay salaries and allowances straight into Rocket.', bn: 'বেতন ও ভাতা সরাসরি রকেটে পাঠান।' }, bg: 'var(--px-blue-l)', fg: 'var(--px-blue-d)', chip: 'var(--px-blue)' },
  { to: '/services/bill-payment', icon: 'bill', name: { en: 'Educational Institutions', bn: 'শিক্ষা প্রতিষ্ঠান' }, line: { en: 'Education is a Bill Pay category in the app.', bn: 'অ্যাপের বিল পে-তে শিক্ষা একটি ক্যাটাগরি।' }, bg: '#e9d8f2', fg: '#3a0f47', chip: 'var(--px-purple)' },
  { to: '/services/foreign-remittance', icon: 'globe', name: { en: 'Remittance Partners', bn: 'রেমিট্যান্স পার্টনার' }, line: { en: 'Money from abroad, credited via nominated exchange houses.', bn: 'মনোনীত এক্সচেঞ্জ হাউজের মাধ্যমে বিদেশ থেকে টাকা।' }, bg: 'var(--px-blue)', fg: '#ffffff', chip: '#ffffff' },
]

/** Rocket for Business, in the premium language: giant faded word, bold coloured cards, offset photo. */
export function PxBusiness() {
  const { t } = useI18n()
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (!root.current || reducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('.bz-h .px-char', { yPercent: 115, duration: 1, stagger: 0.03, ease: 'expo.out', scrollTrigger: { trigger: root.current, start: 'top 70%', once: true } })
      gsap.from('.bz-card', { y: 70, duration: 0.9, stagger: 0.1, ease: 'expo.out', clearProps: 'transform', scrollTrigger: { trigger: '.bz-grid', start: 'top 82%', once: true } })
      gsap.from('.bz-photo', { y: 60, duration: 1.1, ease: 'expo.out', clearProps: 'transform', scrollTrigger: { trigger: '.bz-photo', start: 'top 88%', once: true } })
      gsap.to('.bz-word', { xPercent: -8, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 1 } })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} aria-labelledby="bz-h" className="relative isolate overflow-hidden bg-[var(--px-soft)] py-20 text-[var(--px-ink)] md:py-28">
      <div aria-hidden className="bz-word px-display pointer-events-none absolute -left-[2vw] top-[2%] -z-10 select-none whitespace-nowrap text-[clamp(8rem,26vw,28rem)] font-extrabold uppercase leading-[0.8] tracking-[-0.05em] text-[var(--px-purple)] opacity-[0.07]">{t({ en: 'Business', bn: 'ব্যবসা' })}</div>

      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="bz-h" className="bz-h px-display max-w-[14ch] text-[clamp(2.8rem,7vw,6.4rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.04em]">
            <Split as="span" className="block" text={{ en: 'Rocket for', bn: 'ব্যবসার' }} />
            <span className="block text-[var(--px-purple)]"><Split as="span" className="block" text={{ en: 'Business.', bn: 'জন্য রকেট।' }} /></span>
          </h2>
          <p className="max-w-[26rem] text-[1.08rem] font-medium leading-[1.6] text-[var(--px-ink)]/80">
            {t({ en: 'Collect payments, pay salaries and settle bills with a bank-backed account, made for the way your business runs each day.', bn: 'ব্যাংক-সমর্থিত অ্যাকাউন্টে পেমেন্ট নিন, বেতন দিন ও বিল মেটান: আপনার প্রতিদিনের ব্যবসার মতো করে।' })}
          </p>
        </div>

        <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.62fr)]">
          <ul className="bz-grid grid gap-5 sm:grid-cols-2">
            {kinds.map((k) => (
              <li key={k.to} className="bz-card">
                <Link to={k.to} className="group relative flex h-full min-h-[250px] flex-col overflow-hidden rounded-[28px] p-6 transition-transform duration-300 hover:-translate-y-1.5" style={{ background: k.bg, color: k.fg }}>
                  <span className="relative grid h-16 w-16 place-items-center rounded-2xl" style={{ background: k.chip, color: k.chip === '#ffffff' ? k.bg : '#fff' }}><Icon name={k.icon} size={30} /></span>
                  <span className="relative mt-auto block pt-8">
                    <span className="px-display block text-[1.55rem] font-extrabold leading-[1.1] tracking-[-0.02em]">{t(k.name)}</span>
                    <span className="mt-2 block text-[0.98rem] font-medium leading-[1.5] opacity-85">{t(k.line)}</span>
                  </span>
                  <span className="relative mt-5 inline-flex items-center gap-1.5 text-[0.92rem] font-bold">{t({ en: 'Explore', bn: 'দেখুন' })}<ArrowUpRight size={17} aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
                </Link>
              </li>
            ))}
          </ul>

          <figure className="bz-photo relative min-h-[420px]">
            <span aria-hidden className="absolute -bottom-3 -right-3 h-full w-full rounded-[28px] bg-[var(--px-purple)]" />
            <img src="/hero/rocket-business-tall.webp" width={1011} height={1555} loading="lazy" alt={t({ en: 'A shopkeeper smiling at a Payment Successful message in the Rocket app', bn: 'রকেট অ্যাপে পেমেন্ট সফল বার্তা দেখে হাসছেন একজন দোকানি' })}
              className="absolute inset-0 h-full w-full rounded-[28px] object-cover object-top" />
          </figure>
        </div>
      </div>
    </section>
  )
}
