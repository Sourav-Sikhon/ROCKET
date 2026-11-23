import { ArrowUpRight } from 'lucide-react'
import { OfferArt } from '../components/art'
import { useReveal } from '../components/ui'
import { links } from '../data/site'
import { useI18n } from '../i18n'
import type { L } from '../data/services'

// The project holds no confirmed campaigns, rates or dates (PRODUCT.md). Banners name the service and point to
// the app, where live offers are announced; real campaign copy replaces `line` once DBBL supplies it.
const offers: { art: 'gift' | 'topup' | 'qr'; tint: string; name: L; line: L }[] = [
  { art: 'gift', tint: 'from-[#f6e8f7] to-[#fbf3fc]', name: { en: 'Rewards on Rocket', bn: 'রকেটে পুরস্কার' }, line: { en: 'Campaigns from Dutch-Bangla Bank appear here and in the app.', bn: 'ডাচ্-বাংলা ব্যাংকের ক্যাম্পেইন এখানে ও অ্যাপে দেখা যাবে।' } },
  { art: 'topup', tint: 'from-[#dbe9fb] to-[#eef5fe]', name: { en: 'Top-up & Recharge', bn: 'টপ-আপ ও রিচার্জ' }, line: { en: 'Check the app for the recharge offers running now.', bn: 'চলমান রিচার্জ অফারের জন্য অ্যাপ দেখুন।' } },
  { art: 'qr', tint: 'from-[#e6eefb] to-[#f3f7fe]', name: { en: 'Scan & Pay at Shops', bn: 'দোকানে স্ক্যান করে পে' }, line: { en: 'Merchant payment offers are announced in the Rocket app.', bn: 'মার্চেন্ট পেমেন্ট অফার রকেট অ্যাপে জানানো হয়।' } },
]

/** "Rocket Offers": illustrated banners. Each points to the app, where live offers are announced. */
export function Offers() {
  const { t } = useI18n()
  const ref = useReveal<HTMLElement>()
  return (
    <section ref={ref} aria-labelledby="offers-h" className="pb-14 pt-4 md:pb-20">
      <div className="wrap">
        <div className="reveal flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[44rem]">
            <h2 id="offers-h" className="text-[clamp(1.9rem,3vw,2.7rem)] font-extrabold leading-[1.15] tracking-[-0.02em] text-ink">{t({ en: 'Rocket Offers', bn: 'রকেট অফার' })}</h2>
            <p className="font-display mt-3 text-ink-2">{t({ en: 'The latest campaigns from Dutch-Bangla Bank, all in one place.', bn: 'ডাচ্-বাংলা ব্যাংকের সর্বশেষ ক্যাম্পেইন, এক জায়গায়।' })}</p>
          </div>
          <a href={links.play} target="_blank" rel="noopener" className="group inline-flex items-center gap-1.5 text-[0.95rem] font-bold text-plum">{t({ en: 'See live offers in the app', bn: 'অ্যাপে চলমান অফার দেখুন' })}<ArrowUpRight size={17} aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a>
        </div>

        <ul className="mt-9 grid gap-5 md:grid-cols-3">
          {offers.map((o, i) => (
            <li key={i} className="reveal" data-d={i * 70}>
              <a href={links.play} target="_blank" rel="noopener" className={`group relative flex h-full min-h-[250px] overflow-hidden rounded-[18px] border border-[#d9e5f5] bg-gradient-to-br ${o.tint} p-6 transition-[transform,border-color,box-shadow] duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-plum hover:shadow-[0_24px_38px_-26px_rgba(137,40,143,0.5)]`}>
                <span className="relative z-[1] flex max-w-[58%] flex-col">
                  <span className="font-display text-[1.25rem] font-semibold leading-snug text-ink">{t(o.name)}</span>
                  <span className="mt-2 text-[0.9rem] leading-[1.55] text-ink-2">{t(o.line)}</span>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[0.9rem] font-bold text-plum">{t({ en: 'Check in the app', bn: 'অ্যাপে দেখুন' })}<ArrowUpRight size={16} aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
                </span>
                <OfferArt kind={o.art} className="absolute -bottom-2 -right-3 w-[56%] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-1.5 group-hover:rotate-[-3deg]" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
