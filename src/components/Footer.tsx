import { Link } from 'react-router-dom'
import { Facebook, Linkedin, Mail, Phone, Youtube } from 'lucide-react'
import { links, SHOW_CONTENT_FLAGS } from '../data/site'
import { ui, useI18n } from '../i18n'
import { ContourLines, ShaheedMinar, SangsadLine } from './art'

/** Deep-violet footer, laid out as in the approved reference. */
export function Footer() {
  const { t, lang, setLang } = useI18n()
  const head = 'mb-6 text-[1.05rem] font-bold text-white'
  const a = 'text-[0.95rem] text-white/85 transition-colors hover:text-white'
  const social = 'grid h-9 w-9 place-items-center rounded-full bg-white text-foot-1 transition-transform hover:-translate-y-0.5'
  return (
    <footer className="on-dark relative overflow-hidden text-white">
      <div className="relative bg-[linear-gradient(180deg,var(--color-foot-1),var(--color-foot-2))]">
        {/* Line-art landmarks at 10%: Jatiya Sangsad Bhaban and the Shaheed Minar over soft river contours */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[260px] overflow-hidden text-white/10">
          <ContourLines className="absolute inset-x-0 bottom-0 h-[110px] w-full" />
          <SangsadLine className="absolute bottom-6 left-[3%] hidden h-[220px] w-auto min-[900px]:block" />
          <ShaheedMinar tone="line" className="absolute bottom-6 right-[4%] hidden h-[210px] w-auto min-[900px]:block" />
          <SangsadLine className="absolute -bottom-2 left-1/2 h-[130px] w-auto -translate-x-1/2 min-[900px]:hidden" />
        </div>
        <div className="wrap relative grid gap-12 pb-12 pt-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <img src="/hero/logo-white.png" width={576} height={363} alt="Rocket, Dutch-Bangla Bank Mobile Banking" className="h-[92px] w-auto" />
            <p className="mt-5 text-[0.95rem] text-white/90">{t({ en: 'Dutch-Bangla Bank Mobile Banking.', bn: 'ডাচ্-বাংলা ব্যাংক মোবাইল ব্যাংকিং।' })}</p>
            <div className="mt-6 flex items-center gap-3">
              <a href={links.facebookRocket} target="_blank" rel="noopener" aria-label="Rocket on Facebook" className={social}><Facebook size={16} aria-hidden /></a>
              <a href={links.youtube} target="_blank" rel="noopener" aria-label="Dutch-Bangla Bank on YouTube" className={social}><Youtube size={16} aria-hidden /></a>
              <a href={links.linkedin} target="_blank" rel="noopener" aria-label="Dutch-Bangla Bank on LinkedIn" className={social}><Linkedin size={16} aria-hidden /></a>
            </div>
          </div>

          <nav aria-label="Quick links" className="lg:col-span-2 lg:col-start-6">
            <p className={head}>{t({ en: 'Quick Links', bn: 'দ্রুত লিংক' })}</p>
            <ul className="space-y-3">
              <li><Link className={a} to="/">{t({ en: 'Home', bn: 'হোম' })}</Link></li>
              <li><Link className={a} to="/about">{t({ en: 'About Us', bn: 'আমাদের সম্পর্কে' })}</Link></li>
              <li><Link className={a} to="/services">{t({ en: 'Our Services', bn: 'আমাদের সেবা' })}</Link></li>
              <li><Link className={a} to="/open-account">{t(ui.howToOpen)}</Link></li>
              <li><Link className={a} to="/help">{t(ui.faq)}</Link></li>
            </ul>
          </nav>

          <nav aria-label="Support" className="lg:col-span-2">
            <p className={head}>{t({ en: 'Support', bn: 'সহায়তা' })}</p>
            <ul className="space-y-3">
              <li><a className={a} href={`mailto:${links.email}`}>{t({ en: 'Contact Us', bn: 'যোগাযোগ' })}</a></li>
              <li><Link className={a} to="/help">{t({ en: 'Help', bn: 'সাহায্য' })}</Link></li>
              <li><Link className={a} to="/security">{t(ui.security)}</Link></li>
              <li><Link className={a} to="/notices">{t(ui.notices)}</Link></li>
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className={head}>{t({ en: 'Contact Us', bn: 'যোগাযোগ করুন' })}</p>
            <ul className="space-y-3.5 text-[0.95rem] text-white/90">
              <li className="flex items-center gap-3"><Phone size={17} aria-hidden /><a className="tabular hover:text-white" href="tel:16216">16216</a></li>
              <li className="flex items-center gap-3"><Mail size={17} aria-hidden /><a className="break-all hover:text-white" href={`mailto:${links.email}`}>{links.email}</a></li>
              <li className="flex items-center gap-3"><Phone size={17} aria-hidden /><span className="tabular">(8802) 47110465</span></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-foot-bar">
        <div className="wrap flex flex-col gap-3 py-6 text-[0.85rem] text-white/85 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Dutch-Bangla Bank PLC. {t({ en: 'All rights reserved.', bn: 'সর্বস্বত্ব সংরক্ষিত।' })}</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {SHOW_CONTENT_FLAGS && <span className="rounded-md bg-white/15 px-2 py-1">{t({ en: 'Privacy Policy and Terms: links to be supplied by DBBL', bn: 'গোপনীয়তা নীতি ও শর্তাবলি: লিংক ডিবিবিএল দেবে' })}</span>}
            <button onClick={() => setLang('en')} aria-pressed={lang === 'en'} className={`hover:text-white ${lang === 'en' ? 'font-bold text-white' : ''}`}>English</button>
            <button onClick={() => setLang('bn')} aria-pressed={lang === 'bn'} lang="bn" className={`hover:text-white ${lang === 'bn' ? 'font-bold text-white' : ''}`}>বাংলা</button>
            <span>{t({ en: 'Powered by Dutch-Bangla Bank', bn: 'ডাচ্-বাংলা ব্যাংক পরিচালিত' })}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
