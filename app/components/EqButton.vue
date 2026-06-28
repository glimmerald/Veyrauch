<template>
  <button class="eq-btn">
    <span class="btn-text"><slot /></span>
  </button>
</template>

<style scoped>
.eq-btn {
  position: relative;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--text-color);
  padding: 15px 40px;
  font-family: 'Outfit', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 20px;
  transition: background 0.3s ease, border-color 0.3s ease;
  overflow: hidden;
}

.btn-text {
  position: relative;
  z-index: 2;
  padding-left: 2px; /* Compensate for letter-spacing to center text */
}

/* Искажение света вокруг кнопки (псевдо-свечение) */
.eq-btn::before {
  content: '';
  position: absolute;
  top: -2px; left: -2px; right: -2px; bottom: -2px;
  background: linear-gradient(90deg, var(--neon-red), var(--neon-purple), var(--neon-green), var(--neon-red));
  background-size: 300% 100%;
  z-index: -1;
  opacity: 0;
  filter: blur(10px);
  transition: opacity 0.3s ease;
  animation: bg-shift 3s linear infinite;
}

.eq-btn:hover {
  border-color: transparent;
  background: rgba(255,255,255,0.05);
}

.eq-btn:hover::before {
  opacity: 1;
}

@keyframes bg-shift {
  0% { background-position: 0% 0; }
  100% { background-position: 150% 0; }
}
</style>
