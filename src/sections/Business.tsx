import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Icon } from '../components/Icon'
import { useI18n } from '../i18n'
import { useReveal } from '../components/ui'
import type { IconName, L } from '../data/services'

// Business needs the official pages actually cover: merchant pay, salary and allowance disbursement, Bill Pay categories, remittance.
const kinds: { to: string; icon: IconName; name: L; line: L }[] = [
  { to: '/services/merchant-payment', icon: 'shop', name: { en: 'Merchants', bn: 'মার্চেন্ট' }, line: { en: 'Accept payment from customers at your counter.', bn: 'কাউন্টারে গ্রাহকের পেমেন্ট গ্রহণ করুন।' } },
  { to: '/services/salary-disbursement', icon: 'salary', name: { en: 'Corporate & Government', bn: 'কর্পোরেট ও সরকারি' }, line: { en: 'Pay salaries and allowances straight into Rocket.', bn: 'বেতন ও ভাতা সরাসরি রকেটে পাঠান।' } },
  { to: '/services/bill-payment', icon: 'bill', name: { en: 'Educational Institutions', bn: 'শিক্ষা প্রতিষ্ঠান' }, line: { en: 'Education is a Bill Pay category in the app.', bn: 'অ্যাপের বিল পে-তে শিক্ষা একটি ক্যাটাগরি।' } },
  { to: '/services/foreign-remittance', icon: 'globe', name: { en: 'Remittance Partners', bn: 'রেমিট্যান্স পার্টনার' }, line: { en: 'Money from abroad, credited via nominated exchange houses.', bn: 'মনোনীত এক্সচেঞ্জ হাউজের মাধ্যমে বিদেশ থেকে টাকা।' } },
]

/** "Rocket for Business": four business types beside a photo banner. */
export function Business() {
  const { t } = useI18n()
  const ref = useReveal<HTMLElement>()
  // The image is portrait and uncropped: on desktop its height equals the height of the cards beside it.
  const cards = useRef<HTMLUListElement>(null)
  const [side, setSide] = useState<number | null>(null)
  useEffect(() => {
    const el = cards.current
    if (!el) return
    const mq = matchMedia('(min-width: 1024px)')
    const fit = () => setSide(mq.matches ? Math.round(el.getBoundingClientRect().height) : null)
    fit()
    const ro = new ResizeObserver(fit); ro.observe(el)
    mq.addEventListener('change', fit)
    return () => { ro.disconnect(); mq.removeEventListener('change', fit) }
  }, [])
  return (
    <section ref={ref} aria-labelledby="biz-h" className="py-16 md:py-24">
      <div className="wrap">
        <div className="reveal mx-auto max-w-[44rem] text-center">
          <h2 id="biz-h" className="text-[clamp(1.9rem,3vw,2.7rem)] font-extrabold leading-[1.15] tracking-[-0.02em] text-ink">{t({ en: 'Rocket for Business', bn: 'ব্যবসার জন্য রকেট' })}</h2>
          <p className="font-display mt-3 text-ink-2">{t({ en: 'Collect payments, pay salaries and settle bills with a bank-backed account, made for the way your business runs each day.', bn: 'ব্যাংক-সমর্থিত অ্যাকাউন্টে পেমেন্ট নিন, বেতন দিন ও বিল মেটান: আপনার প্রতিদিনের ব্যবসার মতো করে।' })}</p>
        </div>

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-14">
          <ul ref={cards} className="grid gap-4 sm:grid-cols-2">
            {kinds.map((k, i) => (
              <li key={k.to} className="reveal" data-d={i * 60}>
                <Link to={k.to} className="group flex h-full flex-col gap-4 rounded-[18px] border border-[#d9e5f5] bg-white p-5 transition-[transform,border-color,box-shadow] duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-plum hover:shadow-[0_22px_34px_-24px_rgba(137,40,143,0.5)]">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#f3e3f4] text-plum transition-colors duration-300 group-hover:bg-plum group-hover:text-white"><Icon name={k.icon} size={28} /></span>
                  <span>
                    <span className="font-display block text-[1.1rem] font-semibold leading-snug text-ink">{t(k.name)}</span>
                    <span className="mt-1.5 block text-[0.9rem] leading-[1.55] text-ink-2">{t(k.line)}</span>
                  </span>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-[0.88rem] font-bold text-plum">{t({ en: 'Explore', bn: 'দেখুন' })}<ArrowRight size={15} aria-hidden className="transition-transform duration-300 group-hover:translate-x-1" /></span>
                </Link>
              </li>
            ))}
          </ul>

          <figure className="reveal mx-auto w-full max-w-[420px] lg:mx-0 lg:max-w-none" data-d="120" style={side ? { height: side, width: Math.round(side * 1011 / 1555) } : undefined}>
            <img src="/hero/rocket-business-tall.webp" width={1011} height={1555} loading="lazy" alt={t({ en: 'A shopkeeper smiling at a Payment Successful message in the Rocket app', bn: 'রকেট অ্যাপে পেমেন্ট সফল বার্তা দেখে হাসছেন একজন দোকানি' })}
              className="aspect-[1011/1555] h-full w-full rounded-[18px] object-cover shadow-[0_30px_60px_-34px_rgba(137,40,143,0.5)]" />
          </figure>
        </div>
      </div>
    </section>
  )
}
