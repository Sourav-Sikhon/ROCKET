import { Check } from 'lucide-react'
import { useI18n } from '../i18n'
import { Phone } from '../components/Phone'
import { PlayButton, UssdPlate, useReveal } from '../components/ui'
import type { L } from '../data/services'

// Features as listed on the official Google Play listing.
const features: L[] = [
  { en: 'Rocket account registration', bn: 'রকেট অ্যাকাউন্ট রেজিস্ট্রেশন' },
  { en: 'Cash-in and cash-out', bn: 'ক্যাশ ইন ও ক্যাশ আউট' },
  { en: 'Top-up, bill pay and merchant pay', bn: 'টপ-আপ, বিল পে ও মার্চেন্ট পে' },
  { en: 'Fund transfer to any Rocket account', bn: 'যেকোনো রকেট অ্যাকাউন্টে টাকা পাঠানো' },
  { en: 'Transfer to and from your linked DBBL account', bn: 'নিজের লিংকড ডিবিবিএল অ্যাকাউন্টে ও থেকে ট্রান্সফার' },
  { en: 'Balance, statement and account inquiry', bn: 'ব্যালেন্স, স্টেটমেন্ট ও অ্যাকাউন্ট ইনকোয়ারি' },
  { en: 'Find the nearest branch, ATM, agent or merchant', bn: 'কাছের শাখা, এটিএম, এজেন্ট বা মার্চেন্ট খুঁজুন' },
  { en: 'Bangla and English', bn: 'বাংলা ও ইংরেজি' },
]

/** Amber launch band: the download call, with three real screens lifting off. */
export function DownloadCta() {
  const { t } = useI18n()
  const ref = useReveal<HTMLElement>()
  return (
    <section ref={ref} aria-labelledby="dl-h" className="on-dark overflow-hidden bg-[linear-gradient(180deg,var(--color-foot-1),var(--color-foot-2))] text-white">
      <div className="wrap grid items-center gap-12 py-[var(--section)] lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h2 id="dl-h" className="h1 reveal">{t({ en: 'Download the Rocket app', bn: 'রকেট অ্যাপ ডাউনলোড করুন' })}</h2>
          <p className="mt-5 max-w-[46ch] text-[1.05rem] reveal" data-d="60">{t({ en: 'Dutch-Bangla Bank’s mobile banking app can be used by anybody with a mobile number of any operator and an Android phone.', bn: 'যেকোনো অপারেটরের মোবাইল নম্বর ও অ্যান্ড্রয়েড ফোন আছে এমন যে কেউ ডাচ্-বাংলা ব্যাংকের মোবাইল ব্যাংকিং অ্যাপ ব্যবহার করতে পারেন।' })}</p>
          <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2 reveal" data-d="120">
            {features.map((f, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[0.95rem] font-medium"><Check size={18} className="mt-0.5 shrink-0" aria-hidden />{t(f)}</li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap items-center gap-4 reveal" data-d="180">
            <PlayButton tone="light" />
            <UssdPlate dark />
          </div>
        </div>
        <div className="relative h-[400px] sm:h-[480px] lg:col-span-6" aria-hidden="true">
          <div className="absolute bottom-[-6%] left-[4%] w-[30%] -rotate-[6deg]"><Phone screen="cash-out" className="w-full" /></div>
          <div className="absolute bottom-[-10%] left-1/2 z-[2] w-[38%] -translate-x-1/2"><Phone screen="home" className="w-full" /></div>
          <div className="absolute bottom-[-6%] right-[4%] w-[30%] rotate-[6deg]"><Phone screen="store-locator" className="w-full" /></div>
        </div>
      </div>
    </section>
  )
}
