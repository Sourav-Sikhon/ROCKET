import { Mail } from 'lucide-react'
import { faqs, faqCats, links, SHOW_CONTENT_FLAGS, type FaqCat, type Faq as FaqT } from '../data/site'
import { useI18n, ui } from '../i18n'
import { TextLink, useReveal } from '../components/ui'

function QA({ f }: { f: FaqT }) {
  const { t } = useI18n()
  return (
    <div className="py-6 border-b border-rule reveal">
      <h3 className="h4">{t(f.q)}</h3>
      <p className="mt-2 text-ink-2 measure">{t(f.a)}</p>
      {f.confirm && SHOW_CONTENT_FLAGS && <p className="mt-3 inline-block rounded-[4px] bg-warn-bg px-3 py-1.5 text-[0.8rem] text-[#5c3700]">{t(ui.toConfirm)}: {t({ en: 'replace with the official figure from DBBL.', bn: 'ডিবিবিএলের অফিসিয়াল তথ্য দিয়ে প্রতিস্থাপন করুন।' })}</p>}
    </div>
  )
}

const homeKeys = ['How do I open a Rocket account?', 'Can I withdraw from an ATM without a card?', 'What does cash out cost?', 'I don’t have a smartphone. Can I still use Rocket?', 'Someone called asking for my PIN. What should I do?', 'Can my family abroad send money to my Rocket account?']

export function Faq({ standalone = false }: { standalone?: boolean }) {
  const { t } = useI18n()
  const ref = useReveal<HTMLElement>()
  const cats = Object.keys(faqCats) as FaqCat[]
  const home = faqs.filter((f) => homeKeys.includes(f.q.en))

  return (
    <section ref={ref} aria-labelledby="faq-h" className={standalone ? 'pb-[var(--section)] pt-14' : 'py-[var(--section)]'}>
      <div className="wrap grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2 id="faq-h" className={`${standalone ? 'h2' : 'h1'} reveal`}>{standalone ? t({ en: 'Questions & answers', bn: 'প্রশ্ন ও উত্তর' }) : t({ en: 'Questions people ask', bn: 'সাধারণ জিজ্ঞাসা' })}</h2>
            <div className="mt-8 bg-cream rounded-[4px] p-6 reveal" data-d="80">
              <p className="h4">{t({ en: 'Still need help?', bn: 'আরও সাহায্য দরকার?' })}</p>
              <p className="mt-2 small text-ink-2">{t({ en: 'Write to Dutch-Bangla Bank customer service, or use Help & Support in the Rocket app.', bn: 'ডাচ্-বাংলা ব্যাংক গ্রাহক সেবায় লিখুন, অথবা রকেট অ্যাপের হেল্প অ্যান্ড সাপোর্ট ব্যবহার করুন।' })}</p>
              <a href={`mailto:${links.email}`} className="mt-4 inline-flex items-center gap-2 font-semibold text-plum ulink break-all"><Mail size={16} aria-hidden />{links.email}</a>
            </div>
            {standalone && (
              <nav aria-label={t({ en: 'Topics', bn: 'বিষয়' })} className="mt-8 hidden lg:block">
                <ul className="space-y-2">
                  {cats.map((c) => <li key={c}><a href={`#faq-${c}`} className="ulink text-ink-2 hover:text-plum font-medium">{t(faqCats[c])}</a></li>)}
                </ul>
              </nav>
            )}
          </div>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          {standalone ? cats.map((c) => (
            <div key={c} id={`faq-${c}`} className="mb-14 scroll-mt-28">
              <h3 className="label text-plum pb-3 border-b-2 border-ink">{t(faqCats[c])}</h3>
              {faqs.filter((f) => f.cat === c).map((f) => <QA key={f.q.en} f={f} />)}
            </div>
          )) : (
            <>
              <div className="border-t-2 border-ink">{home.map((f) => <QA key={f.q.en} f={f} />)}</div>
              <div className="mt-8 reveal"><TextLink to="/help">{t({ en: 'All questions', bn: 'সব প্রশ্ন' })}</TextLink></div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
