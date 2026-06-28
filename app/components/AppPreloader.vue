<template>
  <div class="preloader" ref="preloaderEl">
    <!-- SVG для струн -->
    <svg class="preloader-svg">
      <path 
        v-for="(path, index) in paths" 
        :key="index"
        :d="path" 
        :stroke="colors[index]" 
        stroke-width="3" 
        fill="none" 
        style="mix-blend-mode: screen;"
      />
    </svg>
    
    <div class="text-container">
      <span 
        v-for="(letter, idx) in 'VEYRAUCH'.split('')" 
        :key="idx"
        class="glitch-letter"
      >
        {{ letter }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useStringWave } from '../composables/useStringWave';
import gsap from 'gsap';

const emit = defineEmits(['complete']);
const preloaderEl = ref(null);

const { paths, basePoints, amplitude, colors } = useStringWave({ closed: true, maxAmp: 40 });

const frame = { top: 0, bottom: 0, left: 0, right: 0 };
let tickerFunc = null;

function updatePoints() {
  const w = frame.right - frame.left;
  const h = frame.bottom - frame.top;
  const W = Math.max(w, 1);
  const H = Math.max(h, 1);
  const numX = 30; const numY = 20;
  
  const pts = [];
  for(let i=0; i<numX; i++) pts.push({ x: frame.left + (i/numX)*W, y: frame.top, nx: 0, ny: -1, l: i/numX });
  for(let i=0; i<numY; i++) pts.push({ x: frame.right, y: frame.top + (i/numY)*H, nx: 1, ny: 0, l: i/numY });
  for(let i=0; i<numX; i++) pts.push({ x: frame.right - (i/numX)*W, y: frame.bottom, nx: 0, ny: 1, l: i/numX });
  for(let i=0; i<numY; i++) pts.push({ x: frame.left, y: frame.bottom - (i/numY)*H, nx: -1, ny: 0, l: i/numY });
  basePoints.value = pts;
}

onMounted(() => {
  const winW = window.innerWidth;
  const winH = window.innerHeight;
  
  frame.top = winH / 2;
  frame.bottom = winH / 2;
  frame.left = 0;
  frame.right = winW;
  
  updatePoints();
  tickerFunc = () => updatePoints();
  gsap.ticker.add(tickerFunc);
  
  const tl = gsap.timeline({
    onComplete: () => {
      emit('complete');
    }
  });
  
  // Исходное состояние букв
  gsap.set('.glitch-letter', { scaleY: 15, opacity: 0, filter: 'blur(10px)', color: 'var(--neon-green)' });
  
  // 1. Струна вибрирует
  tl.to(amplitude, { value: 0.2, duration: 1, ease: 'power2.inOut' });
  tl.to(amplitude, { value: 1.5, duration: 0.5, ease: 'back.out(2)' });
  
  // 2. Глитч букв (Концепт 1)
  tl.to('.glitch-letter', {
    scaleY: 1,
    opacity: 1,
    filter: 'blur(0px)',
    color: 'var(--text-color)',
    duration: 0.6,
    stagger: 0.05,
    ease: 'power4.out',
    onStart: function() {
      // Имитация хроматической аберрации
      gsap.fromTo('.glitch-letter', 
        { textShadow: '-10px 0 red, 10px 0 var(--neon-green)', x: -10 },
        { textShadow: '0px 0 rgba(255,16,83,0.5)', x: 0, duration: 0.5, ease: 'elastic.out(1, 0.2)' }
      );
    }
  }, "-=0.3");
  
  // 3. Струна успокаивается
  tl.to(amplitude, { value: 0.3, duration: 1, ease: 'power2.out' }, "-=0.5");
  
  // 4. Обвитие рамки
  tl.to(frame, {
    top: 20,
    bottom: winH - 20,
    left: 20,
    right: winW - 20,
    duration: 1.5,
    ease: 'power3.inOut'
  }, "+=0.5");
  tl.to(amplitude, { value: 1, duration: 1.5, ease: 'power2.inOut' }, "<");
  
  // 5. Улет букв на нас
  tl.to('.text-container', {
    scale: 20,
    opacity: 0,
    filter: 'blur(20px)',
    duration: 1.5,
    ease: 'power4.in'
  }, "+=0.2");
  tl.to(amplitude, { value: 0.1, duration: 1, ease: 'power2.out' }, "<");
  
  // 6. Открытие контента
  tl.to('.preloader', {
    opacity: 0,
    duration: 1,
    ease: 'power2.inOut'
  }, "+=0.2");
});

onBeforeUnmount(() => {
  if (tickerFunc) gsap.ticker.remove(tickerFunc);
});
</script>

<style scoped>
.preloader {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background-color: var(--bg-color);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.preloader-svg {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  pointer-events: none;
  z-index: 1;
}

path {
  filter: drop-shadow(0 0 8px currentColor);
  stroke-linecap: round;
  stroke-linejoin: round;
}

.text-container {
  position: relative;
  z-index: 2;
  display: flex;
  gap: 15px;
  font-size: 6rem;
  font-weight: 800;
  letter-spacing: 5px;
  color: var(--text-color);
  transform-origin: center center;
}

.glitch-letter {
  display: inline-block;
  transform-origin: center center;
  /* Финальное неоновое свечение для текста */
  text-shadow: 0 0 20px rgba(255, 16, 83, 0.5);
}
</style>
