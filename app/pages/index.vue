<template>
  <div>
    <!-- Прелоадер GSAP Timeline -->
    <AppPreloader v-if="!preloaderFinished" @complete="onPreloaderComplete" />

    <!-- Глобальные точки поверх всего сайта (анимированные) -->
    <BackgroundDots />

    <!-- Основной контент страницы -->
    <AppHeader :class="{ 'hero-visible': preloaderFinished }" class="fade-in-header" />

    <main>
      <section class="hero-wrapper" :class="{ 'hero-visible': preloaderFinished }">
        <div class="content">
          <h1 class="title">
            <span class="title-line">Школа <NeonKpop /> танцев</span>
            <span class="title-line">в Краснодаре</span>
            <span class="title-sub">Обучение cover dance с нуля — от первых шагов до уверенного выступления</span>
          </h1>
          <p class="subtitle">Мини-группы с нуля • Центр (р-н ТРЦ «Галерея») • Пробное от 400 ₽</p>

          <div class="buttons-row">
            <StringWaveButton class="hero-cta-btn" goal="tg_hero" :href="'https://t.me/jsmjm?text=' + encodeURIComponent('Здравствуйте! Хочу записаться на пробное занятие.')" target="_blank">Запишись на пробное занятие</StringWaveButton>
          </div>
        </div>
      </section>

      <AboutSection />

      <TrainingFormatSection />

      <VideoGallery />

      <PricingSection />

      <LocationSection />

      <section id="faq" class="section faq-section">
        <SectionHeading>Сомневаешься, стоит ли начинать?</SectionHeading>
        <div class="faq-list">
          <FaqAccordion v-for="(faq, index) in faqs" :key="index" :question="faq.question" :answer="faq.answer" />
        </div>
      </section>
    </main>

    <AppFooter />

    <CookieBanner />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const faqs = [
  {
    question: 'Что делать, если у меня нулевой уровень и я никогда не занималась танцами?',
    answer: 'Наша школа танцев специализируется именно на обучении новичков с нуля. Мы занимаемся в небольших мини-группах по 5–8 человек, разбираем каждое движение медленно и пошагово. Все начинают в равных условиях, поэтому тебе будет максимально комфортно без толпы и стеснения.'
  },
  {
    question: 'А если у меня совсем нет пластики и растяжки?',
    answer: 'Пластика — это не врожденный дар, а тренируемый навык. Каждое занятие начинается с 15-минутной разминки, а последние 5–10 минут урока мы мягко тянем продольный шпагат и спину, качаем пресс и развиваем гибкость тела.'
  },
  {
    question: 'Вдруг я не выучу сложную K-pop хореографию и буду отставать?',
    answer: 'Мы не гонимся за скоростью — 35–40 минут урока посвящены спокойному разбору и отработке связки. А в конце каждого занятия мы снимаем выученный фрагмент на видео, чтобы ты могла повторять движения дома в удобном темпе.'
  },
  {
    question: 'Со скольки лет можно записаться и сколько человек в группе?',
    answer: 'Мы набираем учеников в возрасте от 12–14 до 25 лет. Тренировки проходят в камерных мини-группах (около 5–8 человек), благодаря чему преподаватель уделяет персональное внимание каждому.'
  },
  {
    question: 'Где находится зал и удобно ли туда добираться?',
    answer: 'Занятия проходят в самом центре Краснодара по адресу: ул. Володи Головатого, 274 (недалеко от ТРЦ «Галерея Краснодар» и ул. Аэродромной). Отличная транспортная развязка позволяет легко доехать из любого района города.'
  },
  {
    question: 'Сколько стоит пробное занятие и абонементы на танцы?',
    answer: 'Пробное занятие стоит от 400 ₽. Абонемент на 4 занятия — от 1 600 ₽, а выгодный абонемент на 8 занятий — от 3 000 ₽. Точную стоимость и свободные места в группе подскажем при записи в Telegram.'
  },
  {
    question: 'В чем приходить на тренировки? Нужно ли покупать специальную форму?',
    answer: 'Главное правило — тебе должно быть комфортно двигаться! Идеально подойдут широкие штаны или джоггеры, свободная оверсайз-футболка или кроп-топ, а на ноги — удобные чистые сменные кроссовки.'
  }
];

// Конфигурация и проверка поисковых ботов
const config = useRuntimeConfig();
const userAgent = import.meta.server 
  ? (useRequestHeaders(['user-agent'])['user-agent'] || '')
  : (typeof navigator !== 'undefined' ? navigator.userAgent : '');
const isBot = /bot|google|yandex|crawler|spider|robot|crawling|lighthouse|pagespeed|gtmetrix|headless/i.test(userAgent);

// Управление прелоадером с учетом куки и краулеров
const preloaderCookie = useCookie('preloaderShown', { maxAge: 5 * 60 * 60 });

// Для поисковых ботов сразу отдаем готовый контент (чтобы Googlebot и Яндекс не натыкались на 6с прелоадер с opacity: 0)
const preloaderFinished = ref(isBot ? true : false);

