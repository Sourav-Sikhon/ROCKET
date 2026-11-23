import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Pause, Play, X } from 'lucide-react'
import { Phone } from '../components/Phone'
import { useI18n } from '../i18n'
import { bySlug } from '../data/services'
import type { AppScreen, L } from '../data/services'

// Drop a hosted file here (for example '/media/send-money.mp4') and that tutorial plays the real video instead of the walkthrough.
const VIDEOS: Record<string, string> = {}
const MS = 3800

type Tutorial = { id: string; screen: AppScreen; c: [string, string, string]; title: L; detail: L; steps: L[]; to: string }

// The official account-opening steps, as the Rocket pages describe them.
const openAccount: Tutorial = {
  id: 'open-account', screen: 'login', c: ['#d8ff3e', '#1d0a33', '#89288f'], to: '/open-account',
  title: { en: 'Open an account', bn: 'অ্যাকাউন্ট খুলুন' },
  detail: { en: 'Take your KYC form, a photograph and your National ID to a Rocket agent.', bn: 'কেওয়াইসি ফর্ম, একটি ছবি ও জাতীয় পরিচয়পত্র নিয়ে রকেট এজেন্টের কাছে যান।' },
  steps: [
    { en: 'Fill in the KYC form, and take it with a photograph and your National ID to a Rocket agent.', bn: 'কেওয়াইসি ফর্ম পূরণ করুন এবং একটি ছবি ও জাতীয় পরিচয়পত্রসহ রকেট এজেন্টের কাছে যান।' },
    { en: 'The agent enters your mobile number under Customer Registration.', bn: 'এজেন্ট কাস্টমার রেজিস্ট্রেশনে আপনার মোবাইল নম্বর দেবেন।' },
    { en: 'You get an IVR call or a USSD menu on your phone. Choose your 4-digit PIN.', bn: 'ফোনে আইভিআর কল বা ইউএসএসডি মেনু আসবে। ৪ সংখ্যার পিন বেছে নিন।' },
    { en: 'An SMS confirms your account. Your account number is your mobile number plus one check digit.', bn: 'এসএমএসে অ্যাকাউন্ট নিশ্চিত হবে। অ্যাকাউন্ট নম্বর মোবাইল নম্বর ও একটি চেক ডিজিট।' },
  ],
}

// Seven more, one per everyday task. Titles, descriptions and steps all come from the service pages.
const palettes: [string, string, string][] = [
  ['#89288f', '#ffffff', '#d8ff3e'], ['#ff6f59', '#1d0a33', '#ffffff'], ['#2f7de1', '#ffffff', '#ffffff'], ['#ffb020', '#1d0a33', '#ffffff'],
  ['#8fe3c0', '#1d0a33', '#ffffff'], ['#ffc2e2', '#1d0a33', '#89288f'], ['#e9d8f2', '#1d0a33', '#89288f'],
]
const slugs = ['cash-in', 'cash-out', 'send-money', 'mobile-top-up', 'bill-payment', 'merchant-payment', 'bank-transfer']
const tutorials: Tutorial[] = [
  openAccount,
  ...slugs.flatMap((slug, i) => {
    const s = bySlug(slug)
    return s ? [{ id: s.slug, screen: s.screen, c: palettes[i], to: `/services/${s.slug}`, title: s.name, detail: s.short, steps: s.steps }] : []
  }),
]

const dark = (c: string) => c === '#ffffff' || c === '#d8ff3e'

