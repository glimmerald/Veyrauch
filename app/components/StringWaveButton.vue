<template>
  <component 
    :is="href ? 'a' : 'button'"
    :href="href"
    :target="target"
    class="string-wave-btn" 
    ref="btn"
    @mouseenter="onEnter" 
    @mouseleave="onLeave"
  >
    <svg class="wave-svg" v-if="width > 0">
      <path 
        v-for="(path, index) in paths" 
        :key="index"
        :d="path" 
        :stroke="colors[index]" 
        stroke-width="2" 
        fill="none" 
        style="mix-blend-mode: screen;"
      />
    </svg>
    <span class="btn-text"><slot /></span>
  </component>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  href: { type: String, default: null },
  target: { type: String, default: null }
});
import { useStringWave } from '../composables/useStringWave';

const btn = ref(null);
const width = ref(0);
const height = ref(0);

const { paths, basePoints, amplitude, colors } = useStringWave({ closed: true, maxAmp: 12 });

let isHovered = false;
let velocity = 0;
let rafId = null;

const onEnter = () => { isHovered = true; };
const onLeave = () => { isHovered = false; };

function initPoints() {
  if (!btn.value) return;
  const rect = btn.value.getBoundingClientRect();
  width.value = rect.width;
  height.value = rect.height;
  
  const numX = Math.floor(width.value / 1.5); 
  const numY = Math.floor(height.value / 1.5);
  
  const pts = [];
  for(let i=0; i<numX; i++) pts.push({ x: (i/numX)*width.value, y: 0, nx: 0, ny: -1, l: i/numX });
  for(let i=0; i<numY; i++) pts.push({ x: width.value, y: (i/numY)*height.value, nx: 1, ny: 0, l: i/numY });
  for(let i=0; i<numX; i++) pts.push({ x: width.value - (i/numX)*width.value, y: height.value, nx: 0, ny: 1, l: i/numX });
  for(let i=0; i<numY; i++) pts.push({ x: 0, y: height.value - (i/numY)*height.value, nx: -1, ny: 0, l: i/numY });
  
  basePoints.value = pts;
}

function updatePhysics() {
  const target = isHovered ? 1 : 0;
  const stiffness = 0.1;
  const damping = 0.2;
  const force = (target - amplitude.value) * stiffness - velocity * damping;
  velocity += force;
  amplitude.value += velocity;
  
  rafId = requestAnimationFrame(updatePhysics);
}

let resizeObserver = null;

onMounted(() => {
  initPoints();
  if (btn.value) {
    resizeObserver = new ResizeObserver(() => {
      initPoints();
    });
    resizeObserver.observe(btn.value);
  }
  window.addEventListener('resize', initPoints);
  rafId = requestAnimationFrame(updatePhysics);
});

onBeforeUnmount(() => {
  if (resizeObserver && btn.value) {
    resizeObserver.unobserve(btn.value);
    resizeObserver.disconnect();
  }
  window.removeEventListener('resize', initPoints);
  if (rafId) cancelAnimationFrame(rafId);
});
</script>

<style scoped>
.string-wave-btn {
  position: relative;
  background: rgba(10, 10, 10, 0.5);
  border: none;
  color: var(--text-color);
  padding: 15px 40px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: inherit;
  font-size: 1.05rem;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.3s ease, box-shadow 0.3s ease, transform 0.1s ease;
  overflow: visible; 
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.2); 
  max-width: 100%;
  box-sizing: border-box;
}

@media (max-width: 768px) {
  .string-wave-btn {
    padding: 14px 26px;
    font-size: 0.95rem;
    letter-spacing: 1.5px;
  }
}

@media (max-width: 480px) {
  .string-wave-btn {
    padding: 12px 18px;
    font-size: 0.84rem;
    letter-spacing: 0.8px;
    max-width: 100%;
  }
}

.string-wave-btn::before {
  content: '';
  position: absolute;
  top: -2px; left: -2px; right: -2px; bottom: -2px;
  background: linear-gradient(90deg, var(--neon-red), var(--neon-purple), var(--neon-green), var(--neon-red));
  background-size: 300% 100%;
  z-index: 0;
  opacity: 0;
  filter: blur(8px);
  transition: opacity 0.3s ease;
  animation: bg-shift 3s linear infinite;
  pointer-events: none;
}

.string-wave-btn:hover {
  background: rgba(20, 20, 20, 0.8);
  box-shadow: inset 0 0 0 1px transparent; 
}

.string-wave-btn:active {
  transform: scale(0.96);
}

.string-wave-btn:active::before {
  opacity: 1;
  transition: opacity 0.05s ease;
}

.btn-text {
  position: relative;
  z-index: 2; 
  padding-left: 2px; /* Compensate for letter-spacing to center text */
}

.wave-svg {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  overflow: visible;
  pointer-events: none;
  z-index: 1;
}

path {
  filter: drop-shadow(0 0 4px currentColor);
  stroke-linecap: round;
  stroke-linejoin: round;
}

@keyframes bg-shift {
  0% { background-position: 0% 0; }
  100% { background-position: 150% 0; }
}
</style>
