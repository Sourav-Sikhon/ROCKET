import type { ElementType } from 'react'
import { useI18n } from '../i18n'
import type { L } from '../data/services'

/**
 * Splits a line of display type into words and characters so GSAP can drive each glyph.
 * Bangla is split by word only: breaking it into characters would split its conjuncts.
 */
export function Split({ text, as: Tag = 'span', className = '', charClass = 'px-char' }: { text: L; as?: ElementType; className?: string; charClass?: string }) {
  const { t, lang } = useI18n()
  const value = t(text)
  const words = value.split(' ')
  return (
    <Tag className={className} aria-label={value}>
      {words.map((w, i) => (
        <span key={i} aria-hidden className="px-word">
          {lang === 'bn'
            ? <span className={charClass}>{w}</span>
            : [...w].map((c, j) => <span key={j} className={charClass}>{c}</span>)}
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  )
}
