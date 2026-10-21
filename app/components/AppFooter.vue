<template>
  <footer class="app-footer">
    <div class="container footer-content">
      <div class="footer-contacts">
        <span class="location">
          <svg class="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          г. Краснодар
        </span>
        <span class="divider">•</span>
        <a href="tel:+79058583082" class="contact-link">
          <svg class="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          +7 905 858-30-82
        </a>
        <span class="divider">•</span>
        <a :href="telegramUrl" target="_blank" rel="noopener noreferrer" class="contact-link telegram">
          <svg class="contact-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
          </svg>
          Telegram: @jsmjm
        </a>
      </div>
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
const telegramUrl = computed(() => {
  const text = 'Здравствуйте! Хочу узнать у вас подробности о занятиях танцами?'
  return `https://t.me/jsmjm?text=${encodeURIComponent(text)}`
})
</script>

<style scoped>
.app-footer {
  width: 100%;
  padding: 2.5rem 1rem;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  position: relative;
  z-index: 10;
}

.footer-content {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  max-width: 900px;
  margin: 0 auto;
}

.footer-contacts {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.75rem 1.25rem;
  font-family: 'Manrope', sans-serif;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.85);
}

.location {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 500;
  color: #fff;
}

.contact-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color 0.2s ease, transform 0.2s ease;
}

.contact-link:hover {
  color: var(--neon-green, #00ff73);
  transform: translateY(-1px);
}

.contact-icon {
  width: 16px;
  height: 16px;
  opacity: 0.85;
}

.divider {
  color: rgba(255, 255, 255, 0.25);
  font-size: 0.8rem;
}

.copyright {
  color: rgba(255, 255, 255, 0.55);
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  margin: 0;
  letter-spacing: 0.3px;
}

.disclaimer {
  color: rgba(255, 255, 255, 0.3);
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  margin: 0;
  max-width: 800px;
  line-height: 1.5;
}

@media (max-width: 600px) {
  .footer-contacts {
    flex-direction: column;
    gap: 0.6rem;
  }
  .divider {
    display: none;
  }
  .copyright {
    font-size: 0.8rem;
  }
  .disclaimer {
    font-size: 0.68rem;
  }
}
</style>
