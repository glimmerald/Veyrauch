<template>
  <Transition name="slide-up">
    <div v-if="isVisible" class="cookie-banner">
      <div class="cookie-content">
        <p class="cookie-text">
          Мы используем файлы cookie для корректной работы сайта, включая запоминание ваших настроек (например, статуса анимации), а также для аналитики. Продолжая использовать сайт, вы соглашаетесь с их использованием.
        </p>
        <div class="cookie-actions">
          <button class="accept-btn" @click="acceptCookies">OK</button>
        </div>
      </div>
      <button class="close-btn" @click="acceptCookies" aria-label="Закрыть">
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isVisible = ref(false)

onMounted(() => {
  // Проверяем, было ли уже дано согласие
  const consent = localStorage.getItem('cookieConsent')
  if (!consent) {
    // Небольшая задержка перед показом, чтобы не перекрывать стартовую анимацию
    setTimeout(() => {
      isVisible.value = true
    }, 2000)
  }
})

function acceptCookies() {
  isVisible.value = false
  localStorage.setItem('cookieConsent', 'true')
}
</script>

<style scoped>
.cookie-banner {
  position: fixed;
  bottom: 24px;
  right: 24px;
  max-width: 400px;
  background: rgba(10, 10, 10, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 42, 95, 0.1);
  z-index: 1000;
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.cookie-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cookie-text {
  color: rgba(255, 255, 255, 0.8);
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  line-height: 1.5;
  margin: 0;
}

.cookie-actions {
  display: flex;
  justify-content: flex-start;
}

.accept-btn {
  background: transparent;
  color: #fff;
  border: 1px solid rgba(255, 42, 95, 0.5);
  padding: 6px 20px;
  border-radius: 6px;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.accept-btn:hover {
  background: rgba(255, 42, 95, 0.1);
  border-color: #ff2a5f;
  box-shadow: 0 0 10px rgba(255, 42, 95, 0.2);
}

.close-btn {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
}

.close-btn:hover {
  color: #fff;
}

/* Анимация появления */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

@media (max-width: 600px) {
  .cookie-banner {
    bottom: 16px;
    left: 16px;
    right: 16px;
    max-width: none;
  }
}
</style>
