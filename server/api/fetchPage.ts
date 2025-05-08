import { createDirectus, rest, readItems } from '@directus/sdk';
import type { TranslationInput, TranslationOutput } from '@/types';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const client = createDirectus(config.public.directus.url).with(rest());

  const { slug } = getQuery(event);

  try {
    const result = await client.request(
      readItems('fari_website', {
        filter: {
          slug: {
            _eq: slug,
          },
        },
        fields: [
          'hero_image.filename_disk',
          'slug',
          'translations.languages_code',
          'translations.title',
          'translations.description',
        ],
      })
    );

    const { title, description } = restructureTranslations(result[0]?.translations)

    if (result && result.length > 0) {
      return {
        hero_image:  `${config.public.directus.url}/assets/${result[0]?.hero_image?.filename_disk}`,
        slug: result[0]?.slug,
        title,
        description
      }
    
    } else {
      throw createError({
        statusCode: 404,
        statusMessage: 'Page not found',
      });
    }
  } catch (error) {
    console.error('Error fetching page:', error);
    throw createError({
      statusCode: error.status || 500,
      statusMessage: error.message || 'Failed to fetch page',
    });
  }
});



function restructureTranslations(translations: TranslationInput[]): TranslationOutput {
  const result: TranslationOutput = {};

  translations.forEach((translation) => {
    const { languages_code, ...fields } = translation;

    Object.entries(fields).forEach(([field, value]) => {
      if (!result[field]) result[field] = {};
      
      result[field][languages_code] = value;
    });
  });

  return result;
}