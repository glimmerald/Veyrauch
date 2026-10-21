<template>
  <header class="app-header" :class="{ 'is-scrolled': isScrolled }">
    <div class="logo">VEYRAUCH</div>
    <div class="header-actions">
      <a href="tel:+79058583082" class="header-phone">+7 905 858-30-82</a>
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
}

.app-header.is-scrolled .logo {
  font-size: 1.4rem;
}

/* При желании можно немного уменьшить кнопку для хедера */
.book-btn {
  font-size: 0.9rem;
  padding: 12px 30px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 30px;
}

.header-phone {
  color: var(--text-color);
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: color 0.3s ease, text-shadow 0.3s ease;
  white-space: nowrap;
}

.header-phone:hover {
  color: #ff1053;
  text-shadow: 0 0 10px rgba(255, 16, 83, 0.4);
}

@media (max-width: 1024px) {
  .app-header {
    padding-top: 30px;
    padding-bottom: 30px;
  }
  .header-actions {
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .app-header {
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .logo {
    font-size: 1.4rem;
  }
  .app-header.is-scrolled .logo {
    font-size: 1.2rem;
  }
  .header-actions {
    gap: 15px;
  }
  .header-phone {
    font-size: 0.9rem;
  }
  .book-btn {
    font-size: 0.8rem;
    padding: 10px 20px;
  }
}

@media (max-width: 480px) {
  .app-header {
    padding-top: 15px;
    padding-bottom: 15px;
  }
  .logo {
    font-size: 1.1rem;
    letter-spacing: 0px;
  }
  .app-header.is-scrolled .logo {
    font-size: 0.9rem;
  }
  .header-actions {
    gap: 10px;
    flex-direction: row;
    align-items: center;
  }
  .header-phone {
    font-size: 0.75rem;
    letter-spacing: -0.2px;
  }
  .book-btn {
    font-size: 0.75rem;
    padding: 6px 12px;
  }
}
</style>
