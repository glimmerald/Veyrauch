<template>
  <section id="location" class="section location-section">
    <SectionHeading>Где проходят занятия</SectionHeading>

    <div class="container">
      <article class="location-card glass-panel">
        <div class="location-glow" aria-hidden="true"></div>

        <div class="location-main">
          <div class="location-badge-row">
            <span class="location-district">Центральный округ</span>
            <span class="location-landmark">Рядом с ТРЦ «Галерея Краснодар»</span>
          </div>

          <h3 class="location-address">
            г. Краснодар, ул. Володи Головатого, 274
          </h3>

          <p class="location-desc">
            Студия расположена в самом центре Краснодара (район пересечения ул. Володи Головатого и ул. Аэродромной, в
            нескольких кварталах от ТРЦ «Галерея»). Сюда легко и быстро добираться после школы, университета или работы
            из любого района города на трамвае, троллейбусе или автобусе.
          </p>

          <dl class="location-details">
            <div class="detail-item">
              <dt>Формат зала</dt>
              <dd>Просторный зал с большими зеркалами и комфортным покрытием</dd>
            </div>
            <div class="detail-item">
              <dt>Как попасть на урок</dt>
              <dd>По предварительной записи в Telegram (подскажем точный вход и этаж)</dd>
            </div>
          </dl>
        </div>

        <footer class="location-actions">
          <a
            href="https://yandex.ru/maps/?text=%D0%9A%D1%80%D0%B0%D1%81%D0%BD%D0%BE%D0%B4%D0%B0%D1%80%2C%20%D1%83%D0%BB%D0%B8%D1%86%D0%B0%20%D0%92%D0%BE%D0%BB%D0%BE%D0%B4%D0%B8%20%D0%93%D0%BE%D0%BB%D0%BE%D0%B2%D0%B0%D1%82%D0%BE%D0%B3%D0%BE%2C%20274"
            target="_blank"
            rel="noopener noreferrer"
            class="map-btn map-btn--yandex"
            @click="trackGoal('click_map', { service: 'yandex' })"
          >
            <svg class="map-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Открыть в Яндекс Картах
          </a>

          <a
            href="https://2gis.ru/krasnodar/search/%D0%92%D0%BE%D0%BB%D0%BE%D0%B4%D0%B8%20%D0%93%D0%BE%D0%BB%D0%BE%D0%B2%D0%B0%D1%82%D0%BE%D0%B3%D0%BE%20274"
            target="_blank"
            rel="noopener noreferrer"
            class="map-btn map-btn--2gis"
            @click="trackGoal('click_map', { service: '2gis' })"
          >
            <svg class="map-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
              <line x1="9" y1="3" x2="9" y2="18" />
              <line x1="15" y1="6" x2="15" y2="21" />
            </svg>
            Построить маршрут в 2ГИС
          </a>

          <StringWaveButton
            class="location-tg-btn"
            goal="tg_location"
            :href="'https://t.me/jsmjm?text=' + encodeURIComponent('Здравствуйте! Подскажите, пожалуйста, расписание групп на Володи Головатого, 274.')"
            target="_blank"
          >
            Записаться в Telegram
          </StringWaveButton>
        </footer>
      </article>
    </div>
  </section>
</template>

<script setup>
import { useAnalytics } from '../composables/useAnalytics';

const { trackGoal } = useAnalytics();
</script>

<style scoped>
.location-section {
  z-index: 2;
}

.location-card {
  position: relative;
  overflow: clip;
  border-radius: 28px;
  padding: 40px 36px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: linear-gradient(135deg, rgba(16, 12, 22, 0.85) 0%, rgba(8, 8, 12, 0.9) 100%);
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 36px;
  align-items: center;
}

.location-glow {
  position: absolute;
  inset-block-start: -30%;
  inset-inline-end: -10%;
  inline-size: 420px;
  block-size: 420px;
  background: radial-gradient(circle, rgba(176, 38, 255, 0.22) 0%, rgba(255, 16, 83, 0.1) 45%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}

.location-main {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.location-badge-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.location-district,
.location-landmark {
  font-family: 'Tektur', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 6px 13px;
  border-radius: 999px;
}

.location-district {
  color: #fff;
  background: rgba(255, 16, 83, 0.2);
  border: 1px solid rgba(255, 16, 83, 0.5);
}

.location-landmark {
  color: var(--neon-green);
  background: rgba(0, 255, 115, 0.08);
  border: 1px solid rgba(0, 255, 115, 0.28);
}

.location-address {
  font-family: 'Unbounded', sans-serif;
  font-size: clamp(1.3rem, 2.5vw, 1.85rem);
  font-weight: 800;
  line-height: 1.3;
  color: #fff;
}

.location-desc {
  font-family: 'Manrope', sans-serif;
  font-size: 1rem;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.8);
}

.location-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  padding-block-start: 14px;
  border-block-start: 1px solid rgba(255, 255, 255, 0.08);
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.detail-item dt {
  font-family: 'Unbounded', sans-serif;
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: rgba(255, 255, 255, 0.55);
}

.detail-item dd {
  font-family: 'Manrope', sans-serif;
  font-size: 0.94rem;
  line-height: 1.45;
  color: rgba(255, 255, 255, 0.9);
}

.location-actions {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.map-btn {
  display: inline-flex;
  align-items: safe center;
  justify-content: center;
  gap: 10px;
  padding: 15px 22px;
  border-radius: 14px;
  font-family: 'Manrope', sans-serif;
  font-size: 0.96rem;
  font-weight: 700;
  text-decoration: none;
  color: #fff;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.16);
  transition: background 0.25s ease, border-color 0.25s ease, transform 0.2s ease, box-shadow 0.25s ease;
}

.map-btn:hover {
  transform: translateY(-2px);
}

.map-btn--yandex:hover {
  background: rgba(255, 16, 83, 0.16);
  border-color: var(--neon-red);
  box-shadow: 0 0 20px rgba(255, 16, 83, 0.25);
}

.map-btn--2gis:hover {
  background: rgba(0, 255, 115, 0.12);
  border-color: var(--neon-green);
  box-shadow: 0 0 20px rgba(0, 255, 115, 0.22);
}

.map-icon {
  inline-size: 18px;
  block-size: 18px;
  flex-shrink: 0;
  display: block;
}

.location-tg-btn {
  inline-size: 100%;
  margin-block-start: 4px;
  padding: 15px 22px !important;
  font-size: 0.88rem !important;
}

@media (max-width: 960px) {
  .location-card {
    grid-template-columns: 1fr;
    padding: 28px 22px;
    gap: 26px;
  }
}

@media (max-width: 480px) {
  .location-card {
    padding: 22px 16px;
    border-radius: 20px;
  }
}
</style>
