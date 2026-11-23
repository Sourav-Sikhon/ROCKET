import { useEffect } from 'react'
import '../premium/premium.css'
import { ScrollTrigger } from '../motion'
import { PxHero } from '../premium/PxHero'
import { PxProof } from '../premium/PxProof'
import { PxFeatures } from '../premium/PxFeatures'
import { PxTvc } from '../premium/PxTvc'
import { PxEveryday } from '../premium/PxEveryday'
import { PxBento } from '../premium/PxBento'
import { PxStack } from '../premium/PxStack'
import { PxBusiness } from '../premium/PxBusiness'
import { PxGuide } from '../premium/PxGuide'
import { PxFaq } from '../premium/PxFaq'
import { PxCityCta } from '../premium/PxCityCta'
import { useTitle } from './useTitle'

/**
 * Premium redesign, served at /premium so the current home page stays as it is.
 * Light by design: soft lilac and white, Rocket purple for action, silver and coral as small accents.
 * Each section moves differently: letter rise, a two-statement type scene, card rise, growing film frame,
 * a horizontal colour track, clip-path wipes, a stacked deck of services, a live walkthrough, an accordion and a flying mark.
 */
export default function Premium() {
  useTitle({ en: 'Rocket: Bank at city speed', bn: 'রকেট: শহরের গতিতে ব্যাংকিং' }, true)

  // Pinned sections and late-loading images shift everything below them. Re-measure after each of those
  // settles, so every scroll animation starts where its section actually is.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    const timers = [400, 1200, 2800].map((ms) => window.setTimeout(refresh, ms))
    window.addEventListener('load', refresh)
    document.fonts?.ready.then(refresh)
    let last = document.documentElement.scrollHeight, raf = 0
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const h = document.documentElement.scrollHeight
        if (Math.abs(h - last) > 40) { last = h; refresh() }
      })
    })
    ro.observe(document.body)
    return () => { timers.forEach(clearTimeout); window.removeEventListener('load', refresh); ro.disconnect(); cancelAnimationFrame(raf) }
  }, [])

  return (
    <div className="px -mt-[var(--header-h)] bg-white">
      <PxHero />
      <PxProof />
      <PxFeatures />
      <PxTvc />
      <PxEveryday />
      <PxBento />
      <PxStack />
      <PxBusiness />
      <PxGuide />
      <PxFaq />
      <PxCityCta />
    </div>
  )
}