/** The player: a coloured stage whose phone screen and caption follow the steps, plus the step list. */
function Player({ tut, onClose }: { tut: Tutorial; onClose: () => void }) {
  const { t } = useI18n()
  const [on, setOn] = useState(0)
  const [playing, setPlaying] = useState(true)
  const video = VIDEOS[tut.id]
  const closeBtn = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeBtn.current?.focus()
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    addEventListener('keydown', k)
    return () => removeEventListener('keydown', k)
  }, [onClose])
  useEffect(() => {
    if (!playing || video) return
    const id = window.setTimeout(() => setOn((v) => (v + 1) % tut.steps.length), MS)
    return () => window.clearTimeout(id)
  }, [on, playing, video, tut.steps.length])

  const [bg, fg] = tut.c
  return (
    <div className="fixed inset-0 z-[80] grid place-items-center p-3 md:p-8" role="dialog" aria-modal="true" aria-label={t(tut.title)}>
      <div className="absolute inset-0 bg-[#2a0a30]/70 backdrop-blur-sm" onClick={onClose} />
      <div className="gd-pop relative max-h-full w-full max-w-[1080px] overflow-y-auto rounded-[28px] bg-white p-3 md:p-4">
        <button ref={closeBtn} type="button" onClick={onClose} aria-label={t({ en: 'Close the tutorial', bn: 'টিউটোরিয়াল বন্ধ করুন' })} className="absolute right-5 top-5 z-[3] grid h-11 w-11 place-items-center rounded-full bg-white text-[var(--px-ink)] shadow-[0_10px_20px_-8px_rgba(29,10,51,0.5)]"><X size={20} aria-hidden /></button>
        <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] transition-colors duration-700 md:aspect-video" style={{ background: bg, color: fg }}>
          {video
            ? <video className="absolute inset-0 h-full w-full object-cover" src={video} controls autoPlay playsInline />
            : (
              <>
                <div aria-hidden className="absolute inset-0" style={{ backgroundImage: `radial-gradient(${fg}2e 1.6px, transparent 1.7px)`, backgroundSize: '28px 28px', maskImage: 'linear-gradient(100deg, #000 5%, transparent 60%)', WebkitMaskImage: 'linear-gradient(100deg, #000 5%, transparent 60%)' }} />
                <span aria-hidden key={`n${on}`} className="px-display gd-pop pointer-events-none absolute -bottom-[8%] left-[3%] select-none text-[clamp(8rem,24vw,22rem)] font-extrabold leading-none" style={{ color: `${fg}24` }}>{on + 1}</span>
                <p key={`t${on}`} className="gd-pop absolute left-[5%] top-[9%] z-[1] max-w-[52%] text-[clamp(1.05rem,2.3vw,2.1rem)] font-extrabold leading-[1.15]">{t(tut.steps[on])}</p>
                <div aria-hidden className="absolute bottom-[-12%] right-[12%] w-[min(24%,240px)] drop-shadow-[0_30px_40px_rgba(29,10,51,0.35)]"><Phone screen={tut.screen} className="w-full" /></div>
                <div className="absolute inset-x-4 bottom-4 z-[2] flex items-center gap-3 rounded-full bg-white/90 px-2.5 py-2 text-[var(--px-ink)] backdrop-blur-md md:inset-x-6 md:bottom-5">
                  <button type="button" onClick={() => setPlaying((v) => !v)} aria-label={playing ? t({ en: 'Pause', bn: 'থামান' }) : t({ en: 'Play', bn: 'চালান' })} className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--px-purple)] text-white">
                    {playing ? <Pause size={16} aria-hidden fill="currentColor" /> : <Play size={16} aria-hidden fill="currentColor" className="translate-x-px" />}
                  </button>
                  <div className="flex flex-1 gap-1.5" aria-hidden>
                    {tut.steps.map((_, i) => (
                      <button key={i} type="button" tabIndex={-1} onClick={() => setOn(i)} className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--px-ink)]/15">
                        <span className="absolute inset-0 origin-left rounded-full bg-[var(--px-purple)]" style={i < on ? undefined : i === on ? { animation: playing ? `gd-fill ${MS}ms linear forwards` : undefined, transform: playing ? undefined : 'scaleX(0.04)' } : { transform: 'scaleX(0)' }} />
                      </button>
                    ))}
                  </div>
                  <span className="shrink-0 pr-2 text-[0.8rem] font-bold tabular-nums">{on + 1} / {tut.steps.length}</span>
                </div>
              </>
            )}
        </div>
        <div className="flex flex-wrap items-end justify-between gap-4 px-2 pb-2 pt-5 md:px-4">
          <div>
            <h3 className="text-[clamp(1.5rem,2.6vw,2.2rem)] font-extrabold text-[var(--px-ink)]">{t(tut.title)}</h3>
            <p className="mt-1.5 max-w-[40rem] text-[1rem] font-medium leading-[1.5] text-[var(--px-ink)]/70">{t(tut.detail)}</p>
          </div>
          <Link to={tut.to} onClick={onClose} className="group inline-flex min-h-[48px] items-center gap-2 rounded-full px-6 text-[0.98rem] font-bold" style={{ background: bg, color: dark(bg) || bg === '#ffffff' ? '#1d0a33' : '#fff' }}>
            {t({ en: 'Read the full guide', bn: 'পূর্ণ গাইড পড়ুন' })}<ArrowRight size={18} aria-hidden className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  )
}

