<template>
  <section id="prices" class="section pricing-section">
    <SectionHeading>Стоимость и абонементы</SectionHeading>

    <div class="container">
      <p class="pricing-lead">
        Прозрачные тарифы для начинающих танцоров в Краснодаре. Начни с пробной тренировки, познакомься с залом и
        мини-группой, а затем выбери удобный абонемент.
      </p>

      <div class="pricing-grid">
        <article
          v-for="plan in plans"
          :key="plan.id"
          class="price-card glass-panel"
          :class="{ 'price-card--featured': plan.featured }"
        >
          <header class="price-header">
            <span v-if="plan.badge" class="price-badge">{{ plan.badge }}</span>
            <h3 class="price-title">{{ plan.title }}</h3>
            <p class="price-amount">
              <span class="price-prefix">от</span>
              <span class="price-value">{{ plan.price }}</span>
              <span class="price-currency">₽</span>
            </p>
            <p class="price-period">{{ plan.subtitle }}</p>
          </header>

          <ul class="price-features">
            <li v-for="feature in plan.features" :key="feature" class="price-feature">
              <span class="feature-check" aria-hidden="true">✦</span>
              <span>{{ feature }}</span>
            </li>
          </ul>

          <footer class="price-footer">
            <StringWaveButton
              class="price-cta"
              :goal="`tg_price_${plan.id}`"
              :href="getTelegramUrl(plan.tgMessage)"
              target="_blank"
            >
              {{ plan.cta }}
            </StringWaveButton>
          </footer>
        </article>
      </div>

      <p class="pricing-note">
        * Итоговая стоимость абонемента и расписание групп зависят от зала и выбранных дней тренировок. Напиши нам в
        Telegram — подскажем актуальное расписание набора!
      </p>
    </div>
  </section>
</template>

<script setup>
const plans = [
  {
    id: 'trial',
    badge: 'Для знакомства',
    title: 'Пробное занятие',
    price: '400',
    subtitle: 'Разовая тренировка • 60 минут',
    featured: false,
    features: [
      'Знакомство с преподавателем и форматом студии',
      'Разминка, изучение первой K-pop связки с нуля',
      'Комфортная мини-группа без стресса и спешки',
      'Поможем подобрать группу под твой график'
    ],
    cta: 'Записаться на пробное',
    tgMessage: 'Здравствуйте! Хочу записаться на пробное занятие по K-pop танцам.'
  },
  {
    id: 'pack8',
    badge: 'Популярный выбор',
    title: 'Абонемент на 8 занятий',
    price: '3 000',
    subtitle: 'Оптимально на месяц (2 раза в неделю)',
    featured: true,
    features: [
      'Выгодная цена за урок в абонементе',
      'Полноценный разбор и отработка K-pop хореографий',
      'Съемка выученных связок на видео для практики дома',
      'Растяжка на шпагат, гибкость спины и подкачка в конце урока'
    ],
    cta: 'Выбрать 8 занятий',
    tgMessage: 'Здравствуйте! Хочу узнать расписание и записаться на абонемент 8 занятий.'
  },
  {
    id: 'pack4',
    badge: 'Лёгкий старт',
    title: 'Абонемент на 4 занятия',
    price: '1 600',
    subtitle: 'Удобный график (1 раз в неделю)',
    featured: false,
    features: [
      'Отличный вариант при плотной учебе или работе',
      'Камерная группа 5–8 человек и внимание тренера',
      'Видео-разбор изученного фрагмента после тренировки',
      'Бережная растяжка и укрепление мышц кора'
    ],
    cta: 'Выбрать 4 занятия',
    tgMessage: 'Здравствуйте! Хочу узнать расписание и записаться на абонемент 4 занятия.'
  }
]

function getTelegramUrl(message) {
  return `https://t.me/jsmjm?text=${encodeURIComponent(message)}`
}
</script>

<style scoped>
.pricing-section {
  z-index: 2;
}

.pricing-lead {
  font-family: 'Manrope', sans-serif;
  font-size: clamp(1rem, 1.8vw, 1.15rem);
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.82);
  max-width: 780px;
  margin-block-end: 40px;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  grid-template-rows: auto 1fr auto;
  gap: 24px;
}

.price-card {
  grid-row: span 3;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-rows: subgrid;
  row-gap: 24px;
  padding: 32px 26px;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(12, 12, 15, 0.7);
  transition: transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
}

.price-card:hover {
  transform: translateY(-5px);
  border-color: rgba(255, 255, 255, 0.28);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.5);
}

.price-card--featured {
  border-color: rgba(255, 16, 83, 0.55);
  background: linear-gradient(160deg, rgba(32, 10, 22, 0.82) 0%, rgba(12, 12, 16, 0.85) 100%);
  box-shadow: 0 16px 45px rgba(255, 16, 83, 0.14);
}

.price-card--featured:hover {
  border-color: var(--neon-red);
  box-shadow: 0 20px 50px rgba(255, 16, 83, 0.24);
}

.price-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}

.price-badge {
  font-family: 'Tektur', sans-serif;
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  padding: 5px 12px;
  border-radius: 999px;
  color: rgba(255, 255, 255, 0.9);
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.14);
}

.price-card--featured .price-badge {
  color: #fff;
  background: rgba(255, 16, 83, 0.22);
  border-color: rgba(255, 16, 83, 0.6);
  box-shadow: 0 0 15px rgba(255, 16, 83, 0.35);
}

.price-title {
  font-family: 'Unbounded', sans-serif;
  font-size: 1.2rem;
  font-weight: 800;
  line-height: 1.3;
  color: #fff;
  margin-block-start: 4px;
}

.price-amount {
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-block-start: 4px;
}

.price-prefix {
  font-family: 'Manrope', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.65);
}

.price-value {
  font-family: 'Unbounded', sans-serif;
  font-size: clamp(1.9rem, 3vw, 2.45rem);
  font-weight: 900;
  color: #fff;
  letter-spacing: -1px;
}

.price-card--featured .price-value {
  text-shadow: 0 0 20px rgba(255, 16, 83, 0.45);
}

.price-currency {
  font-family: 'Unbounded', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--neon-red);
}

.price-period {
  font-family: 'Manrope', sans-serif;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.65);
}

.price-features {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-block-start: 16px;
  border-block-start: 1px solid rgba(255, 255, 255, 0.08);
}

.price-feature {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-family: 'Manrope', sans-serif;
  font-size: 0.95rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.85);
}

.feature-check {
  color: var(--neon-green);
  font-size: 0.85rem;
  line-height: 1.6;
  flex-shrink: 0;
  text-shadow: 0 0 8px rgba(0, 255, 115, 0.5);
}

.price-footer {
  display: flex;
  inline-size: 100%;
}

.price-cta {
  inline-size: 100%;
  padding: 14px 20px !important;
  font-size: 0.86rem !important;
  letter-spacing: 1.2px !important;
}

.pricing-note {
  margin-block-start: 24px;
  font-family: 'Manrope', sans-serif;
  font-size: 0.88rem;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.55);
  max-width: 760px;
}

@media (max-width: 768px) {
  .price-card {
    padding: 26px 20px;
  }
}
</style>
