import { ArrowUpRight, Mail } from 'lucide-react'
import { useI18n, num, ui } from '../i18n'
import { PageHead, PlayButton, UssdPlate, TextLink, useReveal } from '../components/ui'
import { Phone } from '../components/Phone'
import { openSteps, bring } from '../sections/OpenAccount'
import { reasons } from '../sections/WhyRocket'
import { FindUs as FindUsSection } from '../sections/FindUs'
import { Security as SecuritySection, NoticeBoard } from '../sections/Trust'
import { Faq } from '../sections/Faq'
import { DownloadCta } from '../sections/DownloadCta'
import { awards, links } from '../data/site'
import { useTitle } from './useTitle'

export function OpenAccountPage() {
  const { t, lang } = useI18n()
  const ref = useReveal<HTMLDivElement>()
  useTitle(ui.howToOpen)
  return (
    <>
      <PageHead crumbs={[{ label: t(ui.howToOpen) }]} title={t({ en: 'Open a Rocket account', bn: 'রকেট অ্যাকাউন্ট খুলুন' })}
        lead={t({ en: 'Anyone with a mobile number and a National ID can open a Rocket account at an agent. The whole process takes five steps.', bn: 'মোবাইল নম্বর ও জাতীয় পরিচয়পত্র থাকলে যে কেউ এজেন্টের কাছে রকেট অ্যাকাউন্ট খুলতে পারেন। পুরো প্রক্রিয়া পাঁচটি ধাপে।' })} />
      <div ref={ref} className="wrap grid gap-14 lg:grid-cols-12 py-[calc(var(--section)*0.75)]">
        <div className="lg:col-span-7">
          <h2 className="h2 reveal">{t({ en: 'At a Rocket agent', bn: 'রকেট এজেন্টের কাছে' })}</h2>
          <ol className="mt-6 border-t-2 border-ink">
            {openSteps.map((s, i) => (
              <li key={i} className="grid grid-cols-[84px_1fr] items-start gap-4 py-8 border-b border-rule reveal" data-d={i * 60}>
                <span aria-hidden className="tabular text-[4.4rem] font-bold leading-[0.85] tracking-tighter text-plum">{num(i + 1, lang)}</span>
                <div className="pt-1">
                  <h3 className="h3">{t(s.t)}</h3>
                  <p className="mt-1.5 text-ink-2 measure">{t(s.d)}</p>
                </div>
              </li>
            ))}
          </ol>
          <section className="mt-16 reveal" aria-labelledby="app-reg">
            <h2 id="app-reg" className="h3">{t({ en: 'Or register in the Rocket app', bn: 'অথবা রকেট অ্যাপে নিবন্ধন করুন' })}</h2>
            <p className="mt-2 text-ink-2 measure">{t({ en: 'Rocket account registration is listed among the app’s features on Google Play. Install the app and follow its on-screen registration.', bn: 'গুগল প্লেতে রকেট অ্যাপের ফিচারের তালিকায় অ্যাকাউন্ট নিবন্ধন আছে। অ্যাপ ইনস্টল করে স্ক্রিনের নির্দেশনা অনুসরণ করুন।' })}</p>
            <div className="mt-5"><PlayButton /></div>
          </section>
        </div>
        <aside className="lg:col-span-4 lg:col-start-9 space-y-10">
          <div className="bg-cream rounded-[4px] p-6 reveal">
            <h2 className="h4">{t({ en: 'Bring with you', bn: 'সাথে আনুন' })}</h2>
            <ul className="mt-4 space-y-3">{bring.map((b, i) => <li key={i} className="flex items-center gap-3 font-medium"><b.icon size={20} className="text-leaf" aria-hidden />{t(b.l)}</li>)}</ul>
          </div>
          <div className="plate p-6 reveal">
            <h2 className="h4">{t({ en: 'Remember two things', bn: 'দুটি জিনিস মনে রাখুন' })}</h2>
            <p className="mt-2 text-ink-2">{t({ en: 'Your 4-digit PIN and your check digit. Never write them on your phone or share them.', bn: 'আপনার ৪ সংখ্যার পিন ও চেক ডিজিট। ফোনে লিখে রাখবেন না, কাউকে বলবেন না।' })}</p>
          </div>
          <div className="flex justify-center"><Phone screen="login" className="w-[220px]" /></div>
        </aside>
      </div>
      <DownloadCta />
    </>
  )
}

