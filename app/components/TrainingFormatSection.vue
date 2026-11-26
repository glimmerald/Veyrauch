<template>
  <section id="format" class="section format-section">
    <SectionHeading>Как проходят занятия</SectionHeading>

    <div class="container">
      <p class="format-lead">
        Тренировки проходят в <strong>камерных мини-группах (5–8 человек)</strong> для подростков и молодежи
        <strong>от 12–14 до 25 лет</strong>. Никакой толпы и стеснения — преподаватель видит каждого ученика и помогает
        разобраться в движениях с нуля.
      </p>

      <ul class="format-badges" aria-label="Ключевые особенности группы">
        <li class="format-badge">
          <span class="badge-dot badge-dot--red" aria-hidden="true"></span>
          Длительность: 60 минут
        </li>
        <li class="format-badge">
          <span class="badge-dot badge-dot--purple" aria-hidden="true"></span>
          Мини-группа до 6–8 человек
        </li>
        <li class="format-badge">
          <span class="badge-dot badge-dot--green" aria-hidden="true"></span>
          Возраст: 12–25 лет
        </li>
        <li class="format-badge">
          <span class="badge-dot badge-dot--red" aria-hidden="true"></span>
          Подготовка: с нуля
        </li>
      </ul>

      <div class="steps-grid">
        <article v-for="step in steps" :key="step.num" class="step-card glass-panel">
          <header class="step-header">
            <span class="step-num">{{ step.num }}</span>
            <span class="step-time">{{ step.time }}</span>
            <h3 class="step-title">{{ step.title }}</h3>
          </header>
          <p class="step-desc">{{ step.desc }}</p>
        </article>
      </div>

      <div class="groups-box glass-panel">
        <div class="groups-header">
          <h3 class="groups-title">Хореографии каких K-pop групп мы разбираем</h3>
          <p class="groups-subtitle">
            Учим яркие женские и мощные мужские связки — от главных хитов корейской сцены до свежих камбэков:
          </p>
        </div>

        <ul class="groups-tags" aria-label="Список K-pop групп">
          <li v-for="group in kpopGroups" :key="group" class="group-tag">
            {{ group }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
const steps = [
  {
    num: '01',
    time: '15 минут',
    title: 'Разминка и разогрев',
    desc: 'Готовим суставы, связки и мышцы к активной работе, включаем базовую координацию, изоляцию корпуса и чувство ритма.'
  },
  {
    num: '02',
    time: '35–40 минут',
    title: 'Разбор и отработка связки',
    desc: 'Пошагово учим хореографию выбранной K-pop группы в комфортном темпе: сначала под счет, затем соединяем движения под музыку.'
  },
  {
    num: '03',
    time: 'Видео-фиксация',
    title: 'Снимаем выученный фрагмент',
    desc: 'Записываем выученную связку на видео, чтобы ты видела свой прогресс и могла с комфортом повторять хореографию дома.'
  },
  {
    num: '04',
    time: '5–10 минут',
    title: 'Растяжка и подкачка',
    desc: 'В финале мягко тянем продольный шпагат и спину, качаем пресс и укрепляем мышцы для легких, пластичных и четких линий.'
  }
]

const kpopGroups = [
  'TWICE',
  'BLACKPINK',
  'aespa',
  'NewJeans',
  'BABYMONSTER',
  'ITZY',
  '(G)I-DLE',
  'ILLIT',
  'XG',
  'KATSEYE',
  'SEVENTEEN',
  'TXT',
  'ENHYPEN',
  'NCT',
  'ZEROBASEONE',
  'P1Harmony',
  'THE BOYZ',
  'MONSTA X',
  'Dreamcatcher',
  'MAMAMOO',
  'Kep1er',
  'VIVIZ',
  'GFriend',
  'LOONA',
  'YENA',
  'Hearts2Hearts',
  'XLOV'
]
</script>

<style scoped>
.format-section {
  z-index: 2;
}

.format-lead {
  font-family: 'Manrope', sans-serif;
  font-size: clamp(1rem, 1.8vw, 1.2rem);
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.85);
  max-width: 820px;
  margin-block-end: 24px;
}

.format-lead strong {
  color: #fff;
  font-weight: 700;
}

.format-badges {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-block-end: 40px;
}

.format-badge {
  display: inline-flex;
  align-items: safe center;
  gap: 10px;
  padding: 8px 16px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.12);
  font-family: 'Manrope', sans-serif;
  font-size: 0.92rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.92);
}

.badge-dot {
  inline-size: 8px;
  block-size: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.badge-dot--red {
  background: var(--neon-red);
  box-shadow: 0 0 8px var(--neon-red);
}

.badge-dot--purple {
  background: var(--neon-purple);
  box-shadow: 0 0 8px var(--neon-purple);
}

.badge-dot--green {
  background: var(--neon-green);
  box-shadow: 0 0 8px var(--neon-green);
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-template-rows: auto 1fr;
  gap: 20px;
  margin-block-end: 40px;
}

.step-card {
  grid-row: span 2;
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-rows: subgrid;
  row-gap: 14px;
  padding: 26px 24px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(12, 12, 14, 0.65);
  transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
}

.step-card:hover {
  border-color: rgba(176, 38, 255, 0.55);
  transform: translateY(-4px);
  box-shadow: 0 14px 35px rgba(0, 0, 0, 0.45), 0 0 25px rgba(176, 38, 255, 0.12);
}

.step-header {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 8px 12px;
}

.step-num {
  font-family: 'Unbounded', sans-serif;
  font-size: 1.35rem;
  font-weight: 900;
  color: var(--neon-red);
  text-shadow: 0 0 12px rgba(255, 16, 83, 0.55);
}

.step-time {
  font-family: 'Tektur', sans-serif;
  font-size: 0.82rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--neon-green);
  padding: 3px 10px;
  border-radius: 6px;
  background: rgba(0, 255, 115, 0.08);
  border: 1px solid rgba(0, 255, 115, 0.22);
  margin-inline-start: auto;
}

.step-title {
  inline-size: 100%;
  font-family: 'Unbounded', sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  line-height: 1.35;
  color: #fff;
  margin-block-start: 6px;
}

.step-desc {
  font-family: 'Manrope', sans-serif;
  font-size: 0.96rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.78);
}

.groups-box {
  padding: 32px 28px;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(145deg, rgba(18, 12, 24, 0.75) 0%, rgba(10, 10, 12, 0.75) 100%);
}

.groups-header {
  margin-block-end: 22px;
}

.groups-title {
  font-family: 'Unbounded', sans-serif;
  font-size: clamp(1.15rem, 2.2vw, 1.5rem);
  font-weight: 800;
  color: #fff;
  margin-block-end: 8px;
  line-height: 1.3;
}

.groups-subtitle {
  font-family: 'Manrope', sans-serif;
  font-size: 0.98rem;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.75);
}

.groups-tags {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  flex-wrap: balance;
  gap: 10px;
}

.group-tag {
  font-family: 'Unbounded', sans-serif;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: rgba(255, 255, 255, 0.92);
  padding: 8px 15px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.12);
  transition: border-color 0.25s ease, color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
}

.group-tag:hover {
  color: #fff;
  background: rgba(255, 16, 83, 0.14);
  border-color: var(--neon-red);
  box-shadow: 0 0 14px rgba(255, 16, 83, 0.3);
}

@media (max-width: 768px) {
  .step-card {
    padding: 20px 18px;
  }

  .groups-box {
    padding: 24px 18px;
    border-radius: 18px;
  }

  .group-tag {
    font-size: 0.76rem;
    padding: 7px 12px;
  }
}
</style>
