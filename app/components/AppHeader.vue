<template>
  <header class="app-header" :class="{ 'is-scrolled': isScrolled }">
    <div class="logo">VEYRAUCH</div>
    <StringWaveButton class="book-btn">Записаться</StringWaveButton>
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
  padding: 40px 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 50;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.4) 60%, rgba(0, 0, 0, 0) 100%);
  transition: padding 0.3s ease, background 0.3s ease, opacity 1.5s ease-out, filter 1.5s ease-out;
}

.app-header.is-scrolled {
  padding: 15px 50px;
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
  transition: font-size 0.3s ease;
}

.app-header.is-scrolled .logo {
  font-size: 1.4rem;
}

/* При желании можно немного уменьшить кнопку для хедера */
.book-btn {
  font-size: 0.9rem;
  padding: 12px 30px;
}
</style>