export function BenefitsPage() {
  const { t, lang } = useI18n()
  const ref = useReveal<HTMLDivElement>()
  useTitle(ui.benefits)
  return (
    <>
      <PageHead crumbs={[{ label: t(ui.benefits) }]} title={t({ en: 'What Rocket gives you', bn: 'রকেট আপনাকে যা দেয়' })}
        lead={t({ en: 'The benefits Dutch-Bangla Bank lists for Rocket, in plain words.', bn: 'ডাচ্-বাংলা ব্যাংকের তালিকাভুক্ত রকেটের সুবিধাগুলো, সহজ ভাষায়।' })} />
      <div ref={ref} className="wrap py-[calc(var(--section)*0.75)]">
        <ol className="border-t-2 border-ink">
          {reasons.map((r, i) => (
            <li key={i} className="grid gap-4 md:grid-cols-12 py-10 border-b border-rule reveal" data-d={i * 60}>
              <span aria-hidden className="md:col-span-1 tabular text-[2.4rem] font-bold leading-none text-plum">{num(i + 1, lang)}</span>
              <h2 className="md:col-span-5 h2">{t(r.k)}</h2>
              <p className="md:col-span-6 lead">{t(r.v)}</p>
            </li>
          ))}
        </ol>
        <div className="mt-14 flex flex-wrap gap-x-8 gap-y-3 reveal">
          <TextLink to="/open-account">{t(ui.howToOpen)}</TextLink>
          <TextLink to="/services">{t(ui.allServices)}</TextLink>
        </div>
      </div>
    </>
  )
}

export function FindUsPage() {
  const { t } = useI18n()
  useTitle(ui.findUs)
  return (
    <>
      <PageHead crumbs={[{ label: t(ui.findUs) }]} title={t({ en: 'Find agents, branches and ATMs', bn: 'এজেন্ট, শাখা ও এটিএম খুঁজুন' })}
        lead={t({ en: 'Rocket works at authorised agents across Bangladesh, every Dutch-Bangla Bank branch and every DBBL ATM. The live map is in the app’s Store Locator.', bn: 'রকেট চলে সারা বাংলাদেশের অনুমোদিত এজেন্ট, প্রতিটি ডাচ্-বাংলা ব্যাংক শাখা ও প্রতিটি ডিবিবিএল এটিএমে। লাইভ ম্যাপ আছে অ্যাপের স্টোর লোকেটরে।' })} />
      <FindUsSection standalone />
      <NoticeBoard limit={3} />
    </>
  )
}

export function SecurityPage() {
  const { t } = useI18n()
  useTitle(ui.security)
  return (
    <>
      <PageHead crumbs={[{ label: t(ui.security) }]} title={t({ en: 'Keep your Rocket account safe', bn: 'রকেট অ্যাকাউন্ট নিরাপদ রাখুন' })}
        lead={t({ en: 'Rocket is protected by three keys: your phone, your PIN and your check digit. Fraud starts when someone talks you out of one of them.', bn: 'রকেট সুরক্ষিত তিনটি চাবিতে: আপনার ফোন, পিন ও চেক ডিজিট। প্রতারণা শুরু হয় যখন কেউ এর একটি আপনার কাছ থেকে নিয়ে নেয়।' })} />
      <SecuritySection standalone />
      <NoticeBoard />
    </>
  )
}

