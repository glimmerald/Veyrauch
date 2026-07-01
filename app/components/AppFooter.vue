<template>
  <footer class="app-footer">
    <div class="container footer-content">
      <p class="copyright">© {{ currentYear }} Veyrauch Cover Dance. Все права защищены.</p>
      <p class="disclaimer">
        Сайт носит исключительно информационный характер и ни при каких условиях не является публичной офертой, 
        определяемой положениями Статьи 437 (2) Гражданского кодекса РФ.
      </p>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.app-footer {
  width: 100%;
  padding: var(--spacing-xl) 0;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
  z-index: 10;
}

.footer-content {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  align-items: center;
}

.copyright {
  color: rgba(255, 255, 255, 0.6);
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  margin: 0;
  letter-spacing: 0.5px;
}

.disclaimer {
  color: rgba(255, 255, 255, 0.3);
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  margin: 0;
  max-width: 800px;
  line-height: 1.5;
}

@media (max-width: 480px) {
  .copyright {
    font-size: 0.8rem;
  }
  .disclaimer {
    font-size: 0.65rem;
    line-height: 1.4;
  }
}
</style>
