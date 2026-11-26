// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  app: {
    head: {
      htmlAttrs: {
        lang: 'ru'
      },
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;600;700&family=Manrope:wght@400;500;600;700;800&family=Outfit:wght@300;400;600;800&family=Tektur:wght@400;500;600;700;800&family=Unbounded:wght@400;500;700;900&display=swap'
        }
      ]
    }
  },
  
  modules: [
    '@nuxtjs/sitemap',
    '@nuxtjs/robots'
  ],

  site: {
    url: 'https://veyrauch.ru',
    name: 'Школа K-pop танцев Veyrauch',
    description: 'Школа K-pop танцев в центре Краснодара (ул. Володи Головатого, 274, р-н ТРЦ Галерея). Обучение cover dance с нуля в мини-группах, пробное занятие от 400 ₽.',
    defaultLocale: 'ru',
    indexable: true
  },

  sitemap: {
    exclude: ['/og-image']
  },

  robots: {
    groups: [
      {
        userAgent: ['*'],
        allow: ['/'],
        disallow: ['/og-image']
      }
    ],
    sitemap: 'https://veyrauch.ru/sitemap.xml'
  },

  runtimeConfig: {
    public: {
      yandexMetrikaId: process.env.YANDEX_METRIKA_ID || '110248286',
      googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID || 'G-PSR45G61DT',
      googleSiteVerification: process.env.GOOGLE_SITE_VERIFICATION || ''
    }
  }
})
