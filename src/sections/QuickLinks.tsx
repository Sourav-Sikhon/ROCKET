import { Link } from 'react-router-dom'
import { ShieldCheck, UserX, TriangleAlert, ArrowUpRight, ArrowRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useI18n } from '../i18n'
import { useReveal } from '../components/ui'
import { links } from '../data/site'

const items: { to?: string; href?: string; icon: LucideIcon; label: { en: string; bn: string } }[] = [
  { href: links.awareness, icon: ShieldCheck, label: { en: 'Awareness', bn: 'সচেতনতা' } },
  { href: links.terminated, icon: UserX, label: { en: 'Terminated Agents', bn: 'বাতিলকৃত এজেন্ট' } },
  { href: links.suspicious, icon: TriangleAlert, label: { en: 'Suspicious Closed Agents', bn: 'সন্দেহজনক কারণে বন্ধ এজেন্ট' } },
]

const card =
  'group flex h-full min-h-[64px] items-center gap-3 rounded-2xl border border-[#e7d3ea] bg-white px-4 py-3 text-[#89288F] shadow-[0_8px_20px_-16px_rgba(137,40,143,0.5)] transition-[transform,box-shadow,border-color] duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:border-[#89288F] hover:shadow-[0_16px_28px_-16px_rgba(137,40,143,0.55)] active:translate-y-0'

/** Strip under the hero: bank identity on the left, three quick-link cards (one row) on the right. */
export function QuickLinks() {
  const { t } = useI18n()
  const ref = useReveal<HTMLElement>()
  return (
    <section ref={ref} aria-label={t({ en: 'Quick links', bn: 'দ্রুত লিংক' })} className="pb-6 pt-10 md:pt-14">
      <div className="wrap">
        <div className="reveal grid gap-6 rounded-[24px] bg-[linear-gradient(100deg,#f4f8fe_0%,#e3edfb_100%)] p-5 sm:p-6 xl:grid-cols-[minmax(0,0.62fr)_minmax(0,1.9fr)] xl:items-center xl:gap-10 lg:px-9 lg:py-7">
          <div>
            <p className="text-[1.2rem] font-extrabold leading-tight tracking-[-0.01em] text-ink">{t({ en: 'Dutch-Bangla Bank Rocket', bn: 'ডাচ্-বাংলা ব্যাংক রকেট' })}</p>
            <p className="mt-1.5 text-[0.9rem] leading-snug text-ink-3">{t({ en: 'First Mobile Banking in Bangladesh.', bn: 'বাংলাদেশের প্রথম মোবাইল ব্যাংকিং।' })}</p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-3">
            {items.map((it, i) => {
              const Icon = it.icon
              const Go = it.to ? ArrowRight : ArrowUpRight
              const inner = (
                <>
                  <span aria-hidden className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#89288F]/10 transition-colors duration-300 group-hover:bg-[#89288F] group-hover:text-white">
                    <Icon size={21} strokeWidth={2} />
                  </span>
                  <span className="min-w-0 flex-1 text-[0.9rem] font-bold leading-snug">{t(it.label)}</span>
                  <Go size={18} aria-hidden className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0 group-hover:scale-110" />
                </>
              )
              return (
                <li key={i}>
                  {it.to
                    ? <Link to={it.to} className={card}>{inner}</Link>
                    : <a href={it.href} target="_blank" rel="noopener" className={card}>{inner}<span className="sr-only"> (PDF)</span></a>}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
