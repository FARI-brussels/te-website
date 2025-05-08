export type Locale = 'en' | 'fr' | 'fr-FR' | 'nl' 

export interface DemoTranslation {
  languages_code: string
  title: string | null
  topic: string | null
  app_url: string | null
}

export interface DirectusDemo {
  image: { filename_disk: string } | null
  slug: string | null
  translations: DemoTranslation[] | null
}

export interface Demo {
  image: string | null
  slug: string
  url: string
  title: Record<Locale, string>
  description: Record<Locale, string>
}

export interface FetchDemosError {
  status: number
  message: string
}

export type FetchDemosResponse = Demo[] | FetchDemosError
