// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  
  modules: [
    '@nuxtjs/sitemap',
    '@nuxtjs/robots'
  ],

  site: {
    url: 'https://veyrauch-dance.ru', // Временно или можно заменить на реальный домен
    name: 'Veyrauch Cover Dance',
    indexable: false // Запрет индексации для тестового домена
  },

  runtimeConfig: {
    public: {
      yandexMetrikaId: process.env.YANDEX_METRIKA_ID || '', // Вставьте ваш ID сюда или в .env
      googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID || '' // Вставьте ваш ID сюда или в .env
    }
  }
})
