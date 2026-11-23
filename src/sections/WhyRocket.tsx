import { useI18n, num } from '../i18n'
import { useReveal } from '../components/ui'
import type { L } from '../data/services'

// The four benefits and their images are the ones on the original Rocket site.
export const reasons: { k: L; v: L; img: string }[] = [
  { k: { en: 'Real-time online banking', bn: 'রিয়েল-টাইম অনলাইন ব্যাংকিং' }, img: '/original/benefit-online.png',
    v: { en: 'Available anywhere in the country: registration, cash-in, cash-out, mobile top-up, P2P, foreign remittance, salary disbursement, balance inquiry, bill payment and merchant payment.', bn: 'দেশের যেকোনো জায়গায়: রেজিস্ট্রেশন, ক্যাশ ইন, ক্যাশ আউট, মোবাইল টপ-আপ, পি২পি, বৈদেশিক রেমিট্যান্স, বেতন বিতরণ, ব্যালেন্স ইনকোয়ারি, বিল পেমেন্ট ও মার্চেন্ট পেমেন্ট।' } },
  { k: { en: 'Affordable access', bn: 'সাশ্রয়ী সুবিধা' }, img: '/original/benefit-affordable.png',
    v: { en: 'Available through authorised agents nationwide, including remote areas, and faster than other forms of banking.', bn: 'দুর্গম এলাকাসহ সারা দেশে অনুমোদিত এজেন্টের মাধ্যমে পাওয়া যায়, অন্যান্য ব্যাংকিং মাধ্যমের চেয়ে দ্রুত।' } },
  { k: { en: 'Secure money transfer', bn: 'নিরাপদ অর্থ লেনদেন' }, img: '/original/benefit-secure.png',
    v: { en: 'No one can withdraw or deposit unwanted money without possession of the mobile set, the PIN and the check digit all together.', bn: 'মোবাইল সেট, পিন ও চেক ডিজিট একসাথে হাতে না পেলে কেউ অনাকাঙ্ক্ষিতভাবে টাকা তুলতে বা জমা দিতে পারে না।' } },
  { k: { en: 'A habit of saving', bn: 'সঞ্চয়ের অভ্যাস' }, img: '/original/benefit-saving.png',
    v: { en: 'Much more effective in developing a savings habit.', bn: 'সঞ্চয়ের অভ্যাস গড়ে তুলতে অনেক বেশি কার্যকর।' } },
]

/** Benefits as alternating bands: one fixed 4:3 frame per benefit, so every image aligns. */
export function WhyRocket() {
  const { t, lang } = useI18n()
  const ref = useReveal<HTMLElement>()
  return (
    <section ref={ref} aria-labelledby="why-h" className="bg-cream py-[var(--section)]">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="why-h" className="h1 reveal lg:col-span-7">{t({ en: 'Banking for everyone with Rocket', bn: 'রকেটে সবার জন্য ব্যাংকিং' })}</h2>
          <p className="lead reveal lg:col-span-5" data-d="80">{t({ en: 'Dutch-Bangla Bank says it introduced Rocket on 31 March 2011 to provide modern banking services to the unbanked population at an affordable cost or free of charge.', bn: 'ডাচ্-বাংলা ব্যাংক জানায়, ব্যাংকিং সেবার বাইরে থাকা মানুষকে সাশ্রয়ী খরচে বা বিনামূল্যে আধুনিক ব্যাংকিং সেবা দিতে তারা ৩১ মার্চ ২০১১ রকেট চালু করে।' })}</p>
        </div>
        <ol className="mt-16 space-y-16 sm:space-y-20">
          {reasons.map((r, i) => (
            <li key={i} className="grid items-center gap-8 md:grid-cols-12 reveal" data-d={i * 60}>
              <figure className={`md:col-span-6 ${i % 2 ? 'md:order-2' : ''}`}>
                <img src={r.img} width={300} height={225} alt="" loading="lazy" className="aspect-[4/3] w-full rounded-[22px] bg-white object-cover" />
              </figure>
              <div className={`md:col-span-6 ${i % 2 ? 'md:order-1' : 'md:pl-6'}`}>
                <p className="tabular text-[1rem] font-extrabold text-cta">{num(String(i + 1).padStart(2, '0'), lang)}</p>
                <h3 className="h2 mt-3">{t(r.k)}</h3>
                <p className="lead mt-4 max-w-[36rem]">{t(r.v)}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
