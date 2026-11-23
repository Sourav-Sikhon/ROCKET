import { useI18n } from '../i18n'
import { useReveal } from '../components/ui'
import type { L } from '../data/services'

// Trophy and plaque images are cropped from the original Rocket site's award images
// (the lettering baked into them is removed); every name is live text in both languages.
// A detail line appears only where the original image itself states it.
export const awardCards: { img: string; w: number; h: number; t: L; d?: L }[] = [
  { img: '/original/award-digital-2.jpg', w: 447, h: 447, t: { en: 'Digital World 2015 ICT Achievement Award', bn: 'ডিজিটাল ওয়ার্ল্ড ২০১৫ আইসিটি অ্যাচিভমেন্ট অ্যাওয়ার্ড' }, d: { en: 'Best Digital Bank, with ICT Division and BASIS', bn: 'সেরা ডিজিটাল ব্যাংক, আইসিটি বিভাগ ও বেসিস' } },
  { img: '/original/award-1-crop.jpg', w: 168, h: 209, t: { en: 'The Asian Bankers’ Award', bn: 'দ্য এশিয়ান ব্যাংকার্স অ্যাওয়ার্ড' }, d: { en: 'Best Mobile Banking Initiative Award 2012', bn: 'সেরা মোবাইল ব্যাংকিং উদ্যোগ পুরস্কার ২০১২' } },
  { img: '/original/award-2-crop.jpg', w: 180, h: 208, t: { en: 'National Digital Innovation Award', bn: 'জাতীয় ডিজিটাল উদ্ভাবন পুরস্কার' } },
  { img: '/original/award-3-crop.jpg', w: 300, h: 234, t: { en: 'Mobile Money Transfer (MMT) Award', bn: 'মোবাইল মানি ট্রান্সফার (এমএমটি) অ্যাওয়ার্ড' } },
  { img: '/original/award-4-crop.jpg', w: 100, h: 335, t: { en: 'eAsia Driving Economy Award', bn: 'ই-এশিয়া ড্রাইভিং ইকোনমি অ্যাওয়ার্ড' } },
  { img: '/original/award-5-crop.jpg', w: 300, h: 342, t: { en: 'ComputerWorld (USA) Laureate', bn: 'কম্পিউটারওয়ার্ল্ড (যুক্তরাষ্ট্র) লরিয়েট' }, d: { en: '2012, for Economic Development', bn: '২০১২, অর্থনৈতিক উন্নয়নের জন্য' } },
]

/** Recognition in six identical square frames, so every image sits on the same centre line. */
export function Awards() {
  const { t } = useI18n()
  const ref = useReveal<HTMLElement>()
  return (
    <section ref={ref} aria-labelledby="aw-h" className="bg-cream py-[var(--section)]">
      <div className="wrap">
        <h2 id="aw-h" className="h1 reveal max-w-[18ch]">{t({ en: 'Awards and recognition', bn: 'পুরস্কার ও স্বীকৃতি' })}</h2>
        <ul className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {awardCards.map((a, i) => (
            <li key={a.img} className="reveal" data-d={(i % 3) * 70}>
              <figure>
                <div className="flex aspect-square items-center justify-center rounded-[22px] bg-white p-10">
                  <img src={a.img} width={a.w} height={a.h} alt="" loading="lazy" className="max-h-full max-w-full object-contain" />
                </div>
                <figcaption className="mt-5">
                  <p className="h4">{t(a.t)}</p>
                  {a.d && <p className="mt-1 text-[0.95rem] text-ink-2">{t(a.d)}</p>}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
