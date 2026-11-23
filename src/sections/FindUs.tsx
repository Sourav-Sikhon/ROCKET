import { ArrowUpRight, Building2, Landmark, Store, UserRound } from 'lucide-react'
import { useI18n } from '../i18n'
import { Phone } from '../components/Phone'
import { links } from '../data/site'
import type { L } from '../data/services'
import { useReveal } from '../components/ui'

// Locations as listed in the Rocket app's Store Locator and on the original site.
const kinds: { icon: typeof Store; l: L; d: L }[] = [
  { icon: UserRound, l: { en: 'Rocket agents', bn: 'রকেট এজেন্ট' }, d: { en: 'Open an account, cash in and cash out.', bn: 'অ্যাকাউন্ট খোলা, ক্যাশ ইন ও ক্যাশ আউট।' } },
  { icon: Landmark, l: { en: 'DBBL branches', bn: 'ডিবিবিএল শাখা' }, d: { en: 'Cash in and cash out at any branch.', bn: 'যেকোনো শাখায় ক্যাশ ইন ও ক্যাশ আউট।' } },
  { icon: Building2, l: { en: 'DBBL ATMs', bn: 'ডিবিবিএল এটিএম' }, d: { en: 'Withdraw with your Rocket number and PIN.', bn: 'রকেট নম্বর ও পিন দিয়ে টাকা তুলুন।' } },
  { icon: Store, l: { en: 'Merchants', bn: 'মার্চেন্ট' }, d: { en: 'Pay for shopping from your Rocket account.', bn: 'রকেট অ্যাকাউন্ট থেকে কেনাকাটার পেমেন্ট।' } },
]

/**
 * No public location API exists, so this shows no invented results; it
 * routes to the official Store Locator in the Rocket app.
 */
export function FindUs({ standalone = false }: { standalone?: boolean }) {
  const { t } = useI18n()
  const ref = useReveal<HTMLElement>()
  return (
    <section ref={ref} aria-labelledby="find-h" className={standalone ? 'pb-[var(--section)] pt-14' : 'py-[var(--section)]'}>
      <div className="wrap">
        {standalone
          ? <h2 id="find-h" className="sr-only">{t({ en: 'Rocket points', bn: 'রকেট পয়েন্ট' })}</h2>
          : <>
              <h2 id="find-h" className="sect-title reveal">{t({ en: 'Nearest Rocket points', bn: 'কাছের রকেট পয়েন্ট' })}</h2>
              <p className="sect-intro mt-4 reveal" data-d="60">{t({ en: 'The live map is in the Rocket app’s Store Locator, so the information is always current.', bn: 'লাইভ ম্যাপ রকেট অ্যাপের স্টোর লোকেটরে, তাই তথ্য সবসময় হালনাগাদ।' })}</p>
            </>}

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-12">
          <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-8">
            {kinds.map((k, i) => (
              <li key={i} className="tile hov p-6 reveal" data-d={(i % 2) * 70}>
                <span className="grid h-14 w-14 place-items-center rounded-full bg-cream text-plum"><k.icon size={26} strokeWidth={1.75} aria-hidden /></span>
                <h3 className="h3 mt-4">{t(k.l)}</h3>
                <p className="mt-1.5 text-ink-2">{t(k.d)}</p>
              </li>
            ))}
            <li className="sm:col-span-2 flex flex-col items-start gap-3 reveal">
              <a href={links.play} target="_blank" rel="noopener" className="inline-flex min-h-[48px] items-center gap-2 rounded-[10px] bg-cta px-6 font-bold text-white transition-colors hover:bg-cta-deep">
                {t({ en: 'Open Store Locator in the app', bn: 'অ্যাপে স্টোর লোকেটর খুলুন' })} <ArrowUpRight size={18} aria-hidden />
              </a>
              <p className="small text-ink-3">{t({ en: 'Store Locator is on the app’s login screen, so you can search before you sign in.', bn: 'স্টোর লোকেটর অ্যাপের লগইন স্ক্রিনেই আছে, তাই সাইন ইনের আগেই খুঁজতে পারবেন।' })}</p>
            </li>
          </ul>
          <div className="relative hidden h-[330px] overflow-hidden rounded-[14px] bg-cream-2 lg:col-span-4 lg:block">
            <Phone screen="store-locator" className="absolute left-1/2 top-8 w-[230px] -translate-x-1/2 reveal" />
          </div>
        </div>
      </div>
    </section>
  )
}