onMounted(() => {
  // Проверяем куку только после гидратации на стороне клиента
  if (preloaderCookie.value || isBot) {
    preloaderFinished.value = true;
  }
});

function onPreloaderComplete() {
  preloaderFinished.value = true;
  preloaderCookie.value = 'true';
}

const canonicalUrl = 'https://veyrauch.ru/';
const siteName = 'Школа K-pop танцев Veyrauch';
const ogImage = 'https://veyrauch.ru/og-image.jpg';

useHead({
  title: 'Школа K-pop танцев в Краснодаре (Центр) | Обучение с нуля от 400 ₽ — Veyrauch',
  link: [
    { rel: 'canonical', href: canonicalUrl }
  ],
  meta: [
    { name: 'description', content: 'Школа K-pop танцев Veyrauch в центре Краснодара (ул. Володи Головатого, 274, р-н ТРЦ Галерея). Обучение cover dance с нуля для подростков и молодежи 12–25 лет в мини-группах. Пробное занятие от 400 ₽, абонементы от 1600 ₽!' },
    { name: 'keywords', content: 'школа танцев краснодар, k-pop танцы краснодар, школа k-pop танцев краснодар, обучение к-поп танцам краснодар, кавердэнс краснодар, cover dance краснодар, танцы центр краснодар, танцы рядом с галереей краснодар, танцы для подростков краснодар, танцы для начинающих краснодар цена, пробное занятие танцы краснодар, студия танцев veyrauch' },
    { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
    
    // Open Graph
    { property: 'og:site_name', content: siteName },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: canonicalUrl },
    { property: 'og:title', content: 'Школа K-pop танцев в Краснодаре | С нуля в мини-группах — Veyrauch' },
    { property: 'og:description', content: 'Обучение K-pop и cover dance с нуля в центре Краснодара (ул. Володи Головатого, 274). Мини-группы 12–25 лет, разбор хитов TWICE, BLACKPINK, aespa, NewJeans, SEVENTEEN, TXT. Пробное от 400 ₽!' },
    { property: 'og:image', content: ogImage },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: 'Школа K-pop танцев Veyrauch в Краснодаре' },
    { property: 'og:locale', content: 'ru_RU' },

    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Школа K-pop танцев в Краснодаре | Студия Veyrauch' },
    { name: 'twitter:description', content: 'Обучение K-pop танцам и cover dance с нуля в центре Краснодара (р-н ТРЦ Галерея). Мини-группы, пробное занятие от 400 ₽.' },
    { name: 'twitter:image', content: ogImage },

    // Google Search Console подтверждение (если передано через env или конфиг)
    ...(config.public.googleSiteVerification ? [{ name: 'google-site-verification', content: config.public.googleSiteVerification }] : [])
  ],
  noscript: [
    {
      innerHTML: '<style>.preloader{display:none!important}.hero-wrapper,.fade-in-header{opacity:1!important;transform:none!important}</style>'
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'DanceSchool',
        '@id': 'https://veyrauch.ru/#school',
        name: 'Школа K-pop танцев Veyrauch',
        alternateName: [
          'Студия K-pop танцев Veyrauch в Краснодаре',
          'Veyrauch Cover Dance',
          'Школа танцев Краснодар Veyrauch'
        ],
        description: 'Школа танцев и студия K-pop в центре Краснодара (ул. Володи Головатого, 274, рядом с ТРЦ Галерея). Обучение cover dance для начинающих с нуля в мини-группах для возраста 12–25 лет.',
        url: 'https://veyrauch.ru/',
        telephone: '+7-905-858-30-82',
        image: ogImage,
        priceRange: 'от 400 ₽ до 3000 ₽',
        currenciesAccepted: 'RUB',
        paymentAccepted: 'Cash, Credit Card, Bank Transfer',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'ул. Володи Головатого, 274',
          addressLocality: 'Краснодар',
          addressRegion: 'Краснодарский край',
          postalCode: '350000',
          addressCountry: 'RU'
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 45.040279,
          longitude: 38.964282
        },
        hasMap: 'https://yandex.ru/maps/?text=%D0%9A%D1%80%D0%B0%D1%81%D0%BD%D0%BE%D0%B4%D0%B0%D1%80%2C%20%D1%83%D0%BB%D0%B8%D1%86%D0%B0%20%D0%92%D0%BE%D0%BB%D0%BE%D0%B4%D0%B8%20%D0%93%D0%BE%D0%BB%D0%BE%D0%B2%D0%B0%D1%82%D0%BE%D0%B3%D0%BE%2C%20274',
        areaServed: {
          '@type': 'City',
          name: 'Краснодар'
        },
        knowsAbout: [
          'K-pop танцы',
          'Cover Dance',
          'Кавердэнс',
          'Школа танцев в Краснодаре',
          'Обучение танцам с нуля',
          'Современная хореография',
          'Растяжка и пластика',
          'Хореографии TWICE, BLACKPINK, aespa, NewJeans, BABYMONSTER, ITZY, SEVENTEEN, TXT, ENHYPEN, NCT'
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Абонементы и занятия K-pop танцами',
          itemListElement: [
            {
              '@type': 'Offer',
              name: 'Пробное занятие в школе K-pop танцев Veyrauch',
              priceCurrency: 'RUB',
              priceSpecification: {
                '@type': 'PriceSpecification',
                minPrice: 400,
                priceCurrency: 'RUB'
              },
              url: 'https://veyrauch.ru/#prices',
              itemOffered: {
                '@type': 'Service',
                name: 'Пробное занятие по K-pop танцам (60 минут)',
                description: 'Знакомство с преподавателем, разминка и пошаговое изучение первой K-pop связки с нуля в мини-группе.'
              }
            },
            {
              '@type': 'Offer',
              name: 'Абонемент на 4 занятия K-pop Cover Dance',
              priceCurrency: 'RUB',
              priceSpecification: {
                '@type': 'PriceSpecification',
                minPrice: 1600,
                priceCurrency: 'RUB'
              },
              url: 'https://veyrauch.ru/#prices',
              itemOffered: {
                '@type': 'Service',
                name: 'Абонемент на 4 занятия в мини-группе',
                description: 'Обучение K-pop танцам с нуля: разминка, разбор хореографии, видео-съемка связки и растяжка.'
              }
            },
            {
              '@type': 'Offer',
              name: 'Абонемент на 8 занятий K-pop Cover Dance',
              priceCurrency: 'RUB',
              priceSpecification: {
                '@type': 'PriceSpecification',
                minPrice: 3000,
                priceCurrency: 'RUB'
              },
              url: 'https://veyrauch.ru/#prices',
              itemOffered: {
                '@type': 'Service',
                name: 'Абонемент на 8 занятий в мини-группе',
                description: 'Регулярные тренировки 2 раза в неделю в центре Краснодара: отработка корейских хореографий, видеофиксация и растяжка на шпагат.'
              }
            }
          ]
        },
        sameAs: [
          'https://t.me/jsmjm'
        ]
      })
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        }))
      })
    }
  ]
});
</script>

