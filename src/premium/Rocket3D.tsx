import { useLayoutEffect, useRef } from 'react'
import { gsap, reducedMotion } from '../motion'
import { RocketMark } from './RocketMark'

const LAYERS = 22
const STEP = 2.6 // px of depth between layers

/**
 * The Rocket mark as a solid, extruded object, built from stacked copies of the flat mark in CSS 3D.
 * The front face is white and the sides darken toward the back, so it reads as a thick cut-out.
 * It floats gently and leans toward the pointer. No WebGL: it is plain SVG, so it costs almost nothing.
 */
export function Rocket3D({ className = '' }: { className?: string }) {
  const stage = useRef<HTMLDivElement>(null)
  const body = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!stage.current || !body.current || reducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.to(body.current, { y: -14, rotateZ: '+=3', duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      const rx = gsap.quickTo(body.current, 'rotateX', { duration: 1.2, ease: 'power3.out' })
      const ry = gsap.quickTo(body.current, 'rotateY', { duration: 1.2, ease: 'power3.out' })
      const on = (e: PointerEvent) => {
        const r = stage.current!.getBoundingClientRect()
        const nx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth
        const ny = (e.clientY - (r.top + r.height / 2)) / window.innerHeight
        ry(-24 + nx * 40); rx(14 - ny * 30)
      }
      window.addEventListener('pointermove', on, { passive: true })
      return () => window.removeEventListener('pointermove', on)
    }, stage)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={stage} aria-hidden className={`pointer-events-none [perspective:1500px] ${className}`}>
      <div ref={body} className="relative aspect-[361/336] w-full [transform-style:preserve-3d]" style={{ transform: 'rotateX(14deg) rotateY(-24deg) rotateZ(-8deg)' }}>
        {Array.from({ length: LAYERS }, (_, i) => {
          const front = i === 0
          // Depth shading: the front is white, each layer behind it steps toward deep purple.
          const mix = front ? 0 : 38 + (i / LAYERS) * 62
          return (
            <RocketMark key={i} className="absolute inset-0 h-full w-full" fill={front ? '#ffffff' : `color-mix(in srgb, #e9d8f2, #3c0f44 ${mix}%)`} style={{ transform: `translateZ(${-i * STEP}px)` }} />
          )
        })}
        {/* Soft shadow on the "floor" behind the object */}
        <span className="absolute inset-0" style={{ transform: `translateZ(${-LAYERS * STEP - 30}px)`, filter: 'blur(28px)', background: 'rgba(40,6,48,0.45)', clipPath: 'polygon(48% 71%, 42% 86%, 39% 63%, 77% 22%, 28% 60%, 0 45%, 100% 0, 70% 100%)' }} />
      </div>
    </div>
  )
}
