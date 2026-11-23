import { Link } from 'react-router-dom'
import { ArrowRight, Headphones, Smartphone, Zap } from 'lucide-react'
import { useI18n } from '../i18n'
import { useReveal } from '../components/ui'

/** "About Rocket": copy, a framed photo, three short facts. Wording is limited to what the official pages state. */
export function About() {
  const { t } = useI18n()
  const ref = useReveal<HTMLElement>()
  const feats = [
    { icon: Zap, t: { en: 'Real-time banking', bn: 'রিয়েল-টাইম ব্যাংকিং' }, d: { en: 'Anywhere in the country', bn: 'দেশের যেকোনো জায়গায়' } },
    { icon: Headphones, t: { en: 'Helpline 16216', bn: 'হেল্পলাইন 16216' }, d: { en: 'For details on Rocket services', bn: 'রকেট সেবার বিস্তারিত জানতে' } },
    { icon: Smartphone, t: { en: 'Works on any phone', bn: 'যেকোনো ফোনে চলে' }, d: { en: 'Use the app or dial *322#', bn: 'অ্যাপ বা *322# ডায়াল করুন' } },
  ]
  return (
    <section ref={ref} aria-labelledby="about-h" className="pb-10 pt-12 lg:pt-16">
      <div className="wrap grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.04fr)_minmax(0,0.86fr)] lg:gap-14">
        <div className="reveal">
          <span className="inline-block rounded-full bg-lav px-4 py-1.5 text-[0.85rem] font-semibold text-[#540b8d]">{t({ en: 'About Rocket', bn: 'রকেট সম্পর্কে' })}</span>
          <h2 id="about-h" className="mt-5 max-w-[11.5ch] text-[clamp(2rem,3vw,2.75rem)] font-extrabold leading-[1.12] tracking-[-0.026em] text-ink">{t({ en: 'A Modern Way of Banking', bn: 'ব্যাংকিংয়ের আধুনিক উপায়' })}</h2>
          <p className="mt-5 max-w-[26rem] text-[1rem] leading-[1.7] text-ink-2">
            {t({ en: 'Rocket is Dutch-Bangla Bank’s mobile financial service, bringing banking closer to people’s hands with agents, DBBL ATMs and a real bank account behind it.', bn: 'রকেট ডাচ্-বাংলা ব্যাংকের মোবাইল আর্থিক সেবা, যার পেছনে আছে এজেন্ট, ডিবিবিএল এটিএম ও আসল ব্যাংক অ্যাকাউন্ট, ব্যাংকিংকে মানুষের হাতের কাছে নিয়ে আসে।' })}
          </p>
          <Link to="/about" className="btn btn-primary mt-8">{t({ en: 'Discover More', bn: 'আরও জানুন' })} <ArrowRight size={18} aria-hidden /></Link>
        </div>

        <figure className="reveal relative mx-auto w-full max-w-[460px] lg:max-w-none" data-d="80">
          <div aria-hidden className="absolute -inset-3 rounded-[38px] bg-white shadow-[0_30px_70px_-34px_rgba(137,40,143,0.45)]" />
          <img src="/hero/about-10-million.webp" width={1254} height={1254} alt={t({ en: 'Rocket, 10 Million+ users: the Rocket app on a phone beside the Dhaka skyline and Jatiya Sangsad Bhaban', bn: 'রকেট, ১ কোটির বেশি ব্যবহারকারী: ঢাকার স্কাইলাইন ও জাতীয় সংসদ ভবনের পাশে ফোনে রকেট অ্যাপ' })} loading="lazy"
            className="relative aspect-square w-full rounded-[30px] object-cover" />
        </figure>

        <ul className="grid gap-7 reveal" data-d="140">
          {feats.map((f, i) => (
            <li key={i} className="flex items-center gap-5">
              <span className="grid h-[76px] w-[76px] shrink-0 place-items-center rounded-[24px] bg-[linear-gradient(145deg,#f3eafe,#e6d8fb)] text-plum shadow-[inset_0_1px_0_#fff,0_14px_24px_-16px_rgba(137,40,143,0.5)]">
                <f.icon size={32} strokeWidth={1.7} aria-hidden />
              </span>
              <span>
                <span className="block text-[1.2rem] font-bold leading-snug text-ink">{t(f.t)}</span>
                <span className="mt-0.5 block text-[0.95rem] text-ink-3">{t(f.d)}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
