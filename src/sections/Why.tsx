import { useI18n } from '../i18n'
import { useReveal } from '../components/ui'
import type { L } from '../data/services'

const iconCls = 'h-[56px] w-[56px] text-plum'

// Four solid glyphs on one 56px grid: filled shapes with white cut-outs, no outlines.
function Stopwatch() {
  return (
    <svg aria-hidden viewBox="0 0 56 56" className={iconCls}>
      <rect x="21" y="3" width="14" height="5" rx="2.5" fill="currentColor" />
      <rect x="25.5" y="7" width="5" height="6" fill="currentColor" />
      <rect x="43" y="11.5" width="5" height="8" rx="2.5" transform="rotate(45 45.5 15.5)" fill="currentColor" />
      <circle cx="28" cy="32" r="19" fill="currentColor" />
      <path d="M30.5 20 22 33.5h6.2L25.8 44 35 29.8h-6.3z" fill="#fff" />
    </svg>
  )
}
function Shield() {
  return (
    <svg aria-hidden viewBox="0 0 56 56" className={iconCls}>
      <path d="M28 3.5 49 11v15.5C49 40 40.5 49.5 28 53.5 15.5 49.5 7 40 7 26.5V11z" fill="currentColor" />
      <path d="M18.5 28.5l7 7 12.5-14.5" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function PhoneIcon() {
  return (
    <svg aria-hidden viewBox="0 0 56 56" className={iconCls}>
      <rect x="13" y="3" width="30" height="50" rx="7" fill="currentColor" />
      <rect x="17.5" y="10" width="21" height="31" rx="2" fill="#fff" />
      <circle cx="28" cy="47" r="2.4" fill="#fff" />
    </svg>
  )
}
function Coins() {
  return (
    <svg aria-hidden viewBox="0 0 56 56" className={iconCls}>
      <path d="M8 37.5c0-3.9 8.5-7 20-7s20 3.1 20 7v4c0 3.9-8.5 7-20 7s-20-3.1-20-7z" fill="currentColor" />
      <path d="M8 26c0-3.9 8.5-7 20-7s20 3.1 20 7v4c0 3.9-8.5 7-20 7S8 33.900 8 30z" fill="currentColor" stroke="#f4f8fe" strokeWidth="2.4" />
      <ellipse cx="28" cy="14.5" rx="20" ry="7" fill="currentColor" stroke="#f4f8fe" strokeWidth="2.4" />
      <path d="M21 14.5h14" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

const cards: { icon: JSX.Element; t: L; d: L }[] = [
  { icon: <Stopwatch />, t: { en: 'Real-time Banking', bn: 'রিয়েল-টাইম ব্যাংকিং' }, d: { en: 'Send money and pay bills from your phone.', bn: 'ফোন থেকেই টাকা পাঠান ও বিল দিন।' } },
  { icon: <Shield />, t: { en: 'Secure Money Transfer', bn: 'নিরাপদ অর্থ লেনদেন' }, d: { en: 'Needs your phone, PIN and check digit together.', bn: 'ফোন, পিন ও চেক ডিজিট একসাথে লাগে।' } },
  { icon: <PhoneIcon />, t: { en: 'Wide Accessibility', bn: 'সহজ প্রবেশগম্যতা' }, d: { en: 'Agents nationwide, even in remote areas.', bn: 'দুর্গম এলাকাসহ সারা দেশে এজেন্ট।' } },
  { icon: <Coins />, t: { en: 'A Habit of Saving', bn: 'সঞ্চয়ের অভ্যাস' }, d: { en: 'Helps build a habit of saving.', bn: 'সঞ্চয়ের অভ্যাস গড়তে সাহায্য করে।' } },
]

/** "Why Choose Rocket?": four soft lavender cards. Each line is one of the four benefits on the original Rocket site. */
export function Why() {
  const { t } = useI18n()
  const ref = useReveal<HTMLElement>()
  return (
    <section ref={ref} aria-labelledby="why-h" className="py-10">
      <div className="wrap">
                <p className="eyebrow reveal flex items-center justify-center gap-3 text-[0.72rem] text-[#89288F]"><span aria-hidden className="h-[2px] w-6 bg-plum" />{t({ en: 'Key Benefits', bn: 'মূল সুবিধা' })}</p>
        <h2 id="why-h" className="reveal mt-3 text-center text-[clamp(1.9rem,2.9vw,2.6rem)] font-extrabold leading-[1.15] tracking-[-0.026em] text-ink" data-d="40">
          {t({ en: 'Why Choose', bn: 'কেন বেছে নেবেন' })} <span className="text-plum">{t({ en: 'Rocket?', bn: 'রকেট?' })}</span>
        </h2>
        <ul className="mt-8 grid gap-[19px] sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => (
            <li key={i} className="reveal" data-d={i * 70}>
              <article className="flex h-full min-h-[221px] flex-col items-center rounded-[28px] bg-[linear-gradient(180deg,#f4f8fe,#e8f1fd)] px-6 pb-8 pt-8 text-center">
                {c.icon}
                <h3 className="mt-4 text-[1.05rem] font-bold leading-snug text-ink">{t(c.t)}</h3>
                <p className="mt-2 max-w-[17rem] text-[0.9rem] leading-relaxed text-ink-3">{t(c.d)}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
