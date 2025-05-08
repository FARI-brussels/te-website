import { createDirectus,readItems, rest } from '@directus/sdk';
import type { DirectusDemo, Demo, Locale } from '@/types'

export default defineEventHandler(async (_) => {

  const config = useRuntimeConfig();
  const client = createDirectus(config.public.directus.url).with(rest());
  try {
    const result = await client.request(
      readItems('demos', {
        fields: [
          'image.filename_disk',
          'slug',
          'translations.languages_code',
          'translations.title',
          'translations.topic',
          'translations.app_url',
        ],
        filter: {
          translations: {
            app_url: {
              _nnull: true,
              _ncontains: 'localhost',
              _starts_with: 'http',
            },
          },
        },
      }),
    )

    if (!Array.isArray(result)) {
      console.error('Result is not an array:', result)
      return []
    }

    const demos = (result as DirectusDemo[])
      .map((demo: DirectusDemo, index): Demo | null => {
        if (!demo || !demo.translations || !Array.isArray(demo.translations)) {
          console.warn(`Skipping demo ${index}: Invalid or missing translations`, demo)
          return null
        }

        const { image, slug, translations } = demo
        const t: Partial<Record<Locale, string>> = {},
          d: Partial<Record<Locale, string>> = {}
        let url: string | null = null

        for (const translation of translations) {
          const { title, topic, app_url, languages_code } = translation

          if (!languages_code || !app_url) {
            console.warn(
              `Skipping translation in demo ${index}: Missing languages_code or app_url`,
              translation,
            )
            continue
          }

          if (slug === 'simplex' || slug === 'hybrid-ai-for-image-understanding') continue

          if (
            app_url.includes('localhost') ||
            app_url.match(/^(\/|file:)/) || 
            app_url.match(/\d+\.\d+\.\d+\.\d+/) 
          ) {
            console.warn(`Skipping translation in demo ${index}: Invalid app_url`, app_url)
            continue
          }

          if (!url) {
            url = app_url
          }

          t[languages_code as Locale] = title || ''
          d[languages_code as Locale] = topic || ''
        }

        if (!url) {
          console.warn(`Skipping demo ${index}: No valid app_url found`)
          return null
        }

        const imageUrl =
          image && image.filename_disk
            ? `https://fari-cms.directus.app/assets/${image.filename_disk}`
            : null

        if (!imageUrl) console.warn(`Demo ${index}: Missing or invalid image`, image)

        const demoData = {
          image: imageUrl,
          slug: slug || '',
          url,
          title: t as Record<Locale, string>,
          description: d as Record<Locale, string>,
        }
        return demoData
      })
      .filter((demo): demo is Demo => Boolean(demo))

    return demos || []
  } catch (error: unknown) {
    console.error('Error fetching demos:', error)
    return {
      status: (error as { status?: number }).status || 500,
      message: (error as Error)?.message || 'Failed to fetch demos',
    }
  }
});
