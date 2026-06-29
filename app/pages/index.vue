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
          <span class="neon-text">K-pop</span> танцы в Краснодаре:<br>
          <span class="title-sub">от первых шагов до уверенного cover-выступления</span>
        </h1>
        <h2 class="subtitle">Набор в группу для начинающих</h2>
        
        <div class="buttons-row">
          <StringWaveButton>Запишись на пробное занятие</StringWaveButton>
        </div>
      </main>
    </div>

    <AboutSection />

    <VideoGallery />

    <section class="section faq-section">
      <SectionHeading>Сомневаешься, стоит ли начинать?</SectionHeading>
      <div class="faq-list">
        <FaqAccordion 
          v-for="(faq, index) in faqs" 
          :key="index"
          :question="faq.question"
          :answer="faq.answer"
        />
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
    answer: 'Главное правило — тебе должно быть комфортно двигаться! Идеально подойдут широкие штаны или джоггеры, свободная оверсайз-футболка или кроп-топ, а на ноги — удобные чистые кроссовки. Выбирай то, в чем чувствуешь себя свободно и уверенно. Мы приходим танцевать и кайфовать от процесса, а фирменный K-pop стиль обязательно придет со временем!'
  }
];

// Управление прелоадером с учетом куки (работает и на сервере, избавляет от моргания)
const preloaderCookie = useCookie('preloaderShown', { maxAge: 5 * 60 * 60 });

// Если кука есть, значит мы показывали прелоадер менее 5 часов назад
const preloaderFinished = ref(!!preloaderCookie.value);

function onPreloaderComplete() {
  preloaderFinished.value = true;
  preloaderCookie.value = 'true';
}

useHead({
  title: 'K-pop танцы в Краснодаре | Студия Veyrauch — Записаться на танцы',
  meta: [
    { name: 'description', content: 'Школа K-pop танцев Veyrauch в центре Краснодара. Набор в группы для начинающих с нуля. Научим танцевать любимые cover-хореографии в комфортной атмосфере.' },
    { property: 'og:title', content: 'K-pop танцы в Краснодаре | Студия Veyrauch' },
    { property: 'og:description', content: 'Набор в группу для начинающих. Разбираем движения медленно и пошагово!' },
    { property: 'og:image', content: '/og-image.jpg' }, // Эту картинку мы позже сделаем
    { property: 'og:type', content: 'website' }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'DanceSchool',
        name: 'Veyrauch Cover Dance',
        description: 'Школа K-pop танцев для начинающих в Краснодаре.',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Краснодар',
          addressRegion: 'Краснодарский край',
          addressCountry: 'RU'
        }
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
/* Начальное состояние контента: скрыт и размыт */
.hero-wrapper {
  opacity: 0;
  filter: blur(20px);
  transition: opacity 1.5s ease-out, filter 1.5s ease-out;
}

.fade-in-header {
  opacity: 0;
  filter: blur(20px);
}

.hero-wrapper {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* Проявление из жидкости */
.hero-wrapper.hero-visible, .fade-in-header.hero-visible {
  opacity: 1;
  filter: blur(0px);
}


.content {
  text-align: center;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

.title {
  font-family: 'Unbounded', sans-serif;
  font-size: var(--text-h1);
  font-weight: 900;
  line-height: 1.2;
  letter-spacing: -2px;
  color: var(--text-color);
  text-transform: uppercase;
  margin-bottom: 30px;
}

.title-sub {
  font-family: 'Manrope', sans-serif;
  font-size: var(--text-subtitle);
  font-weight: 500;
  color: rgba(255,255,255,0.9);
  letter-spacing: 0;
  display: block;
  margin-top: 10px;
}

.neon-text {
  color: transparent;
  -webkit-text-stroke: 2px var(--neon-red);
  text-shadow: 0 0 25px rgba(255, 16, 83, 0.6);
}

.subtitle {
  font-family: 'Tektur', sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.7);
  max-width: 600px;
}

.buttons-row {
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
}

.faq-section {
  z-index: 2; /* To ensure it stays above background dots */
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
