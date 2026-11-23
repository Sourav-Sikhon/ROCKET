import { FileText, Camera, IdCard } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useI18n, num, ui } from '../i18n'
import { PlayButton, useReveal } from '../components/ui'

// Official process: dutchbanglabank.com/rocket/how-to-open-account.html
export const openSteps = [
  { t: { en: 'Go to a Rocket agent', bn: 'রকেট এজেন্টের কাছে যান' }, d: { en: 'Hand over the filled-in KYC form with your photograph and National ID.', bn: 'পূরণ করা কেওয়াইসি ফর্ম, ছবি ও জাতীয় পরিচয়পত্র দিন।' } },
  { t: { en: 'Agent registers your number', bn: 'এজেন্ট নম্বর নিবন্ধন করবেন' }, d: { en: 'The agent enters your mobile number in Customer Registration on their phone.', bn: 'এজেন্ট তার ফোনের কাস্টমার রেজিস্ট্রেশন মেনুতে আপনার মোবাইল নম্বর দেবেন।' } },
  { t: { en: 'Set your 4-digit PIN', bn: '৪ সংখ্যার পিন সেট করুন' }, d: { en: 'You get an IVR call or USSD flash menu. Choose a PIN and remember it.', bn: 'আপনার ফোনে IVR কল বা USSD ফ্ল্যাশ মেনু আসবে। একটি পিন বেছে নিন এবং মনে রাখুন।' } },
  { t: { en: 'Your account number is made', bn: 'অ্যাকাউন্ট নম্বর তৈরি হবে' }, d: { en: 'Your mobile number plus one check digit. Remember the check digit.', bn: 'আপনার মোবাইল নম্বর ও একটি চেক ডিজিট। চেক ডিজিট মনে রাখুন।' } },
  { t: { en: 'SMS confirms it', bn: 'SMS নিশ্চিত করবে' }, d: { en: 'You receive your account number by SMS. Your Rocket account is ready.', bn: 'SMS-এ অ্যাকাউন্ট নম্বর পাবেন। আপনার রকেট অ্যাকাউন্ট প্রস্তুত।' } },
]

export const bring = [
  { icon: FileText, l: { en: 'Filled-in KYC form', bn: 'পূরণ করা কেওয়াইসি ফর্ম' } },
  { icon: Camera, l: { en: 'A photograph', bn: 'একটি ছবি' } },
  { icon: IdCard, l: { en: 'National ID (NID)', bn: 'জাতীয় পরিচয়পত্র (এনআইডি)' } },
]

/** Five steps as a launch sequence: one amber-topped column per step, no cards. */
export function OpenAccount() {
  const { t, lang } = useI18n()
  const ref = useReveal<HTMLElement>()
  return (
    <section ref={ref} aria-labelledby="open-h" className="py-[var(--section)]">
      <div className="wrap">
        <h2 id="open-h" className="h1 reveal max-w-[20ch]">{t({ en: 'How to open a Rocket account', bn: 'রকেট অ্যাকাউন্ট খোলার নিয়ম' })}</h2>
        <p className="lead mt-6 max-w-[52ch] reveal" data-d="60">{t({ en: 'Five steps at any Rocket agent. Rocket account registration is also available in the Rocket app.', bn: 'যেকোনো রকেট এজেন্টের কাছে পাঁচটি ধাপ। রকেট অ্যাপেও অ্যাকাউন্ট রেজিস্ট্রেশন করা যায়।' })}</p>

        <ol className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
          {openSteps.map((s, i) => (
            <li key={i} className="reveal border-t-[8px] border-amber pt-6" data-d={i * 70}>
              <span className="tabular block text-[3.4rem] font-extrabold leading-none text-plum-deep">{num(i + 1, lang)}</span>
              <h3 className="h4 mt-6">{t(s.t)}</h3>
              <p className="mt-2 text-[0.95rem] text-ink-2">{t(s.d)}</p>
            </li>
          ))}
        </ol>

        <div className="mt-16 flex flex-col gap-8 border-t border-rule pt-10 lg:flex-row lg:items-center lg:justify-between reveal">
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {bring.map((b, i) => <li key={i} className="flex items-center gap-2.5 font-semibold"><b.icon size={20} className="text-leaf" aria-hidden />{t(b.l)}</li>)}
          </ul>
          <div className="flex flex-wrap items-center gap-4">
            <PlayButton />
            <Link to="/open-account" className="pill-btn">{t(ui.howToOpen)}</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
