<template>
  <header class="app-header" :class="{ 'is-scrolled': isScrolled }">
    <div class="logo">VEYRAUCH</div>
    <div class="header-actions">
      <a href="tel:+79058583082" class="header-phone" aria-label="Позвонить: +7 905 858-30-82">
        <svg class="phone-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
        <span class="phone-text">+7 905 858-30-82</span>
      </a>
      <StringWaveButton class="book-btn" :href="'https://t.me/jsmjm?text=' + encodeURIComponent('Здравствуйте! Хочу записаться на пробное занятие.')" target="_blank">Записаться</StringWaveButton>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import StringWaveButton from './StringWaveButton.vue';

const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  padding-top: 40px;
  padding-bottom: 40px;
  padding-left: var(--container-padding-x);
  padding-right: var(--container-padding-x);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 50;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.4) 60%, rgba(0, 0, 0, 0) 100%);
  transition: padding-top 0.6s cubic-bezier(0.25, 1, 0.5, 1), padding-bottom 0.6s cubic-bezier(0.25, 1, 0.5, 1), background 0.6s cubic-bezier(0.25, 1, 0.5, 1), opacity 1.5s ease-out, filter 1.5s ease-out, transform 1.5s ease-out;
}

.app-header.is-scrolled {
  padding-top: 15px;
  padding-bottom: 15px;
}

.logo {
  font-family: 'Unbounded', sans-serif;
  font-size: 1.8rem;
  font-weight: 900;
  letter-spacing: 2px;
  color: var(--text-color);
  text-transform: uppercase;
  text-shadow: 0 0 15px rgba(255, 16, 83, 0.4);
  cursor: pointer;
  transition: font-size 0.6s cubic-bezier(0.25, 1, 0.5, 1);
  white-space: nowrap;
  flex-shrink: 0;
}

.app-header.is-scrolled .logo {
  font-size: 1.4rem;
}

/* При желании можно немного уменьшить кнопку для хедера */
.app-header .book-btn {
  font-size: 0.88rem !important;
  padding: 10px 24px !important;
  flex-shrink: 0 !important;
  white-space: nowrap !important;
  width: auto !important;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 25px;
  flex-shrink: 0;
}

.header-phone {
  color: var(--text-color);
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: color 0.3s ease, text-shadow 0.3s ease, background 0.3s ease, border-color 0.3s ease;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.phone-icon {
  display: none;
}

.header-phone:hover {
  color: #ff1053;
  text-shadow: 0 0 10px rgba(255, 16, 83, 0.4);
}

@media (max-width: 1024px) {
  .app-header {
    padding-top: 26px;
    padding-bottom: 26px;
  }
  .header-actions {
    gap: 18px;
  }
}

@media (max-width: 768px) {
  .app-header {
    padding-top: 16px;
    padding-bottom: 16px;
  }
  .logo {
    font-size: 1.3rem;
    letter-spacing: 1px;
  }
  .app-header.is-scrolled .logo {
    font-size: 1.15rem;
  }
  .header-actions {
    gap: 12px;
  }
  .header-phone {
    font-size: 0.9rem;
  }
  .app-header .book-btn {
    font-size: 0.78rem !important;
    padding: 8px 16px !important;
  }
}

@media (max-width: 640px) {
  .phone-text {
    display: none;
  }
  .phone-icon {
    display: block;
    width: 16px;
    height: 16px;
  }
  .header-phone {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.15);
    justify-content: center;
    padding: 0;
  }
  .header-phone:hover,
  .header-phone:active {
    background: rgba(255, 16, 83, 0.2);
    border-color: var(--neon-red);
    color: #fff;
  }
}

@media (max-width: 480px) {
  .app-header {
    padding-top: 12px;
    padding-bottom: 12px;
  }
  .logo {
    font-size: 1.05rem;
    letter-spacing: 0.3px;
  }
  .app-header.is-scrolled .logo {
    font-size: 0.95rem;
  }
  .header-actions {
    gap: 8px;
    flex-direction: row;
    align-items: center;
  }
  .header-phone {
    width: 34px;
    height: 34px;
    border-radius: 6px;
  }
  .phone-icon {
    width: 15px;
    height: 15px;
  }
  .app-header .book-btn {
    font-size: 0.72rem !important;
    padding: 7px 11px !important;
    letter-spacing: 0.4px !important;
  }
}
</style>
