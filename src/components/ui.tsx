import { useEffect, useRef, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, ArrowRight, Apple } from 'lucide-react'
import { PlayGlyph } from './Icon'
import { links, SHOW_CONTENT_FLAGS } from '../data/site'
import { ui, useI18n } from '../i18n'
import type { L } from '../data/services'

/* ── Buttons: purple is the CTA colour, nowhere else ─────── */
const base =
  'inline-flex items-center justify-center gap-2.5 min-h-[52px] px-6 rounded-full font-bold text-[0.95rem] transition-[background-color,color,box-shadow,transform] duration-200 ease-[var(--ease-out-expo)] active:translate-y-px'

export function PlayButton({ tone = 'solid', className = '' }: { tone?: 'solid' | 'light'; className?: string }) {
  const { t } = useI18n()
  const cls = tone === 'solid'
    ? 'bg-[linear-gradient(100deg,var(--color-cta-hi),var(--color-cta))] text-white hover:brightness-110 shadow-[0_14px_26px_-12px_rgba(137,40,143,0.6)]'
    : 'bg-white text-plum-deep hover:bg-lav shadow-[0_14px_26px_-14px_rgba(0,0,0,0.5)]'
  return (
    <a href={links.play} target="_blank" rel="noopener" className={`${base} ${cls} ${className}`}>
      <span className="grid place-items-center w-7 h-7 rounded-full bg-white"><PlayGlyph size={16} /></span>
      <span className="flex flex-col items-start leading-tight">
        <span className="text-[0.75rem] font-medium opacity-90">{t({ en: 'Get it on', bn: 'ডাউনলোড করুন' })}</span>
        <span>Google Play</span>
      </span>
    </a>
  )
}

export function AppStoreButton({ tone = 'solid', className = '' }: { tone?: 'solid' | 'light'; className?: string }) {
  const { t } = useI18n()
  const cls = tone === 'solid'
    ? 'bg-[linear-gradient(100deg,var(--color-cta-hi),var(--color-cta))] text-white hover:brightness-110 shadow-[0_14px_26px_-12px_rgba(85,0,134,0.6)]'
    : 'bg-white text-plum-deep hover:bg-lav shadow-[0_14px_26px_-14px_rgba(0,0,0,0.5)]'
  return (
    <a href={links.appStore} target="_blank" rel="noopener" className={`${base} ${cls} ${className}`}>
      <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-ink"><Apple size={16} aria-hidden fill="currentColor" /></span>
      <span className="flex flex-col items-start leading-tight">
        <span className="text-[0.75rem] font-medium opacity-90">{t({ en: 'Download on the', bn: 'ডাউনলোড করুন' })}</span>
        <span>App Store</span>
      </span>
    </a>
  )
}

export function TextLink({ to, children, className = '' }: { to: string; children: ReactNode; className?: string }) {
  const inner = <>{children}<ArrowRight size={17} aria-hidden className="transition-transform duration-300 group-hover:translate-x-1" /></>
  const cls = `group inline-flex items-center gap-2 font-semibold text-plum ${className}`
  if (to.startsWith('http') || to.startsWith('mailto')) return <a href={to} className={cls} target={to.startsWith('http') ? '_blank' : undefined} rel="noopener">{inner}</a>
  return <Link to={to} className={cls}>{inner}</Link>
}

export function ButtonLink({ to, children, variant = 'ghost', className = '' }: { to: string; children: ReactNode; variant?: 'ghost' | 'solid' | 'outline'; className?: string }) {
  const v = variant === 'solid' ? 'bg-cta text-white hover:bg-cta-deep'
    : variant === 'outline' ? 'border-2 border-plum text-plum hover:bg-cream'
    : 'text-plum hover:bg-cream'
  const inner = <>{children}<ArrowRight size={18} aria-hidden className="transition-transform duration-300 group-hover:translate-x-1" /></>
  if (to.startsWith('http') || to.startsWith('mailto') || to.startsWith('tel'))
    return <a href={to} className={`group ${base} ${v} ${className}`} target={to.startsWith('http') ? '_blank' : undefined} rel="noopener">{inner}</a>
  return <Link to={to} className={`group ${base} ${v} ${className}`}>{inner}</Link>
}

/** *322# plate: the USSD channel for people without smartphones */
export function UssdPlate({ dark = false }: { dark?: boolean }) {
  const { t } = useI18n()
  return (
    <a href="tel:*322%23" className={`inline-flex items-center gap-3 rounded-[10px] border px-4 py-2.5 transition-colors ${dark ? 'border-white/35 hover:border-white text-white' : 'border-rule bg-white hover:border-plum'}`}>
      <span className={`text-[0.82rem] leading-tight ${dark ? 'text-white/85' : 'text-ink-2'}`}>{t(ui.noSmartphone)}</span>
      <span className={`tabular font-bold text-lg tracking-wide ${dark ? 'text-white' : 'text-plum'}`}>*322#</span>
    </a>
  )
}

/* ── Content flag (editorial, not for production) ────────── */
export function ContentFlag({ text }: { text?: L }) {
  const { t } = useI18n()
  if (!SHOW_CONTENT_FLAGS || !text) return null
  return (
    <p className="mt-4 flex gap-2.5 rounded-[10px] bg-warn-bg px-3.5 py-2.5 text-[0.82rem] leading-snug text-[#5c3700]">
      <span className="font-semibold shrink-0">{t(ui.toConfirm)}:</span>
      <span>{t(text)}</span>
    </p>
  )
}

/* ── Breadcrumbs ─────────────────────────────────────────── */
export function Crumbs({ items }: { items: { to?: string; label: string }[] }) {
  const { t } = useI18n()
  return (
    <nav aria-label="Breadcrumb" className="small text-ink-3">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li><Link className="ulink hover:text-plum" to="/">{t(ui.home)}</Link></li>
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <ChevronRight size={14} aria-hidden />
            {it.to ? <Link className="ulink hover:text-plum" to={it.to}>{it.label}</Link> : <span aria-current="page" className="text-ink-2">{it.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}

/* ── Reveal: fade-and-rise on scroll, only when motion is allowed ── */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    const root = ref.current
    if (!root || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const els = Array.from(root.querySelectorAll<HTMLElement>('.reveal'))
    const vh = innerHeight
    els.forEach((el) => { if (el.getBoundingClientRect().top > vh * 0.92) el.classList.add('pre') })
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const el = e.target as HTMLElement
          if (el.dataset.d) el.style.transitionDelay = `${el.dataset.d}ms`
          el.classList.remove('pre')
          io.unobserve(el)
        }
      })
    }, { rootMargin: '0px 0px -8% 0px' })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return ref
}

/* ── Page header for inner pages ─────────────────────────── */
export function PageHead({ crumbs, title, lead, children }: { crumbs: { to?: string; label: string }[]; title: string; lead?: string; children?: ReactNode }) {
  return (
    <header className="bg-cream">
      <div className="wrap pt-10 pb-14 md:pt-14 md:pb-20">
        <Crumbs items={crumbs} />
        <div className="mt-8 grid gap-8 md:grid-cols-12 items-end">
          <div className="md:col-span-8">
            <h1 className="h1">{title}</h1>
            {lead && <p className="lead mt-5 measure">{lead}</p>}
          </div>
          {children && <div className="md:col-span-4 md:justify-self-end">{children}</div>}
        </div>
      </div>
    </header>
  )
}
