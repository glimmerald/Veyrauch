<template>
  <div>
    <!-- Прелоадер GSAP Timeline -->
    <AppPreloader v-if="!preloaderFinished" @complete="onPreloaderComplete" />

    <!-- Глобальные точки поверх всего сайта -->
    <div class="global-dots"></div>

    <!-- Основной контент страницы -->
    <div class="hero-wrapper" :class="{ 'hero-visible': preloaderFinished }">
      <AppHeader />



      <main class="content">
        <h1 class="title">
          <span class="neon-text">K-POP</span> COVER DANCE
        </h1>
        <p class="subtitle">Почувствуй ритм. Овладей телом. Танцуй как айдол.</p>
        
        <div class="buttons-row">
          <EqButton>Искажение света</EqButton>
          <StringWaveButton>Волны струны</StringWaveButton>
        </div>
      </main>
    </div>

    <VideoGallery />
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Используем куки, чтобы сервер знал о статусе прелоадера до рендера HTML.
// Это полностью убирает "моргания" и лишние анимации.
// const preloaderCookie = useCookie('preloader_shown', { maxAge: 20 * 60, path: '/' });

// Если кука есть, прелоадер УЖЕ завершен (даже на сервере)
// const preloaderFinished = ref(!!preloaderCookie.value);
const preloaderFinished = ref(false);

// Сразу ставим куку, если её нет, чтобы даже при обновлении страницы 
// во время самой анимации она больше не показывалась.
// if (!preloaderCookie.value) {
//   preloaderCookie.value = '1';
// }

function onPreloaderComplete() {
  preloaderFinished.value = true;
}
</script>

<style scoped>
/* Начальное состояние контента: скрыт и размыт */
.hero-wrapper {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  opacity: 0;
  filter: blur(20px);
  transition: opacity 1.5s ease-out, filter 1.5s ease-out;
}

/* Проявление из жидкости */
.hero-wrapper.hero-visible {
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
  font-size: 6rem;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -2px;
  color: var(--text-color);
  text-transform: uppercase;
}

.neon-text {
  color: transparent;
  -webkit-text-stroke: 2px var(--neon-red);
  text-shadow: 0 0 20px rgba(255, 16, 83, 0.4);
}

.subtitle {
  font-size: 1.2rem;
  font-weight: 300;
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
  margin-top: 20px;
}

/* Глобальные точки, которые накрывают весь сайт, чтобы гарантировать 100% идентичность */
.global-dots {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
  pointer-events: none;
  z-index: 0;
}
</style>
