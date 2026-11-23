import { useLayoutEffect, useRef, useState } from 'react'
import { Play } from 'lucide-react'
import { gsap, reducedMotion } from '../motion'
import { useI18n } from '../i18n'
import { Rocket3D } from './Rocket3D'

// Set one of these when the TVC is ready: a hosted file (public/media/tvc.mp4) or a YouTube id.
const TVC: { src?: string; youtubeId?: string; poster?: string } = {}

/** TVC: a framed film that grows from a rounded card to the full content width as it scrolls into view. */
export function PxTvc() {
  const { t } = useI18n()
  const root = useRef<HTMLElement>(null)
  const [playing, setPlaying] = useState(false)
  const ready = Boolean(TVC.src || TVC.youtubeId)

  useLayoutEffect(() => {
    if (!root.current || reducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.tv-frame', { clipPath: 'inset(10% 16% round 56px)' }, { clipPath: 'inset(0% 0% round 28px)', ease: 'none', scrollTrigger: { trigger: '.tv-stage', start: 'top 92%', end: 'top 25%', scrub: 0.8 } })
      gsap.fromTo('.tv-art', { scale: 1.35 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.tv-stage', start: 'top 92%', end: 'top 25%', scrub: 0.8 } })
      gsap.from('.tv-head > *', { y: 36, opacity: 0, duration: 0.9, stagger: 0.1, ease: 'expo.out', scrollTrigger: { trigger: '.tv-head', start: 'top 85%' } })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} aria-labelledby="px-tv-h" className="relative isolate overflow-hidden bg-[#e6d2f0] py-20 md:py-28">
      {/* Light purple field with a dot pattern that fades toward the middle, and two faint marks */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ backgroundImage: 'radial-gradient(rgba(137,40,143,0.28) 1.6px, transparent 1.7px)', backgroundSize: '26px 26px', maskImage: 'radial-gradient(70% 60% at 50% 55%, transparent 20%, #000 100%)', WebkitMaskImage: 'radial-gradient(70% 60% at 50% 55%, transparent 20%, #000 100%)' }} />
      <div className="wrap">
        <div className="tv-head mx-auto max-w-[44rem] text-center">
          <h2 id="px-tv-h" className="text-[clamp(2.6rem,5.6vw,5.2rem)] font-extrabold text-[var(--px-ink)]">{t({ en: 'Watch Rocket in motion.', bn: 'রকেটকে চলতে দেখুন।' })}</h2>
          <p className="mt-5 text-[1.1rem] font-medium leading-[1.55] text-[var(--px-ink)]/70">{t({ en: 'A short film about banking that keeps up with you.', bn: 'আপনার সঙ্গে তাল মিলিয়ে চলা ব্যাংকিং নিয়ে একটি ছোট ছবি।' })}</p>
        </div>

        <div className="tv-stage mt-12">
          <div className="tv-frame relative isolate aspect-video overflow-hidden rounded-[28px] bg-[var(--px-purple)] shadow-[0_40px_70px_-40px_rgba(74,17,80,0.7)]">
            {playing && TVC.youtubeId && <iframe title="Rocket TVC" className="absolute inset-0 h-full w-full" src={`https://www.youtube-nocookie.com/embed/${TVC.youtubeId}?autoplay=1&rel=0`} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />}
            {playing && TVC.src && <video className="absolute inset-0 h-full w-full object-cover" src={TVC.src} poster={TVC.poster} autoPlay controls playsInline />}
            {!playing && (
              <>
                <div aria-hidden className="tv-art absolute inset-0 -z-10">
                  <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.18) 1.5px, transparent 1.6px)', backgroundSize: '28px 28px', maskImage: 'linear-gradient(100deg, #000 10%, transparent 60%)', WebkitMaskImage: 'linear-gradient(100deg, #000 10%, transparent 60%)' }} />
                  <Rocket3D className="absolute left-[34%] top-[14%] w-[40%]" />
                  <img src="/hero/rocket-hand.webp" alt="" width={2000} height={1500} className="absolute -right-[6%] bottom-[-8%] h-[112%] w-auto max-w-none object-contain" loading="lazy" />
                </div>
                <button type="button" disabled={!ready} onClick={() => setPlaying(true)} aria-label={t({ en: 'Play the Rocket film', bn: 'রকেটের ছবি চালান' })}
                  className="group absolute left-[8%] top-1/2 flex -translate-y-1/2 items-center gap-5 disabled:cursor-default">
                  <span className="relative grid h-24 w-24 place-items-center rounded-full bg-white text-[var(--px-purple)] shadow-[0_24px_40px_-14px_rgba(29,10,51,0.55)] transition-transform duration-500 ease-[var(--ease-out-expo)] group-enabled:group-hover:scale-110 md:h-32 md:w-32">
                    <Play size={40} aria-hidden fill="currentColor" className="translate-x-0.5" />
                    <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-white/30 [animation-duration:2.6s]" />
                  </span>
                  <span className="text-left text-[clamp(1.2rem,2.2vw,2rem)] font-extrabold leading-[1.05] text-white">{t({ en: 'Play', bn: 'চালান' })}<br />{t({ en: 'the film', bn: 'ছবিটি' })}</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
