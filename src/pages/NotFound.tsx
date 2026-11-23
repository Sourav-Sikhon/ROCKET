import { Link } from 'react-router-dom'
import { useI18n, ui } from '../i18n'
import { useTitle } from './useTitle'

export default function NotFound() {
  const { t } = useI18n()
  useTitle({ en: 'Page not found', bn: 'পেজ পাওয়া যায়নি' })
  return (
    <section className="wrap py-[var(--section)]">
      <div className="max-w-[40rem]">
        <p aria-hidden className="tabular text-[7rem] sm:text-[10rem] font-bold leading-[0.85] tracking-tighter text-plum">404</p>
        <h1 className="h1 mt-6">{t({ en: 'We couldn’t find that page.', bn: 'পেজটি খুঁজে পাওয়া যায়নি।' })}</h1>
        <p className="lead mt-5">{t({ en: 'The page may have moved. Start from the home page or browse all services.', bn: 'পেজটি সরানো হয়ে থাকতে পারে। হোম পেজ থেকে শুরু করুন অথবা সব সেবা দেখুন।' })}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/" className="inline-flex min-h-[48px] items-center rounded-[4px] bg-cta px-5 font-semibold text-white hover:bg-cta-deep">{t(ui.home)}</Link>
          <Link to="/services" className="inline-flex min-h-[48px] items-center rounded-[4px] px-5 font-semibold text-plum hover:bg-cream">{t(ui.allServices)}</Link>
        </div>
      </div>
    </section>
  )
}
