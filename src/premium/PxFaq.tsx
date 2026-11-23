import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Plus } from 'lucide-react'
import { faqs } from '../data/site'
import { useI18n } from '../i18n'

// The first questions people ask, taken from the site's own FAQ data.
const picks = faqs.filter((f) => !f.confirm).slice(0, 7)

/** Q&A: a sticky title beside a one-open-at-a-time accordion that grows with a smooth height transition. */
export function PxFaq() {
  const { t } = useI18n()
  const [open, setOpen] = useState(0)
  return (
    <section aria-labelledby="px-qa-h" className="bg-[var(--px-soft)] py-20 md:py-28">
      <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <div className="lg:sticky lg:top-[120px] lg:self-start">
          <h2 id="px-qa-h" className="text-[clamp(2.6rem,5.4vw,5rem)] font-extrabold text-[var(--px-ink)]">{t({ en: 'Questions, answered.', bn: 'প্রশ্ন, উত্তরসহ।' })}</h2>
          <p className="mt-5 max-w-[24rem] text-[1.08rem] font-medium leading-[1.55] text-[var(--px-ink)]/70">{t({ en: 'The basics, in plain words. More in the help centre.', bn: 'মূল বিষয়গুলো সহজ ভাষায়। আরও আছে সাহায্য কেন্দ্রে।' })}</p>
          <Link to="/help" className="group mt-8 inline-flex items-center gap-2 text-[1rem] font-bold text-[var(--px-purple)]">
            {t({ en: 'Open the help centre', bn: 'সাহায্য কেন্দ্র খুলুন' })}<ArrowRight size={18} aria-hidden className="transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </div>
        <ul className="space-y-3">
          {picks.map((f, i) => {
            const isOpen = open === i
            return (
              <li key={i} className={`overflow-hidden rounded-[22px] border bg-white transition-[border-color,box-shadow] duration-500 ${isOpen ? 'border-[var(--px-purple)] shadow-[0_24px_40px_-30px_rgba(137,40,143,0.55)]' : 'border-[var(--px-line)]'}`}>
                <h3>
                  <button type="button" aria-expanded={isOpen} aria-controls={`qa-${i}`} onClick={() => setOpen(isOpen ? -1 : i)} className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left md:px-7">
                    <span className="text-[clamp(1.1rem,1.5vw,1.3rem)] font-bold leading-snug tracking-[-0.01em] text-[var(--px-ink)]">{t(f.q)}</span>
                    <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition-[background-color,color,transform] duration-500 ease-[var(--ease-out-expo)] ${isOpen ? 'rotate-[135deg] bg-[var(--px-purple)] text-white' : 'bg-[var(--px-soft)] text-[var(--px-purple)]'}`}><Plus size={20} aria-hidden /></span>
                  </button>
                </h3>
                <div id={`qa-${i}`} role="region" className={`grid transition-[grid-template-rows] duration-500 ease-[var(--ease-out-expo)] ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <p className="overflow-hidden px-6 text-[1.02rem] font-medium leading-[1.6] text-[var(--px-ink)]/75 md:px-7"><span className="block pb-6">{t(f.a)}</span></p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