<style scoped>
/* Начальное состояние контента: скрыт */
.hero-wrapper {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.65s ease-out, transform 0.65s ease-out;
}

.fade-in-header {
  opacity: 0;
  transform: translateY(-10px);
}

.hero-wrapper {
  position: relative;
  width: 100%;
  max-width: 100%;
  min-height: 100vh;
  min-height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-sizing: border-box;
  padding: 100px var(--container-padding-x) 50px;
}

/* Проявление */
.hero-wrapper.hero-visible,
.fade-in-header.hero-visible {
  opacity: 1;
  transform: translateY(0);
}

.content {
  text-align: center;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
  width: 100%;
  max-width: 1050px;
  margin: 0 auto;
}

.title {
  font-family: 'Unbounded', sans-serif;
  font-size: var(--text-h1);
  font-weight: 900;
  line-height: 1.25;
  letter-spacing: -2px;
  color: var(--text-color);
  text-transform: uppercase;
  margin-bottom: 20px;
  word-break: normal;
  overflow-wrap: break-word;
}

.title-line {
  display: inline;
}

.title-line:first-child {
  margin-right: 0.28em;
}

.title-sub {
  font-family: 'Manrope', sans-serif;
  font-size: var(--text-subtitle);
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 0;
  display: block;
  margin-top: 14px;
  line-height: 1.45;
  text-transform: none;
}

.subtitle {
  font-family: 'Tektur', sans-serif;
  font-size: clamp(0.85rem, 2.5vw, 1.2rem);
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
  max-width: 780px;
  text-wrap: balance;
  padding: 0 var(--container-padding-x);
}

.buttons-row {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
  padding: 0 var(--container-padding-x);
  width: 100%;
}

@media (max-width: 768px) {
  .hero-wrapper {
    padding-top: 85px;
    padding-bottom: 40px;
  }

  .content {
    gap: 20px;
  }

  .title {
    letter-spacing: -1px;
    line-height: 1.25;
    margin-bottom: 10px;
  }

  .title-line {
    display: block;
  }

  .title-line:first-child {
    margin-right: 0;
    margin-bottom: 4px;
  }

  .title-sub {
    margin-top: 10px;
  }

  .buttons-row {
    margin-top: 15px;
    flex-direction: column;
    gap: 15px;
  }

  .hero-cta-btn {
    width: 100%;
    max-width: 360px;
  }
}

@media (max-width: 480px) {
  .hero-wrapper {
    padding-top: 75px;
    padding-bottom: 30px;
  }

  .content {
    gap: 16px;
  }

  .title {
    letter-spacing: -0.5px;
    line-height: 1.26;
  }

  .subtitle {
    letter-spacing: 1px;
  }

  .buttons-row {
    margin-top: 10px;
  }

  .hero-cta-btn {
    max-width: 330px;
  }
}

.faq-section {
  z-index: 2;
  /* To ensure it stays above background dots */
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 800px;
  margin: 40px auto 0;
  padding: 0 var(--container-padding-x);
}
</style>