/**
 * Video tutorial gallery on a purple field: eight video cards, each with a thumbnail and play button on top and
 * the tutorial's title and short description below. A card opens a player with the steps, one at a time.
 */
export function PxGuide() {
  const { t } = useI18n()
  const [open, setOpen] = useState<Tutorial | null>(null)

  return (
    <section aria-labelledby="px-gd-h" className="relative isolate overflow-hidden bg-[var(--px-purple)] py-20 text-white md:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.16) 1.5px, transparent 1.6px)', backgroundSize: '30px 30px', maskImage: 'radial-gradient(80% 60% at 50% 0%, #000 10%, transparent 100%)', WebkitMaskImage: 'radial-gradient(80% 60% at 50% 0%, #000 10%, transparent 100%)' }} />
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[44rem]">
            <h2 id="px-gd-h" className="text-[clamp(2.6rem,5.2vw,4.8rem)] font-extrabold">{t({ en: 'Rocket video tutorials.', bn: 'রকেট ভিডিও টিউটোরিয়াল।' })}</h2>
            <p className="mt-5 max-w-[34rem] text-[1.1rem] font-medium leading-[1.55] text-white/85">{t({ en: 'Pick a task and see it done, step by step.', bn: 'একটি কাজ বেছে নিন, ধাপে ধাপে দেখে নিন।' })}</p>
          </div>
          <Link to="/open-account" className="group inline-flex min-h-[52px] items-center gap-3 rounded-full bg-white px-6 text-[1rem] font-bold text-[var(--px-purple)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_20px_30px_-14px_rgba(29,10,51,0.6)]">
            {t({ en: 'How to open an account', bn: 'অ্যাকাউন্ট খোলার নিয়ম' })}<ArrowRight size={18} aria-hidden className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tutorials.map((x, i) => {
            const [bg, fg, chip] = x.c
            return (
              <li key={x.id}>
                <button type="button" onClick={() => setOpen(x)} className="group flex h-full w-full flex-col overflow-hidden rounded-[22px] bg-white text-left text-[var(--px-ink)] shadow-[0_24px_40px_-28px_rgba(29,10,51,0.7)] transition-[transform,box-shadow] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-2 hover:shadow-[0_34px_50px_-26px_rgba(29,10,51,0.8)]">
                  {/* Thumbnail */}
                  <span className="relative block aspect-video overflow-hidden" style={{ background: bg, color: fg }}>
                    <span aria-hidden className="absolute inset-0" style={{ backgroundImage: `radial-gradient(${fg}2e 1.4px, transparent 1.5px)`, backgroundSize: '22px 22px' }} />
                    <span aria-hidden className="px-display absolute -bottom-[16%] left-[4%] select-none text-[6.5rem] font-extrabold leading-none" style={{ color: `${fg}26` }}>{i + 1}</span>
                    <span aria-hidden className="absolute -bottom-[34%] right-[10%] w-[34%] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-3"><Phone screen={x.screen} className="w-full" /></span>
                    <span className="absolute left-4 top-1/2 grid h-14 w-14 -translate-y-1/2 place-items-center rounded-full bg-white text-[var(--px-purple)] shadow-[0_14px_26px_-10px_rgba(29,10,51,0.6)] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-110">
                      <Play size={22} aria-hidden fill="currentColor" className="translate-x-px" />
                    </span>
                    <span aria-hidden className="absolute right-3 top-3 rounded-full px-3 py-1 text-[0.72rem] font-bold" style={{ background: chip, color: dark(chip) || chip === '#ffffff' ? '#1d0a33' : '#fff' }}>{t({ en: 'Tutorial', bn: 'টিউটোরিয়াল' })} {i + 1}</span>
                  </span>
                  {/* Title and short details */}
                  <span className="flex flex-1 flex-col p-5">
                    <span className="block text-[1.2rem] font-extrabold leading-tight">{t(x.title)}</span>
                    <span className="mt-1.5 block text-[0.95rem] font-medium leading-[1.5] text-[var(--px-ink)]/70">{t(x.detail)}</span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
      {open && <Player tut={open} onClose={() => setOpen(null)} />}
    </section>
  )
}
