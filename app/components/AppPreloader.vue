<template>
  <div class="preloader" ref="preloaderEl" @click="skipPreloader" aria-hidden="true">
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

    <span class="skip-hint">Нажми, чтобы пропустить</span>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useStringWave } from '../composables/useStringWave';
import gsap from 'gsap';

const emit = defineEmits(['complete']);
const preloaderEl = ref(null);

const { paths, basePoints, amplitude, colors } = useStringWave({ closed: true, maxAmp: 36, continuous: true });

const frame = { top: 0, bottom: 0, left: 0, right: 0 };
let tickerFunc = null;
let tl = null;
let finished = false;

function finish() {
  if (finished) return;
  finished = true;
  if (tl) tl.kill();
  emit('complete');
}

function skipPreloader() {
  finish();
}

function updatePoints() {
  const w = frame.right - frame.left;
  const h = frame.bottom - frame.top;
  const W = Math.max(w, 1);
  const H = Math.max(h, 1);
  const numX = 30;
  const numY = 20;

  const pts = [];
  for (let i = 0; i < numX; i++) pts.push({ x: frame.left + (i / numX) * W, y: frame.top, nx: 0, ny: -1, l: i / numX });
  for (let i = 0; i < numY; i++) pts.push({ x: frame.right, y: frame.top + (i / numY) * H, nx: 1, ny: 0, l: i / numY });
  for (let i = 0; i < numX; i++) pts.push({ x: frame.right - (i / numX) * W, y: frame.bottom, nx: 0, ny: 1, l: i / numX });
  for (let i = 0; i < numY; i++) pts.push({ x: frame.left, y: frame.bottom - (i / numY) * H, nx: -1, ny: 0, l: i / numY });
  basePoints.value = pts;
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    finish();
    return;
  }

  const winW = window.innerWidth;
  const winH = window.innerHeight;

  frame.top = winH / 2;
  frame.bottom = winH / 2;
  frame.left = 0;
  frame.right = winW;

  updatePoints();
  tickerFunc = () => updatePoints();
  gsap.ticker.add(tickerFunc);

  tl = gsap.timeline({
    onComplete: () => {
      finish();
    }
  });

  const isMobile = winW < 768;

  gsap.set('.glitch-letter', {
    scaleY: 12,
    opacity: 0,
    filter: isMobile ? 'none' : 'blur(8px)',
    color: 'var(--neon-green)'
  });

  // Динамичное интро ~1.8 секунды (вместо ~7.2с) — сохраняет все эффекты без потери LCP/отказов
  tl.to(amplitude, { value: 1.35, duration: 0.28, ease: 'back.out(2)' });

  tl.to(
    '.glitch-letter',
    {
      scaleY: 1,
      opacity: 1,
      filter: isMobile ? 'none' : 'blur(0px)',
      color: 'var(--text-color)',
      duration: 0.35,
      stagger: 0.025,
      ease: 'power4.out',
      onStart: function () {
        gsap.fromTo(
          '.glitch-letter',
          { textShadow: '-8px 0 red, 8px 0 var(--neon-green)', x: -6 },
          { textShadow: '0px 0 rgba(255,16,83,0.5)', x: 0, duration: 0.28, ease: 'elastic.out(1, 0.25)' }
        );
      }
    },
    '-=0.15'
  );

  tl.to(
    frame,
    {
      top: 20,
      bottom: winH - 20,
      left: 20,
      right: winW - 20,
      duration: 0.55,
      ease: 'power3.inOut'
    },
    '-=0.05'
  );
  tl.to(amplitude, { value: 0.85, duration: 0.55, ease: 'power2.inOut' }, '<');

  tl.to(
    '.text-container',
    {
      scale: 16,
      opacity: 0,
      filter: isMobile ? 'none' : 'blur(14px)',
      duration: 0.45,
      ease: 'power4.in'
    },
    '+=0.05'
  );
  tl.to(amplitude, { value: 0.05, duration: 0.4, ease: 'power2.out' }, '<');

  tl.to(
    '.preloader',
    {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out'
    },
    '-=0.2'
  );
});

onBeforeUnmount(() => {
  if (tickerFunc) gsap.ticker.remove(tickerFunc);
  if (tl) tl.kill();
});
</script>

<style scoped>
.preloader {
  position: fixed;
  inset: 0;
  inline-size: 100%;
  block-size: 100dvh;
  background-color: var(--bg-color);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: clip;
  cursor: pointer;
}

.preloader-svg {
  position: absolute;
  inset: 0;
  inline-size: 100%;
  block-size: 100%;
  pointer-events: none;
  z-index: 1;
}

path {
  filter: drop-shadow(0 0 8px currentColor);
  stroke-linecap: round;
  stroke-linejoin: round;
}

@media (max-width: 768px) {
  path {
    filter: none;
  }
}

.text-container {
  position: relative;
  z-index: 2;
  display: flex;
  gap: clamp(5px, 1.5vw, 15px);
  font-size: clamp(2rem, 10vw, 6rem);
  font-weight: 800;
  letter-spacing: clamp(2px, 1vw, 5px);
  color: var(--text-color);
  transform-origin: center center;
}

.glitch-letter {
  display: inline-block;
  transform-origin: center center;
  text-shadow: 0 0 20px rgba(255, 16, 83, 0.5);
}

.skip-hint {
  position: absolute;
  inset-block-end: 28px;
  font-family: 'Manrope', sans-serif;
  font-size: 0.78rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.35);
  z-index: 3;
  pointer-events: none;
}
</style>
