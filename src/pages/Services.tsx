import { Link, useParams } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { services, categories, bySlug, type Category } from '../data/services'
import { useI18n, num, ui } from '../i18n'
import { Icon } from '../components/Icon'
import { Phone } from '../components/Phone'
import { PageHead, PlayButton, UssdPlate, ContentFlag, useReveal } from '../components/ui'
import { faqs } from '../data/site'
import { useTitle } from './useTitle'
import NotFound from './NotFound'

const cats: Category[] = ['cash', 'transfer', 'payments', 'banking']

export function ServicesIndex() {
  const { t } = useI18n()
  const ref = useReveal<HTMLDivElement>()
  useTitle(ui.services)
  return (
    <>
      <PageHead crumbs={[{ label: t(ui.services) }]} title={t({ en: 'Every Rocket service.', bn: 'রকেটের সব সেবা।' })}
        lead={t({ en: 'Twelve services in four groups. Each opens a step-by-step guide taken from Dutch-Bangla Bank’s official instructions.', bn: 'চারটি ভাগে বারোটি সেবা। প্রতিটিতে ডাচ্-বাংলা ব্যাংকের অফিসিয়াল নির্দেশনা থেকে ধাপে ধাপে গাইড।' })}>
        <UssdPlate />
      </PageHead>
      <div ref={ref} className="wrap py-[calc(var(--section)*0.8)] space-y-20">
        {cats.map((c) => (
          <section key={c} aria-labelledby={`cat-${c}`} className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4 reveal">
              <h2 id={`cat-${c}`} className="h2">{t(categories[c].name)}</h2>
              <p className="mt-3 text-ink-2">{t(categories[c].blurb)}</p>
            </div>
            <ul className="lg:col-span-8 border-t-2 border-ink">
              {services.filter((s) => s.category === c).map((s, i) => (
                <li key={s.slug} className="reveal" data-d={i * 60}>
                  <Link to={`/services/${s.slug}`} className="group grid grid-cols-[48px_1fr_auto] items-center gap-5 py-6 border-b border-rule">
                    <span className="grid place-items-center w-12 h-12 rounded-full bg-cream text-plum transition-colors group-hover:bg-plum group-hover:text-white"><Icon name={s.icon} size={22} /></span>
                    <span>
                      <span className="block h3 group-hover:text-plum">{t(s.name)}</span>
                      <span className="block small text-ink-3 mt-0.5">{t(s.short)}</span>
                    </span>
                    <ArrowRight size={20} aria-hidden className="text-plum transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  )
}

export function ServiceDetail() {
  const { slug = '' } = useParams()
  const s = bySlug(slug)
  const { t, lang } = useI18n()
  const ref = useReveal<HTMLDivElement>()
  useTitle(s ? s.name : { en: 'Not found', bn: 'পাওয়া যায়নি' })
  if (!s) return <NotFound />
  const related = s.related.map(bySlug).filter(Boolean)
  const qs = faqs.filter((f) => (f.q.en + f.a.en).toLowerCase().includes(s.name.en.split(' ')[0].toLowerCase())).slice(0, 3)

  return (
    <>
      <PageHead crumbs={[{ to: '/services', label: t(ui.services) }, { label: t(s.name) }]} title={t(s.name)} lead={t(s.intro)}>
        <span className="grid place-items-center w-20 h-20 rounded-full bg-white text-plum"><Icon name={s.icon} size={36} /></span>
      </PageHead>

      <div ref={ref} className="wrap grid gap-14 lg:grid-cols-12 py-[calc(var(--section)*0.75)]">
        <div className="lg:col-span-7">
          <section aria-labelledby="how-h">
            <h2 id="how-h" className="h2 reveal">{t(ui.steps)}</h2>
            <ol className="mt-6 border-t-2 border-ink">
              {s.steps.map((st, i) => (
                <li key={i} className="grid grid-cols-[72px_1fr] items-start gap-4 py-6 border-b border-rule reveal" data-d={i * 60}>
                  <span aria-hidden className="tabular text-[3.4rem] font-bold leading-[0.9] tracking-tighter text-plum">{num(i + 1, lang)}</span>
                  <p className="pt-1 text-[1.08rem] leading-relaxed">{t(st)}</p>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="where-h" className="mt-16">
            <h2 id="where-h" className="h3 reveal">{t(ui.whereToUse)}</h2>
            <ul className="mt-5 grid gap-2.5">
              {s.channels.map((c, i) => (
                <li key={i} className="flex gap-3 reveal"><Check size={20} className="text-leaf shrink-0 mt-0.5" aria-hidden />{t(c)}</li>
              ))}
            </ul>
          </section>

          {s.notes && (
            <section aria-labelledby="know-h" className="mt-12 bg-cream rounded-[4px] p-6 reveal">
              <h2 id="know-h" className="h4">{t(ui.goodToKnow)}</h2>
              <ul className="mt-2 space-y-1.5 text-ink-2">{s.notes.map((n, i) => <li key={i}>{t(n)}</li>)}</ul>
            </section>
          )}

          <section aria-labelledby="chg-h" className="mt-12 border-t border-rule pt-8 reveal">
            <h2 id="chg-h" className="h4">{t(ui.charges)}</h2>
            <p className="mt-2 text-ink-2 measure">{t(ui.chargesBody)}</p>
            <ContentFlag text={s.confirm} />
          </section>

          {qs.length > 0 && (
            <section aria-labelledby="sfaq-h" className="mt-14">
              <h2 id="sfaq-h" className="h3">{t(ui.faq)}</h2>
              <dl className="mt-4 border-t-2 border-ink">
                {qs.map((f) => (
                  <div key={f.q.en} className="py-5 border-b border-rule">
                    <dt className="font-semibold">{t(f.q)}</dt>
                    <dd className="mt-1.5 text-ink-2">{t(f.a)}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}
        </div>

        <aside className="lg:col-span-4 lg:col-start-9">
          <div className="lg:sticky lg:top-28 space-y-8">
            <div className="flex justify-center lg:justify-start"><Phone screen={s.screen} className="w-[230px]" priority /></div>
            <div className="space-y-3">
              <PlayButton className="w-full" />
              <UssdPlate />
            </div>
          </div>
        </aside>
      </div>

      <section aria-labelledby="rel-h" className="bg-cream">
        <div className="wrap py-[calc(var(--section)*0.7)]">
          <h2 id="rel-h" className="h3">{t(ui.related)}</h2>
          <ul className="mt-6 grid gap-x-10 sm:grid-cols-3 border-t-2 border-ink">
            {related.map((r) => r && (
              <li key={r.slug}>
                <Link to={`/services/${r.slug}`} className="group flex items-start gap-4 py-6 border-b border-rule">
                  <span className="text-plum mt-0.5"><Icon name={r.icon} size={22} /></span>
                  <span>
                    <span className="block font-semibold group-hover:text-plum">{t(r.name)}</span>
                    <span className="block small text-ink-3">{t(r.short)}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
