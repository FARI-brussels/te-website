import type { Locale } from '@/types'

export const useGlobalStore = defineStore('global', () => {
  const locale = ref<Locale>('en')
  const setLocale = (newLocale: Locale) => (newLocale === 'fr-FR' ? locale.value = 'fr' : locale.value = newLocale)

  return { locale, setLocale }
 })