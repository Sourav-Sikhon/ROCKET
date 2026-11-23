import { AlertTriangle, FileDown, Info, KeyRound, MessageSquareText, ShieldCheck, UserX } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useI18n, ui } from '../i18n'
import { notices, officialSenders, securityRules, links } from '../data/site'
import { TextLink, useReveal } from '../components/ui'

/* ── Home: "Stay safe", the secure-experience row (all from original content) ── */
export function StaySafe() {
  const { t } = useI18n()
  const ref = useReveal<HTMLElement>()
  const tiles = [
    { icon: KeyRound, t: { en: 'Your PIN is yours alone', bn: 'পিন শুধু আপনার' }, d: { en: 'Money moves only with your phone, your PIN and your check digit together. Never share them.', bn: 'আপনার মোবাইল, পিন ও চেক ডিজিট একসাথে ছাড়া টাকা লেনদেন হয় না। কাউকে বলবেন না।' }, to: '/security', ext: false, cta: { en: 'Security guidance', bn: 'নিরাপত্তা নির্দেশনা' } },
    { icon: MessageSquareText, t: { en: 'Check who the SMS is from', bn: 'SMS কে পাঠিয়েছে দেখুন' }, d: { en: `Official SMS and IVR calls come from ${officialSenders.join(', ')}. Check the amount too.`, bn: `অফিসিয়াল SMS ও IVR কল আসে ${officialSenders.join(', ')} থেকে। টাকার পরিমাণও মিলিয়ে নিন।` }, to: '/security', ext: false, cta: { en: 'Learn more', bn: 'বিস্তারিত' } },
    { icon: Info, t: { en: 'Customer awareness', bn: 'গ্রাহক সচেতনতা' }, d: { en: 'The official awareness guide from Dutch-Bangla Bank.', bn: 'ডাচ্-বাংলা ব্যাংকের অফিসিয়াল সচেতনতা নির্দেশিকা।' }, to: links.awareness, ext: true, cta: { en: 'Open the PDF', bn: 'পিডিএফ খুলুন' } },
    { icon: UserX, t: { en: 'Terminated and suspicious agents', bn: 'বাতিল ও সন্দেহজনক এজেন্ট' }, d: { en: 'Check the official lists before you transact at an unfamiliar point.', bn: 'অপরিচিত পয়েন্টে লেনদেনের আগে অফিসিয়াল তালিকা দেখে নিন।' }, to: '/notices', ext: false, cta: { en: 'See the lists', bn: 'তালিকা দেখুন' } },
  ]
  return (
    <section ref={ref} aria-labelledby="safe-h" className="py-[var(--section)]">
      <div className="wrap">
        <h2 id="safe-h" className="sect-title reveal">{t({ en: 'Secure and convenient banking', bn: 'নিরাপদ ও সুবিধাজনক ব্যাংকিং' })}</h2>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tiles.map((x, i) => {
            const inner = (
              <>
                <span className="grid h-14 w-14 place-items-center rounded-full bg-cream text-plum"><x.icon size={26} strokeWidth={1.75} aria-hidden /></span>
                <span className="h3 mt-4 block">{t(x.t)}</span>
                <span className="mt-2 block text-[0.95rem] text-ink-2">{t(x.d)}</span>
                <span className="mt-auto block pt-5 font-bold text-plum ulink self-start">{t(x.cta)}</span>
              </>
            )
            const cls = 'tile flex h-full flex-col p-6'
            return (
              <li key={i} className="reveal" data-d={i * 70}>
                {x.ext ? <a href={x.to} target="_blank" rel="noopener" className={cls}>{inner}</a> : <Link to={x.to} className={cls}>{inner}</Link>}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

/* ── /security page ─────────────────────────────────────── */
export function Security({ standalone = false }: { standalone?: boolean }) {
  const { t } = useI18n()
  const ref = useReveal<HTMLElement>()
  return (
    <section ref={ref} aria-labelledby="sec-h" className={standalone ? 'py-14' : 'bg-cream py-[var(--section)]'}>
      <div className="wrap">
        <h2 id="sec-h" className="h2 reveal max-w-[18ch]">{t({ en: 'No one will ever need your PIN.', bn: 'আপনার পিন কারও কখনো প্রয়োজন নেই।' })}</h2>
        <div className="mt-10 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5 reveal">
            <p className="lead">{t({ en: 'Not an agent, not a bank officer, not a caller. Official Rocket messages arrive only from these numbers:', bn: 'এজেন্ট নয়, ব্যাংক কর্মকর্তা নয়, কোনো কলারও নয়। রকেটের অফিসিয়াল বার্তা আসে শুধু এই নম্বরগুলো থেকে:' })}</p>
            <ul className="mt-6 space-y-1">
              {officialSenders.map((n) => <li key={n} className="tabular text-[2rem] sm:text-[2.6rem] font-extrabold leading-tight tracking-tight text-plum">{n}</li>)}
            </ul>
          </div>
          <ul className="lg:col-span-7 grid gap-5 sm:grid-cols-2">
            {securityRules.map((r, i) => (
              <li key={i} className="tile p-6 reveal" data-d={i * 70}>
                <ShieldCheck size={28} strokeWidth={1.75} className="text-leaf" aria-hidden />
                <h3 className="h3 mt-3">{t(r.title)}</h3>
                <p className="mt-1.5 text-ink-2">{t(r.body)}</p>
              </li>
            ))}
          </ul>
        </div>
        {!standalone && <div className="mt-12 reveal"><TextLink to="/security">{t({ en: 'All security guidance', bn: 'সব নিরাপত্তা নির্দেশনা' })}</TextLink></div>}
      </div>
    </section>
  )
}

/* ── /notices page ──────────────────────────────────────── */
const tone = {
  warning: { icon: AlertTriangle, l: { en: 'Warning', bn: 'সতর্কতা' }, cls: 'bg-alert-bg text-alert' },
  info: { icon: Info, l: { en: 'Guidance', bn: 'নির্দেশনা' }, cls: 'bg-cream-2 text-plum' },
  resource: { icon: FileDown, l: { en: 'Document', bn: 'ডকুমেন্ট' }, cls: 'bg-cream text-plum' },
}

export function NoticeBoard({ limit, heading = true }: { limit?: number; heading?: boolean }) {
  const { t } = useI18n()
  const ref = useReveal<HTMLElement>()
  const list = limit ? notices.slice(0, limit) : notices
  return (
    <section ref={ref} aria-labelledby="notice-h" className={heading ? 'py-[var(--section)]' : 'pb-[var(--section)] pt-14'}>
      <div className="wrap grid gap-10 lg:grid-cols-12">
        {heading ? (
          <div className="lg:col-span-4">
            <h2 id="notice-h" className="h1 reveal">{t(ui.notices)}</h2>
            <p className="mt-4 text-ink-2 reveal" data-d="80">{t({ en: 'Official lists and guidance from Dutch-Bangla Bank. Check before you transact at an unfamiliar point.', bn: 'ডাচ্-বাংলা ব্যাংকের অফিসিয়াল তালিকা ও নির্দেশনা। অপরিচিত পয়েন্টে লেনদেনের আগে দেখে নিন।' })}</p>
            <div className="mt-6 reveal"><TextLink to="/notices">{t({ en: 'Notice centre', bn: 'নোটিশ সেন্টার' })}</TextLink></div>
          </div>
        ) : <h2 id="notice-h" className="sr-only">{t(ui.notices)}</h2>}
        <ul className={`${heading ? 'lg:col-span-8' : 'lg:col-span-12'} border-t-2 border-ink`}>
          {list.map((n, i) => {
            const tn = tone[n.tone]
            return (
              <li key={n.id} className="reveal" data-d={i * 50}>
                <a href={n.href} target="_blank" rel="noopener" className="group grid grid-cols-[auto_1fr_auto] sm:grid-cols-[112px_1fr_auto] items-center gap-4 sm:gap-6 py-5 border-b border-rule">
                  <span className={`inline-flex items-center justify-self-start gap-1.5 rounded-[6px] px-2.5 py-1 text-[0.75rem] font-bold ${tn.cls}`}>
                    <tn.icon size={14} aria-hidden /> {t(tn.l)}
                  </span>
                  <span>
                    <span className="block font-bold group-hover:text-plum">{t(n.title)}</span>
                    <span className="block small text-ink-3">{t(n.body)}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 small font-bold text-plum">
                    {t(ui.pdf)} <FileDown size={16} aria-hidden className="transition-transform group-hover:translate-y-0.5" />
                  </span>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
