export type Locale = 'he' | 'en'

export const homePath = (locale: Locale) => (locale === 'en' ? '/en' : '/')
