import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { L } from './data/services'

export type Lang = 'en' | 'bn'
type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (l: L) => string }

const I18n = createContext<Ctx>({ lang: 'en', setLang: () => {}, t: (l) => l.en })

function initial(): Lang {
  try {
    const q = new URLSearchParams(location.search).get('lang')
    if (q === 'bn' || q === 'en') return q
    const s = localStorage.getItem('rocket-lang')
    if (s === 'bn' || s === 'en') return s
  } catch { /* storage unavailable */ }
  return 'en'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initial)
  useEffect(() => {
    document.documentElement.lang = lang
    try { localStorage.setItem('rocket-lang', lang) } catch { /* ignore */ }
  }, [lang])
  const t = (l: L) => l[lang]
  return <I18n.Provider value={{ lang, setLang: setLangState, t }}>{children}</I18n.Provider>
}

export const useI18n = () => useContext(I18n)

/** Bangla numerals for the BN locale */
export function num(n: number | string, lang: Lang) {
  const s = String(n)
  if (lang === 'en') return s
  const d = '০১২৩৪৫৬৭৮৯'
  return s.replace(/[0-9]/g, (c) => d[+c])
}

/** Inline UI dictionary */
export const ui = {
  skip: { en: 'Skip to content', bn: 'মূল কনটেন্টে যান' },
  services: { en: 'Services', bn: 'সেবাসমূহ' },
  openAccount: { en: 'Open Account', bn: 'অ্যাকাউন্ট খুলুন' },
  howToOpen: { en: 'How to Open Account', bn: 'অ্যাকাউন্ট খোলার নিয়ম' },
  benefits: { en: 'Benefits', bn: 'সুবিধাসমূহ' },
  findUs: { en: 'Find Us', bn: 'কাছের পয়েন্ট' },
  security: { en: 'Security & Awareness', bn: 'নিরাপত্তা ও সচেতনতা' },
  help: { en: 'Help & Support', bn: 'সাহায্য ও সহায়তা' },
  notices: { en: 'Important Notices', bn: 'গুরুত্বপূর্ণ নোটিশ' },
  awareness: { en: 'Awareness', bn: 'সচেতনতা' },
  about: { en: 'About Rocket', bn: 'রকেট সম্পর্কে' },
  faq: { en: 'FAQ', bn: 'সাধারণ জিজ্ঞাসা' },
  download: { en: 'Download App', bn: 'অ্যাপ ডাউনলোড' },
  getOnPlay: { en: 'Get it on Google Play', bn: 'গুগল প্লে থেকে নিন' },
  allServices: { en: 'All services', bn: 'সব সেবা' },
  learnMore: { en: 'How it works', bn: 'কীভাবে করবেন' },
  menu: { en: 'Menu', bn: 'মেনু' },
  close: { en: 'Close', bn: 'বন্ধ করুন' },
  home: { en: 'Home', bn: 'হোম' },
  noSmartphone: { en: 'No smartphone? Dial', bn: 'স্মার্টফোন নেই? ডায়াল করুন' },
  steps: { en: 'How it works', bn: 'কীভাবে কাজ করে' },
  whereToUse: { en: 'Where you can do it', bn: 'কোথায় করা যায়' },
  goodToKnow: { en: 'Good to know', bn: 'জেনে রাখুন' },
  related: { en: 'Related services', bn: 'সম্পর্কিত সেবা' },
  charges: { en: 'Charges and limits', bn: 'চার্জ ও লিমিট' },
  chargesBody: { en: 'Charges and transaction limits are set by Dutch-Bangla Bank and can change. Check the current figures in the Rocket app or with DBBL before you transact.', bn: 'চার্জ ও লেনদেনের সীমা ডাচ্-বাংলা ব্যাংক নির্ধারণ করে এবং পরিবর্তন হতে পারে। লেনদেনের আগে রকেট অ্যাপে বা ডিবিবিএল থেকে বর্তমান তথ্য দেখে নিন।' },
  toConfirm: { en: 'Content to confirm', bn: 'নিশ্চিত করতে হবে' },
  pdf: { en: 'PDF', bn: 'পিডিএফ' },
  langSwitch: { en: 'বাংলা', bn: 'English' },
  langLabel: { en: 'Switch to Bangla', bn: 'Switch to English' },
} satisfies Record<string, L>
