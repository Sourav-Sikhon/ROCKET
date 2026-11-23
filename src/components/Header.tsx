import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ArrowRight, Menu, X } from 'lucide-react'
import { links } from '../data/site'
import { ui, useI18n } from '../i18n'
import { PlayGlyph } from './Icon'
import type { L } from '../data/services'

const nav: { to: string; end?: boolean; label: L }[] = [
  { to: '/', end: true, label: { en: 'Home', bn: 'হোম' } },
  { to: '/about', label: { en: 'About', bn: 'সম্পর্কে' } },
  { to: '/services', label: { en: 'Our Services', bn: 'আমাদের সেবা' } },
  { to: '/open-account', label: { en: 'Open Account', bn: 'অ্যাকাউন্ট খুলুন' } },
  { to: '/benefits', label: { en: 'Benefits', bn: 'সুবিধাসমূহ' } },
  { to: '/notices', label: { en: 'Awareness', bn: 'সচেতনতা' } },
  { to: '/help', label: { en: 'FAQ', bn: 'সাধারণ জিজ্ঞাসা' } },
]

/** Official Rocket lockup (from the original billboard), tagline removed, in brand purple. */
export function Logo({ className = '' }: { className?: string }) {
  return <img src="/hero/logo-purple.png" width={576} height={363} alt="Rocket, Dutch-Bangla Bank Mobile Banking" className={className} />
}

export function Header() {
  const { t, lang, setLang } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [drawer, setDrawer] = useState(false)
  const loc = useLocation()

  useEffect(() => {
    const on = () => setScrolled(scrollY > 8)
    on(); addEventListener('scroll', on, { passive: true })
    return () => removeEventListener('scroll', on)
  }, [])
  useEffect(() => { setDrawer(false) }, [loc.pathname])
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') setDrawer(false) }
    addEventListener('keydown', k); return () => removeEventListener('keydown', k)
  }, [])
  useEffect(() => { document.body.style.overflow = drawer ? 'hidden' : '' }, [drawer])

  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `relative whitespace-nowrap py-2 text-[0.9375rem] font-medium transition-colors hover:text-plum ${isActive ? 'text-plum after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[2px] after:rounded-full after:bg-plum' : 'text-ink-2'}`

  return (
    <header className="pointer-events-none sticky top-0 z-50 box-border h-[var(--header-h)] pt-4">
      <a href="#main" className="pointer-events-auto sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:bg-white focus:px-4 focus:py-2">{t(ui.skip)}</a>
      {/* A floating, centred, fully rounded bar: the page keeps its top spacing, the bar hovers in it */}
      <div className={`pointer-events-auto mx-auto flex h-[68px] w-[calc(100%-1.5rem)] max-w-[1240px] items-center gap-6 rounded-full border border-white/70 pl-6 pr-3 transition-[background-color,box-shadow] duration-300 ${scrolled ? 'bg-white/90 shadow-[0_18px_40px_-22px_rgba(74,17,80,0.5)] backdrop-blur-md' : 'bg-white/75 shadow-[0_12px_30px_-22px_rgba(74,17,80,0.45)] backdrop-blur-md'}`}>
        <Link to="/" aria-label="Rocket home" className="shrink-0"><Logo className="h-[46px] w-auto" /></Link>

        <nav aria-label="Main" className="hidden flex-1 items-center justify-center gap-8 xl:flex">
          {nav.map((n) => <NavLink key={n.to} to={n.to} end={n.end} className={linkCls}>{t(n.label)}</NavLink>)}
        </nav>

        <div className="ml-auto flex items-center gap-3 xl:ml-0">
          <button onClick={() => setLang(lang === 'en' ? 'bn' : 'en')} aria-label={t(ui.langLabel)} lang={lang === 'en' ? 'bn' : 'en'}
            className="grid h-9 min-w-[44px] place-items-center rounded-full px-3 text-[0.85rem] font-bold text-plum transition-colors hover:bg-lav">
            {t(ui.langSwitch)}
          </button>
          <a href={links.play} target="_blank" rel="noopener" className="btn btn-primary btn-sm hidden sm:inline-flex">
            {t(ui.download)} <ArrowRight size={16} aria-hidden />
          </a>
          <button onClick={() => setDrawer(true)} aria-label={t(ui.menu)} aria-expanded={drawer} className="grid h-11 w-11 place-items-center rounded-full hover:bg-lav xl:hidden">
            <Menu aria-hidden />
          </button>
        </div>
      </div>

      {drawer && (
        <div className="fixed inset-0 z-[70] xl:hidden" role="dialog" aria-modal="true" aria-label={t(ui.menu)}>
          <div className="absolute inset-0 bg-ink/40" onClick={() => setDrawer(false)} />
          <div className="menu-in absolute right-0 top-0 h-full w-[min(420px,100%)] overflow-y-auto bg-white">
            <div className="flex h-[var(--header-h)] items-center justify-between border-b border-rule px-5">
              <Logo className="h-[48px] w-auto" />
              <button onClick={() => setDrawer(false)} aria-label={t(ui.close)} className="grid h-11 w-11 place-items-center rounded-full hover:bg-lav" autoFocus><X aria-hidden /></button>
            </div>
            <nav aria-label="Mobile" className="px-5 py-6">
              <ul>
                {([...nav, { to: '/find-us', label: ui.findUs }, { to: '/security', label: ui.security }] as { to: string; end?: boolean; label: L }[]).map((n) => (
                  <li key={n.to} className="border-b border-rule">
                    <NavLink to={n.to} end={n.end} className={({ isActive }) => `flex items-center justify-between py-4 text-[1.1rem] font-semibold ${isActive ? 'text-plum' : 'text-ink'}`}>
                      {t(n.label)} <ArrowRight size={18} aria-hidden className="text-ink-3" />
                    </NavLink>
                  </li>
                ))}
              </ul>
              <a href={links.play} target="_blank" rel="noopener" className="btn btn-primary mt-8 w-full">
                <PlayGlyph size={18} /> {t(ui.download)}
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
