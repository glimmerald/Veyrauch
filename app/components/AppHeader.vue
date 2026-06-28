<template>
  <header class="app-header">
    <div class="logo">VEYRAUCH</div>
    <StringWaveButton class="book-btn">Записаться</StringWaveButton>
  </header>
</template>

<script setup>
import StringWaveButton from './StringWaveButton.vue';
</script>

<style scoped>
.app-header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 30px 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 50;
}

.logo {
  font-family: 'Outfit', sans-serif;
  font-size: 1.8rem;
  font-weight: 800;
  letter-spacing: 6px;
  color: var(--text-color);
  text-transform: uppercase;
  /* Легкое свечение, как отголосок нашей струны */
  text-shadow: 0 0 15px rgba(255, 16, 83, 0.4);
  cursor: pointer;
}

/* При желании можно немного уменьшить кнопку для хедера */
.book-btn {
  font-size: 0.9rem;
  padding: 12px 30px;
}
</style>
