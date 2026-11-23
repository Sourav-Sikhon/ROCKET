import { Link } from 'react-router-dom'
import { ArrowRight, FileText, PhoneCall, Send, Smartphone } from 'lucide-react'
import { useI18n } from '../i18n'
import type { L } from '../data/services'

function Rings({ size = 34 }: { size?: number }) {
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 34 34" fill="none" stroke="currentColor" strokeWidth="2.4">
      <circle cx="9" cy="9" r="5.5" /><circle cx="25" cy="9" r="5.5" /><circle cx="9" cy="25" r="5.5" /><circle cx="25" cy="25" r="5.5" />
    </svg>
  )
}

type ChipDef = { to: string; label: L; icon: JSX.Element; left: string; top: string; rot: number; delay: string }
const chips: ChipDef[] = [
  { to: '/services/send-money', label: { en: 'Send Money', bn: 'সেন্ড মানি' }, icon: <Send size={34} strokeWidth={1.9} aria-hidden />, left: '9.9%', top: '5.6%', rot: -10, delay: '0s' },
  { to: '/services/bill-payment', label: { en: 'Pay Bills', bn: 'বিল পেমেন্ট' }, icon: <FileText size={34} strokeWidth={1.9} aria-hidden />, left: '68%', top: '16.6%', rot: 10, delay: '1.2s' },
  { to: '/services/mobile-top-up', label: { en: 'Mobile Recharge', bn: 'মোবাইল রিচার্জ' }, icon: <Smartphone size={34} strokeWidth={1.9} aria-hidden />, left: '3.7%', top: '34%', rot: 0, delay: '2.2s' },
  { to: '/services', label: { en: 'More Services', bn: 'আরও সেবা' }, icon: <Rings />, left: '72.7%', top: '45.5%', rot: 0, delay: '3.1s' },
]

/**
 * Hero from the approved reference: headline and buttons on the left; on the
 * right a hand holding a phone with floating service chips and a violet ribbon,
 * with the soft washes behind.
 */
export function Hero() {
  const { t } = useI18n()
  return (
    <section aria-labelledby="hero-h" className="relative -mt-[var(--header-h)] overflow-hidden bg-lav-bg pt-[var(--header-h)] lg:min-h-[704px]">
      {/* washes */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -right-[14vw] -top-[26vw] h-[64vw] w-[64vw] rounded-full bg-[radial-gradient(circle_at_42%_48%,#d9e8fb_0%,#e8f1fd_52%,rgba(243,248,254,0)_72%)]" />
        <div className="absolute -left-[10vw] -top-[8vw] h-[40vw] w-[40vw] rounded-full bg-[radial-gradient(circle,#e8f1fd_0%,rgba(243,248,254,0)_70%)]" />
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[70px] bg-gradient-to-t from-lav-bg/90 to-transparent" />

      <div className="wrap relative z-[3]">
        <div className="max-w-[640px] pb-10 pt-8 sm:pt-12 lg:pb-[56px] lg:pt-[88px]">
          <p className="eyebrow font-display mb-5 leading-[1.95] text-[0.8rem] text-ink-2">
            {t({ en: 'First Mobile Banking', bn: 'বাংলাদেশে প্রথম' })}<br />{t({ en: 'in Bangladesh', bn: 'মোবাইল ব্যাংকিং' })}
          </p>
          <h1 id="hero-h">
            <span className="block text-[clamp(3rem,5.2vw,4.9rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink">{t({ en: 'Rocket', bn: 'রকেট' })}</span>
            <span className="block text-[clamp(2.3rem,4.4vw,4.1rem)] font-extrabold leading-[1.14] tracking-[-0.03em] text-plum">{t({ en: 'Now Closer to You', bn: 'এখন আপনার আরও কাছে' })}</span>
          </h1>
          <p className="mt-7 max-w-[27rem] text-[clamp(1.05rem,1.4vw,1.3rem)] leading-[1.55] text-ink-2">
            {t({ en: 'Real-time banking from your phone, with agents and DBBL ATMs across Bangladesh.', bn: 'ফোন থেকেই রিয়েল-টাইম ব্যাংকিং, সারা বাংলাদেশে এজেন্ট ও ডিবিবিএল এটিএম।' })}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link to="/open-account" className="btn btn-primary">{t({ en: 'Open a Rocket Account', bn: 'রকেট অ্যাকাউন্ট খুলুন' })} <ArrowRight size={18} aria-hidden /></Link>
            <a href="tel:*322%23" className="btn btn-outline group">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-plum text-white transition-transform duration-300 group-hover:-rotate-12"><PhoneCall size={14} aria-hidden /></span>
              <span>{t({ en: 'Dial', bn: 'ডায়াল করুন' })} <span className="tabular text-plum">*322#</span></span>
            </a>
          </div>
        </div>
      </div>

      {/* Art: phone in hand, chips, ribbon. Sized in vw so it scales like the reference. */}
      <div className="relative mx-auto aspect-[454/391] w-full max-w-[600px] lg:absolute lg:-bottom-[2.6vw] lg:right-[4vw] lg:mx-0 lg:w-[43.5vw] lg:max-w-[690px]">
        {/* White-backed photo: multiply drops the white so the hand sits on the hero wash */}
        <img src="/hero/hand-phone.jpg" width={1848} height={2048} alt={t({ en: 'A hand holding a phone showing the Rocket app, wrapped in a purple ribbon', bn: 'রকেট অ্যাপ দেখানো ফোন হাতে, চারপাশে বেগুনি ফিতা' })}
          className="absolute bottom-[-12%] left-[-3%] w-[112%] max-w-none mix-blend-multiply [mask-image:linear-gradient(to_right,#000_0%,#000_70%,transparent_96%)]" {...{ fetchpriority: 'high' }} />
        {chips.map((c) => (
          <Link key={c.to + c.left} to={c.to}
            className="chip-float absolute z-[4] flex aspect-square w-[16.5%] flex-col items-center justify-center gap-1.5 rounded-[26%] border border-white/80 bg-white/85 p-1 text-center text-[clamp(0.62rem,1vw,0.95rem)] font-semibold leading-tight text-ink shadow-[0_22px_40px_-22px_rgba(137,40,143,0.45)] backdrop-blur-[2px] transition-shadow hover:shadow-[0_26px_44px_-18px_rgba(137,40,143,0.6)]"
            style={{ left: c.left, top: c.top, ['--r' as string]: `${c.rot}deg`, animationDelay: c.delay }}>
            <span className="text-plum">{c.icon}</span>
            <span>{t(c.label)}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
