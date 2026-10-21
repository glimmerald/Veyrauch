<template>
  <div>
    <!-- Прелоадер GSAP Timeline -->
    <AppPreloader v-if="!preloaderFinished" @complete="onPreloaderComplete" />

    <!-- Глобальные точки поверх всего сайта (анимированные) -->
    <BackgroundDots />

    <!-- Основной контент страницы -->
    <AppHeader :class="{ 'hero-visible': preloaderFinished }" class="fade-in-header" />

    <div class="hero-wrapper" :class="{ 'hero-visible': preloaderFinished }">
      <main class="content">
        <h1 class="title">
          <span class="title-line"><NeonKpop /> танцы в</span>
          <span class="title-line">Краснодаре:</span>
          <span class="title-sub">от первых шагов до уверенного cover-выступления</span>
        </h1>
        <h2 class="subtitle">Набор в группу для начинающих</h2>

        <div class="buttons-row">
          <StringWaveButton class="hero-cta-btn" :href="'https://t.me/jsmjm?text=' + encodeURIComponent('Здравствуйте! Хочу записаться на пробное занятие.')" target="_blank">Запишись на пробное занятие</StringWaveButton>
        </div>
      </main>
    </div>

    <AboutSection />

    <VideoGallery />

    <section class="section faq-section">
      <SectionHeading>Сомневаешься, стоит ли начинать?</SectionHeading>
      <div class="faq-list">
        <FaqAccordion v-for="(faq, index) in faqs" :key="index" :question="faq.question" :answer="faq.answer" />
      </div>
    </section>

    <AppFooter />

    <CookieBanner />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const faqs = [
  {
    question: 'Что делать, если у меня нулевой уровень и я никогда не танцевала?',
    answer: 'Мы специализируемся именно на новичках. Разбираем каждое движение медленно и пошагово. В группе все будут начинать с нуля, поэтому тебе будет максимально комфортно.'
  },
  {
    question: 'А если у меня совсем нет пластики и я "деревянная"?',
    answer: 'Пластика — это не врожденный дар, а навык. Наши разминки и специальные упражнения мягко развивают гибкость и изоляцию тела с первых же занятий.'
  },
  {
    question: 'Вдруг я не выучу хореографию и буду отставать?',
    answer: 'Мы не гонимся за скоростью. Наша цель — кайфовать от процесса и любимой музыки. К тому же, мы даем видео-разборы движений для домашнего повторения.'
  },
  {
    question: 'В чем приходить на тренировки? Нужно ли покупать какую-то специальную форму?',
    answer: 'Главное правило — тебе должно быть комфортно двигаться! Идеально подойдут широкие штаны или джоггеры, свободная оверсайз-футболка или кроп-топ, а на ноги — удобные чистые кроссовки. Выбирай то, в чем чувствуешь себя свободно и уверенно. Мы приходим танцевать и кайфовать от процесса.'
  }
];

// Конфигурация и проверка поисковых ботов
const config = useRuntimeConfig();
const userAgent = import.meta.server 
  ? (useRequestHeaders(['user-agent'])['user-agent'] || '')
  : (typeof navigator !== 'undefined' ? navigator.userAgent : '');
const isBot = /bot|google|crawler|spider|robot|crawling/i.test(userAgent);

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
const siteName = 'Veyrauch Cover Dance';
const ogImage = 'https://veyrauch.ru/og-image.jpg';

useHead({
  title: 'K-pop танцы в Краснодаре | Студия Veyrauch — Записаться на танцы',
  link: [
    { rel: 'canonical', href: canonicalUrl }
  ],
  meta: [
    { name: 'description', content: 'Школа K-pop танцев Veyrauch в центре Краснодара. Набор в группы для начинающих с нуля. Научим танцевать любимые cover-хореографии в комфортной атмосфере.' },
    { name: 'keywords', content: 'k-pop танцы краснодар, кавердэнс краснодар, школа k-pop танцев краснодар, k-pop cover dance краснодар, танцы для начинающих краснодар, студия танцев veyrauch' },
    { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
    
    // Open Graph
    { property: 'og:site_name', content: siteName },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: canonicalUrl },
    { property: 'og:title', content: 'K-pop танцы в Краснодаре | Студия Veyrauch — Записаться на танцы' },
    { property: 'og:description', content: 'Школа K-pop танцев Veyrauch в центре Краснодара. Набор в группу для начинающих с нуля. Разбираем движения медленно и пошагово!' },
    { property: 'og:image', content: ogImage },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: 'Студия K-pop танцев Veyrauch в Краснодаре' },
    { property: 'og:locale', content: 'ru_RU' },

    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'K-pop танцы в Краснодаре | Студия Veyrauch' },
    { name: 'twitter:description', content: 'Набор в группу для начинающих с нуля в центре Краснодара.' },
    { name: 'twitter:image', content: ogImage },

    // Google Search Console подтверждение (если передано через env или конфиг)
    ...(config.public.googleSiteVerification ? [{ name: 'google-site-verification', content: config.public.googleSiteVerification }] : [])
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'DanceSchool',
        '@id': 'https://veyrauch.ru/#school',
        name: 'Veyrauch Cover Dance',
        alternateName: 'Студия K-pop танцев Veyrauch в Краснодаре',
        description: 'Школа K-pop танцев для начинающих в Краснодаре. Обучение cover dance с нуля, разбор хореографий, комфортная атмосфера.',
        url: 'https://veyrauch.ru/',
        telephone: '+7-905-858-30-82',
        image: ogImage,
        priceRange: '₽₽',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Краснодар',
          addressRegion: 'Краснодарский край',
          addressCountry: 'RU'
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 45.035470,
          longitude: 38.975313
        },
        sameAs: [
          'https://t.me/jsmjm'
        ]
      })
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
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
  transform: translateY(20px);
  transition: opacity 1.5s ease-out, transform 1.5s ease-out;
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
  max-width: 600px;
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
