import { useLayoutEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { gsap, reducedMotion } from '../motion'
import { Phone } from '../components/Phone'
import { useI18n } from '../i18n'
import type { AppScreen, L } from '../data/services'

/** A classic keypad handset showing the USSD prompt, for "works on any phone". */
function FeaturePhone() {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#']
  return (
    <svg aria-hidden viewBox="0 0 120 214" className="mx-auto h-[196px] w-auto drop-shadow-[0_14px_14px_rgba(0,70,30,0.28)]">
      <defs>
        <linearGradient id="fp-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3a4a44" /><stop offset="0.5" stopColor="#1f2925" /><stop offset="1" stopColor="#101614" />
        </linearGradient>
        <linearGradient id="fp-screen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d7ecd0" /><stop offset="1" stopColor="#b5d6ad" />
        </linearGradient>
        <linearGradient id="fp-key" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4a5852" /><stop offset="1" stopColor="#2a3430" />
        </linearGradient>
      </defs>
      {/* Body and bezel */}
      <rect x="16" y="4" width="88" height="206" rx="20" fill="url(#fp-body)" />
      <rect x="18.5" y="6.5" width="83" height="201" rx="17.5" fill="none" stroke="#ffffff" strokeOpacity="0.16" />
      {/* Earpiece */}
      <rect x="48" y="12" width="24" height="3.4" rx="1.7" fill="#0a0f0d" />
      {/* Screen */}
      <rect x="25" y="22" width="70" height="62" rx="6" fill="#0a0f0d" />
      <rect x="28" y="25" width="64" height="56" rx="3.5" fill="url(#fp-screen)" />
      <text x="34" y="37" fontSize="6" fontWeight="700" fill="#2b4a2b" fontFamily="Stack Sans Headline Variable, sans-serif">Rocket</text>
      <text x="60" y="57" textAnchor="middle" fontSize="15" fontWeight="800" fill="#1f3a22" fontFamily="Stack Sans Headline Variable, sans-serif">*322#</text>
      <text x="60" y="70" textAnchor="middle" fontSize="5.5" fontWeight="600" fill="#2b4a2b" fontFamily="Stack Sans Headline Variable, sans-serif">Dutch-Bangla Bank</text>
      <rect x="28" y="73" width="64" height="8" fill="#2b4a2b" opacity="0.14" />
      <text x="32" y="79" fontSize="5" fontWeight="700" fill="#1f3a22" fontFamily="Stack Sans Headline Variable, sans-serif">Options</text>
      <text x="88" y="79" textAnchor="end" fontSize="5" fontWeight="700" fill="#1f3a22" fontFamily="Stack Sans Headline Variable, sans-serif">Back</text>
      {/* Navigation: soft keys and a round d-pad */}
      <rect x="25" y="90" width="22" height="9" rx="4.5" fill="url(#fp-key)" />
      <rect x="73" y="90" width="22" height="9" rx="4.5" fill="url(#fp-key)" />
      <circle cx="60" cy="97" r="11" fill="#0d1311" />
      <circle cx="60" cy="97" r="8.4" fill="url(#fp-key)" />
      <circle cx="60" cy="97" r="3.4" fill="#0d1311" stroke="#ffffff" strokeOpacity="0.18" />
      {/* Keypad */}
      {keys.map((k, i) => {
        const x = 26 + (i % 3) * 23
        const y = 116 + Math.floor(i / 3) * 21
        return (
          <g key={k}>
            <rect x={x} y={y} width="20" height="17" rx="6" fill="url(#fp-key)" />
            <rect x={x + 0.5} y={y + 0.5} width="19" height="16" rx="5.5" fill="none" stroke="#ffffff" strokeOpacity="0.12" />
            <text x={x + 10} y={y + 12} textAnchor="middle" fontSize="9" fontWeight="700" fill="#e8efe9" fontFamily="Stack Sans Headline Variable, sans-serif">{k}</text>
          </g>
        )
      })}
    </svg>
  )
}

/** Two speech bubbles for "Bangla and English". */
function Languages() {
  return (
    <div aria-hidden className="relative mx-auto h-[190px] w-[240px]">
      <span className="absolute left-2 top-8 rounded-[22px] rounded-bl-[6px] bg-[var(--px-blue)] px-6 py-4 text-[2.2rem] font-extrabold leading-none text-white shadow-[0_18px_30px_-18px_rgba(28,31,102,0.8)]">বাংলা</span>
      <span className="absolute bottom-8 right-2 rounded-[22px] rounded-br-[6px] bg-white px-6 py-4 text-[2.2rem] font-extrabold leading-none text-[var(--px-blue)] shadow-[0_18px_30px_-18px_rgba(29,10,51,0.4)]">English</span>
    </div>
  )
}

function Screen({ screen }: { screen: AppScreen }) {
  return <Phone screen={screen} className="mx-auto w-[150px] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-3" />
}

// The benefits on the original Rocket site, plus *322# and language, both stated on the official pages and the Play listing.
const features: { tint: string; fg: string; pane: string; t: L; d: L; media: ReactNode }[] = [
  { tint: 'var(--px-purple)', fg: '#ffffff', pane: 'rgba(255,255,255,0.14)', t: { en: 'Real-time banking', bn: 'রিয়েল-টাইম ব্যাংকিং' }, d: { en: 'Send money and pay bills from your phone, any time.', bn: 'যেকোনো সময় ফোন থেকেই টাকা পাঠান ও বিল দিন।' }, media: <Screen screen="home" /> },
  { tint: 'var(--px-silver)', fg: '#1d0a33', pane: 'rgba(255,255,255,0.5)', t: { en: 'Secure transfers', bn: 'নিরাপদ লেনদেন' }, d: { en: 'Needs your phone, PIN and check digit together.', bn: 'ফোন, পিন ও চেক ডিজিট একসাথে লাগে।' }, media: <Screen screen="login" /> },
  { tint: 'var(--px-blue-l)', fg: 'var(--px-blue-d)', pane: 'rgba(255,255,255,0.7)', t: { en: 'Agents nationwide', bn: 'সারা দেশে এজেন্ট' }, d: { en: 'Even in remote areas, with DBBL ATMs and branches behind them.', bn: 'দুর্গম এলাকাতেও, পেছনে আছে ডিবিবিএল এটিএম ও শাখা।' }, media: <Screen screen="store-locator" /> },
  { tint: 'var(--px-green)', fg: '#ffffff', pane: 'rgba(255,255,255,0.16)', t: { en: 'A habit of saving', bn: 'সঞ্চয়ের অভ্যাস' }, d: { en: 'A real bank account that helps you build one.', bn: 'আসল ব্যাংক অ্যাকাউন্ট, যা অভ্যাস গড়তে সাহায্য করে।' }, media: <Screen screen="add-money" /> },
  { tint: 'var(--px-green-l)', fg: 'var(--px-green-d)', pane: 'rgba(255,255,255,0.6)', t: { en: 'Works on any phone', bn: 'যেকোনো ফোনে চলে' }, d: { en: 'No smartphone? Dial *322# on any handset.', bn: 'স্মার্টফোন নেই? যেকোনো ফোনে *322# ডায়াল করুন।' }, media: <FeaturePhone /> },
  { tint: 'var(--px-red)', fg: '#ffffff', pane: 'rgba(255,255,255,0.16)', t: { en: 'Bangla and English', bn: 'বাংলা ও ইংরেজি' }, d: { en: 'The whole app speaks your language.', bn: 'পুরো অ্যাপ আপনার ভাষায়।' }, media: <Languages /> },
]

/** Features: each card opens with its picture, then the title and text. Cards rise in sequence and lift on hover. */
export function PxFeatures() {
  const { t } = useI18n()
  const root = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    if (!root.current || reducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('.ft-head > *', { y: 36, opacity: 0, duration: 0.9, stagger: 0.1, ease: 'expo.out', scrollTrigger: { trigger: '.ft-head', start: 'top 85%' } })
      gsap.fromTo('.ft-photo-img', { scale: 1.2 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.ft-photo', start: 'top 90%', end: 'bottom 40%', scrub: 0.6 } })
      gsap.from('.ft-card', { y: 56, opacity: 0, scale: 0.96, duration: 1, stagger: 0.08, ease: 'expo.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: '.ft-grid', start: 'top 85%' } })
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <section ref={root} aria-labelledby="px-ft-h" className="bg-white py-20 md:py-28">
      <div className="wrap">
        <div className="ft-head max-w-[46rem]">
          <h2 id="px-ft-h" className="text-[clamp(2.6rem,5.6vw,5.2rem)] font-extrabold text-[var(--px-ink)]">{t({ en: 'Everything you need, in one account.', bn: 'যা যা দরকার, এক অ্যাকাউন্টে।' })}</h2>
          <p className="mt-5 max-w-[34rem] text-[1.1rem] font-medium leading-[1.55] text-[var(--px-ink)]/70">{t({ en: 'Rocket is a real Dutch-Bangla Bank account in your pocket, with the features that matter every day.', bn: 'রকেট আপনার পকেটে আসল ডাচ্-বাংলা ব্যাংক অ্যাকাউন্ট, প্রতিদিনের দরকারি সব সুবিধাসহ।' })}</p>
        </div>
        <div className="mt-12 grid gap-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-6">
        {/* A real person, tall, kept in view while the cards scroll past */}
        <figure className="ft-photo relative min-h-[420px] overflow-hidden rounded-[30px] bg-[var(--px-soft-2)] lg:sticky lg:top-[112px] lg:h-[min(760px,calc(100svh-140px))] lg:self-start">
          <img src="/hero/rocket-business.webp" width={1254} height={1254} loading="lazy" alt={t({ en: 'A shopkeeper smiling at a Rocket payment confirmation on his phone', bn: 'রকেটে পেমেন্ট নিশ্চিত হওয়ার বার্তা দেখে হাসছেন এক দোকানি' })}
            className="ft-photo-img absolute inset-0 h-full w-full object-cover object-[28%_50%]" />
          <figcaption className="absolute inset-x-4 bottom-4 rounded-[20px] bg-white/85 p-4 text-[0.98rem] font-bold leading-snug text-[var(--px-ink)] backdrop-blur-md">
            {t({ en: 'Shops, agents and customers, all on one account.', bn: 'দোকান, এজেন্ট ও গ্রাহক, সবাই এক অ্যাকাউন্টে।' })}
          </figcaption>
        </figure>
        <ul className="ft-grid grid gap-4 sm:grid-cols-2">
          {features.map((f, i) => (
            <li key={i} className="ft-card group rounded-[26px] p-3 transition-[box-shadow,margin] duration-500 ease-[var(--ease-out-expo)] hover:-mt-2 hover:mb-2 hover:shadow-[0_30px_44px_-30px_rgba(137,40,143,0.55)]" style={{ background: f.tint, color: f.fg }}>
              <div className="relative h-[210px] overflow-hidden rounded-[18px] pt-6" style={{ background: f.pane }}>{f.media}</div>
              <div className="px-4 pb-4 pt-6 md:px-5">
                <h3 className="text-[clamp(1.5rem,2vw,1.85rem)] font-extrabold">{t(f.t)}</h3>
                <p className="mt-2 text-[1rem] font-medium leading-[1.5] opacity-80">{t(f.d)}</p>
              </div>
            </li>
          ))}
        </ul>
        </div>
      </div>
    </section>
  )
}
