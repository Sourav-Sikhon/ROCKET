import { useEffect } from 'react'
import { useI18n } from '../i18n'
import type { L } from '../data/services'

export function useTitle(title: L, exact = false) {
  const { t } = useI18n()
  useEffect(() => {
    document.title = exact ? t(title) : `${t(title)} · Rocket`
  }, [t, title, exact])
}
