<template>
  <div class="og-wrapper">
    <BackgroundDots />
    <h1 class="og-text">VEYRAUCH</h1>
  </div>
</template>

<script setup>
import BackgroundDots from '~/components/BackgroundDots.vue';

useHead({
  title: 'OG Image Generator - Veyrauch',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})
</script>

<style scoped>
.og-wrapper {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-color, #0f0f0f);
  overflow: hidden;
}

.og-text {
  font-family: 'Unbounded', sans-serif;
  font-size: 15rem; /* Очень крупно для OG Image (обычно 1200x630) */
  font-weight: 900;
  letter-spacing: 10px;
  color: #fff; /* Или можно сделать неоновым */
  text-transform: uppercase;
  z-index: 10;
  text-shadow: 0 0 50px rgba(255, 16, 83, 0.5); /* Неоновое свечение */
}

/* Адаптив, если будут открывать с телефона, хотя лучше открывать с ПК */
@media (max-width: 1024px) {
  .og-text {
    font-size: 8rem;
  }
}
@media (max-width: 768px) {
  .og-text {
    font-size: 4rem;
  }
}
</style>