export function NoticesPage() {
  const { t } = useI18n()
  useTitle(ui.notices)
  return (
    <>
      <PageHead crumbs={[{ label: t(ui.notices) }]} title={t(ui.notices)}
        lead={t({ en: 'Official agent lists, awareness material and brochures published by Dutch-Bangla Bank. Each opens as a PDF on dutchbanglabank.com.', bn: 'ডাচ্-বাংলা ব্যাংক প্রকাশিত অফিসিয়াল এজেন্ট তালিকা, সচেতনতা উপকরণ ও ব্রোশিওর। প্রতিটি dutchbanglabank.com-এ পিডিএফ হিসেবে খুলবে।' })} />
      <NoticeBoard heading={false} />
    </>
  )
}

export function HelpPage() {
  const { t } = useI18n()
  useTitle(ui.help)
  return (
    <>
      <PageHead crumbs={[{ label: t(ui.help) }]} title={t(ui.help)}
        lead={t({ en: 'Answers to common questions, and how to reach Dutch-Bangla Bank when you need a person.', bn: 'সাধারণ প্রশ্নের উত্তর, এবং প্রয়োজনে ডাচ্-বাংলা ব্যাংকের সাথে যোগাযোগের উপায়।' })}>
        <a href={`mailto:${links.email}`} className="inline-flex items-center gap-2 font-semibold text-plum ulink"><Mail size={18} aria-hidden />{t({ en: 'Email customer service', bn: 'গ্রাহক সেবায় ইমেইল' })}</a>
      </PageHead>
      <Faq standalone />
      <section className="bg-cream" aria-labelledby="contact-h">
        <div className="wrap grid gap-10 md:grid-cols-3 py-[calc(var(--section)*0.7)]">
          <h2 id="contact-h" className="h2 md:col-span-3">{t({ en: 'Other ways to get help', bn: 'সাহায্যের অন্যান্য উপায়' })}</h2>
          {[
            { h: { en: 'In the app', bn: 'অ্যাপে' }, p: { en: 'Help & Support is on the app’s login screen, before you sign in.', bn: 'অ্যাপের লগইন স্ক্রিনেই হেল্প অ্যান্ড সাপোর্ট আছে।' } },
            { h: { en: 'Head office', bn: 'প্রধান কার্যালয়' }, p: { en: 'Dutch-Bangla Bank PLC. Phone (8802) 47110465, 47115155, 47114795.', bn: 'ডাচ্-বাংলা ব্যাংক পিএলসি। ফোন (৮৮০২) ৪৭১১০৪৬৫, ৪৭১১৫১৫৫, ৪৭১১৪৭৯৫।' } },
            { h: { en: 'Rocket on Facebook', bn: 'ফেসবুকে রকেট' }, p: { en: 'Official updates at facebook.com/TakarRocket.', bn: 'অফিসিয়াল আপডেট: facebook.com/TakarRocket।' } },
          ].map((c, i) => (
            <div key={i} className="border-t-2 border-ink pt-5">
              <h3 className="h4">{t(c.h)}</h3>
              <p className="mt-2 text-ink-2">{t(c.p)}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export function AboutPage() {
  const { t } = useI18n()
  const ref = useReveal<HTMLDivElement>()
  useTitle(ui.about)
  const facts = [
    { k: { en: 'Bank-led', bn: 'ব্যাংক-নেতৃত্বাধীন' }, v: { en: 'Rocket fulfils basic banking needs through mobile phones, run by a bank rather than a telecom.', bn: 'রকেট মোবাইল ফোনের মাধ্যমে মৌলিক ব্যাংকিং চাহিদা পূরণ করে, টেলিকম নয়, ব্যাংক পরিচালিত।' } },
    { k: { en: 'An account, not a wallet', bn: 'অ্যাকাউন্ট, ওয়ালেট নয়' }, v: { en: 'Deposits are balance in your Rocket account, like a savings or current account, not electronic money.', bn: 'জমা টাকা সঞ্চয়ী বা চলতি অ্যাকাউন্টের মতো রকেট অ্যাকাউন্টের ব্যালেন্স, ইলেকট্রনিক মানি নয়।' } },
    { k: { en: 'Four parties', bn: 'চার পক্ষ' }, v: { en: 'Bank, mobile network operators, agents and customers, each with a role and incentive.', bn: 'ব্যাংক, মোবাইল নেটওয়ার্ক অপারেটর, এজেন্ট ও গ্রাহক, প্রত্যেকের নিজস্ব ভূমিকা।' } },
    { k: { en: 'Four cash tiers', bn: 'চার স্তরের ক্যাশ' }, v: { en: 'Customers, agents, super agents and bank branches, so all cash is ultimately deposited at a branch.', bn: 'গ্রাহক, এজেন্ট, সুপার এজেন্ট ও ব্যাংক শাখা, তাই সব টাকা শেষে শাখায় জমা হয়।' } },
    { k: { en: 'Four geographic tiers', bn: 'চার ভৌগোলিক স্তর' }, v: { en: 'Territory, upazila, district and division, with local offices for close supervision.', bn: 'টেরিটরি, উপজেলা, জেলা ও বিভাগ, নিবিড় তত্ত্বাবধানে স্থানীয় অফিস।' } },
  ]
  return (
    <>
      <PageHead crumbs={[{ label: t(ui.about) }]} title={t({ en: 'Banking for the unbanked, since 2011', bn: '২০১১ থেকে ব্যাংকিংয়ের বাইরের মানুষের জন্য ব্যাংকিং' })}
        lead={t({ en: 'Dutch-Bangla Bank PLC, a technology-focused commercial bank in Bangladesh, started Rocket on 31 March 2011 to bring banking to people without bank accounts and to build a habit of saving.', bn: 'বাংলাদেশের প্রযুক্তিনির্ভর বাণিজ্যিক ব্যাংক ডাচ্-বাংলা ব্যাংক পিএলসি ৩১ মার্চ ২০১১ রকেট চালু করে, ব্যাংক অ্যাকাউন্টহীন মানুষের কাছে ব্যাংকিং পৌঁছাতে ও সঞ্চয়ের অভ্যাস গড়তে।' })} />
      <div ref={ref} className="wrap py-[calc(var(--section)*0.75)] grid gap-16 lg:grid-cols-12">
        <section className="lg:col-span-7" aria-labelledby="model-h2">
          <h2 id="model-h2" className="h2 reveal">{t({ en: 'The Rocket model', bn: 'রকেট মডেল' })}</h2>
          <dl className="mt-8 border-t-2 border-ink">
            {facts.map((f, i) => (
              <div key={i} className="grid sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-2 sm:gap-8 py-6 border-b border-rule reveal" data-d={i * 60}>
                <dt className="h4 text-plum">{t(f.k)}</dt>
                <dd className="text-ink-2">{t(f.v)}</dd>
              </div>
            ))}
          </dl>
          <a href={links.rocketModel} target="_blank" rel="noopener" className="mt-6 inline-flex items-center gap-2 font-semibold text-plum ulink">{t({ en: 'Read the original on dutchbanglabank.com', bn: 'মূল লেখা পড়ুন dutchbanglabank.com-এ' })} <ArrowUpRight size={16} aria-hidden /></a>
        </section>
        <section className="lg:col-span-4 lg:col-start-9" aria-labelledby="awards-h">
          <h2 id="awards-h" className="h3 reveal">{t({ en: 'Recognition', bn: 'স্বীকৃতি' })}</h2>
          <ul className="mt-5 border-t-2 border-ink">
            {awards.map((a, i) => <li key={i} className="py-3 border-b border-rule font-medium reveal" data-d={i * 40}>{t(a)}</li>)}
          </ul>
          <div className="mt-10 space-y-3"><PlayButton /><UssdPlate /></div>
        </section>
      </div>
    </>
  )
}
