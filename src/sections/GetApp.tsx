import { Landmark, KeyRound, MessageSquareText, FileCheck2, Send, QrCode } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Phone } from '../components/Phone'
import { RibbonFront } from '../components/art'
import { AppStoreButton, PlayButton, UssdPlate, useReveal } from '../components/ui'
import { useI18n } from '../i18n'
import type { L } from '../data/services'

// Only assurances the official pages state. Third-party certifications (PCI DSS, ISO, etc.) are not in the
// research and are not shown; add their logos here once DBBL supplies them.
const trust: { icon: LucideIcon; t: L; d: L }[] = [
  { icon: Landmark, t: { en: 'Bank-backed', bn: 'ব্যাংক-সমর্থিত' }, d: { en: 'A real Dutch-Bangla Bank PLC account', bn: 'আসল ডাচ্-বাংলা ব্যাংক পিএলসি অ্যাকাউন্ট' } },
  { icon: KeyRound, t: { en: 'PIN protected', bn: 'পিন সুরক্ষিত' }, d: { en: 'Your 4-digit PIN guards every account', bn: 'আপনার ৪ ডিজিটের পিন অ্যাকাউন্ট সুরক্ষিত রাখে' } },
  { icon: MessageSquareText, t: { en: 'SMS confirmation', bn: 'এসএমএস নিশ্চিতকরণ' }, d: { en: 'Check the sender and amount each time', bn: 'প্রতিবার প্রেরক ও পরিমাণ মিলিয়ে নিন' } },
  { icon: FileCheck2, t: { en: 'Agent lists published', bn: 'এজেন্ট তালিকা প্রকাশিত' }, d: { en: 'Terminated and suspicious agents are listed', bn: 'বাতিল ও সন্দেহজনক এজেন্টের তালিকা আছে' } },
]

/** Download band: store buttons and *322#, a phone mockup, and the security assurances beneath. */
export function GetApp() {
  const { t } = useI18n()
  const ref = useReveal<HTMLElement>()
  return (
    <section ref={ref} aria-labelledby="get-h" className="pb-16 pt-6 md:pb-24">
      <div className="wrap">
        <div className="reveal overflow-hidden rounded-[24px] bg-[linear-gradient(120deg,#e3edfb_0%,#f4f8fe_100%)]">
          <div className="grid items-center gap-8 px-6 pt-10 sm:px-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:px-14 lg:pt-0">
            <div className="lg:py-14">
              <h2 id="get-h" className="max-w-[18ch] text-[clamp(1.9rem,3vw,2.7rem)] font-extrabold leading-[1.15] tracking-[-0.02em] text-ink">{t({ en: 'Get Rocket on your phone', bn: 'রকেট পান আপনার ফোনে' })}</h2>
              <p className="font-display mt-3 max-w-[44ch] text-ink-2">{t({ en: 'Use the Rocket app, or dial *322# on any phone, with no data needed.', bn: 'রকেট অ্যাপ ব্যবহার করুন, অথবা ডেটা ছাড়াই যেকোনো ফোনে *322# ডায়াল করুন।' })}</p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <PlayButton />
                <AppStoreButton />
                <UssdPlate />
              </div>
            </div>
            <div aria-hidden className="relative mx-auto h-[340px] w-full max-w-[460px] overflow-hidden lg:h-[400px] lg:self-end">
              <span className="absolute -right-10 -top-16 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle_at_42%_48%,#d2e4fb_0%,#e6f0fd_55%,rgba(243,248,254,0)_72%)]" />
              <span className="absolute -bottom-24 left-4 h-[260px] w-[260px] rounded-full bg-[radial-gradient(circle,#dbe9fc_0%,rgba(243,248,254,0)_70%)]" />
              <RibbonFront className="absolute -bottom-3 left-[2%] h-[78%] w-[96%] opacity-90" />
              <div className="absolute bottom-[-14%] left-[10%] w-[40%] -rotate-[7deg]"><Phone screen="cash-out" className="w-full" /></div>
              <div className="absolute bottom-[-20%] right-[12%] z-[2] w-[44%] rotate-[5deg]"><Phone screen="home" className="w-full" /></div>
              <span className="chip-float absolute left-[2%] top-[14%] z-[3] flex items-center gap-2 rounded-2xl bg-white/90 px-3 py-2 text-[0.78rem] font-semibold text-ink shadow-[0_16px_28px_-16px_rgba(137,40,143,0.5)]" style={{ ['--r' as string]: '-6deg' }}><Send size={16} className="text-plum" />{t({ en: 'Send Money', bn: 'সেন্ড মানি' })}</span>
              <span className="chip-float absolute right-[1%] top-[34%] z-[3] flex items-center gap-2 rounded-2xl bg-white/90 px-3 py-2 text-[0.78rem] font-semibold text-ink shadow-[0_16px_28px_-16px_rgba(137,40,143,0.5)]" style={{ ['--r' as string]: '5deg', animationDelay: '1.4s' }}><QrCode size={16} className="text-plum" />{t({ en: 'Scan & Pay', bn: 'স্ক্যান করে পে' })}</span>
            </div>
          </div>
        </div>

        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label={t({ en: 'Security and trust', bn: 'নিরাপত্তা ও আস্থা' })}>
          {trust.map((x, i) => (
            <li key={i} className="reveal flex items-start gap-3.5 rounded-[16px] border border-[#d9e5f5] bg-white p-4" data-d={i * 60}>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#f3e3f4] text-plum"><x.icon size={22} aria-hidden /></span>
              <span>
                <span className="font-display block text-[0.98rem] font-semibold leading-snug text-ink">{t(x.t)}</span>
                <span className="mt-0.5 block text-[0.84rem] leading-snug text-ink-3">{t(x.d)}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
