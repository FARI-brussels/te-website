// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path'
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  alias: {
    '@': resolve(__dirname, '.'),
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    'nuxt-directus',
    '@pinia/nuxt',
    '@vueuse/nuxt'
  ],
  css: ['~/assets/css/main.scss','fari-demo-view/style.css'], 
  plugins: [ '~/plugins/directus.ts'],
  runtimeConfig: {
    public: {
      directus: {
        url: process.env.NUXT_CMS_URL,
      }
    }
  }
})