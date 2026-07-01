<template>
  <div 
    class="faq-accordion" 
    ref="container"
    @mouseenter="onEnter" 
    @mouseleave="onLeave"
    @click="toggle"
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
    <div class="faq-content">
      <div class="faq-header">
        <h3 class="faq-question">{{ question }}</h3>
        <div class="faq-icon" :class="{ 'is-open': isOpen }">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </div>
      </div>
      <div class="faq-answer-wrapper" :class="{ 'is-open': isOpen }">
        <div class="faq-answer-inner">
          <p class="faq-answer">{{ answer }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useStringWave } from '../composables/useStringWave';

const props = defineProps({
  question: String,
  answer: String
});

const container = ref(null);
const width = ref(0);
const height = ref(0);
const isOpen = ref(false);

const { paths, basePoints, amplitude, colors } = useStringWave({ closed: true, maxAmp: 12 });

let isHovered = false;
let velocity = 0;
let rafId = null;
let targetAmplitude = 0;

const onEnter = () => { 
  isHovered = true; 
  targetAmplitude = 0.4;
};
const onLeave = () => { 
  isHovered = false; 
  targetAmplitude = 0; 
};

const toggle = () => {
  isOpen.value = !isOpen.value;
  velocity += 2.0; 
};

function initPoints() {
  if (!container.value) return;
  const rect = container.value.getBoundingClientRect();
  width.value = rect.width;
  height.value = rect.height;
  
  const step = 4;
  const numX = Math.floor(width.value / step) || 1; 
  const numY = Math.floor(height.value / step) || 1;
  
  const pts = [];
  for(let i=0; i<numX; i++) pts.push({ x: (i/numX)*width.value, y: 0, nx: 0, ny: -1, l: i/numX });
  for(let i=0; i<numY; i++) pts.push({ x: width.value, y: (i/numY)*height.value, nx: 1, ny: 0, l: i/numY });
  for(let i=0; i<numX; i++) pts.push({ x: width.value - (i/numX)*width.value, y: height.value, nx: 0, ny: 1, l: i/numX });
  for(let i=0; i<numY; i++) pts.push({ x: 0, y: height.value - (i/numY)*height.value, nx: -1, ny: 0, l: i/numY });
  
  basePoints.value = pts;
}

function updatePhysics() {
  const stiffness = 0.1;
  const damping = 0.15;
  const force = (targetAmplitude - amplitude.value) * stiffness - velocity * damping;
  velocity += force;
  amplitude.value += velocity;
  
  rafId = requestAnimationFrame(updatePhysics);
}

let resizeObserver = null;

onMounted(() => {
  initPoints();
  if (container.value) {
    resizeObserver = new ResizeObserver(() => {
      initPoints();
    });
    resizeObserver.observe(container.value);
  }
  window.addEventListener('resize', initPoints);
  rafId = requestAnimationFrame(updatePhysics);
});

onBeforeUnmount(() => {
  if (resizeObserver && container.value) {
    resizeObserver.unobserve(container.value);
    resizeObserver.disconnect();
  }
  window.removeEventListener('resize', initPoints);
  if (rafId) cancelAnimationFrame(rafId);
});
</script>

<style scoped>
.faq-accordion {
  position: relative;
  background: rgba(10, 10, 10, 0.5);
  color: var(--text-color);
  padding: 0;
  cursor: pointer;
  transition: background 0.3s ease;
  overflow: visible; 
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.2); 
  margin-bottom: 20px;
}

.faq-accordion:hover {
  background: rgba(20, 20, 20, 0.8);
  box-shadow: inset 0 0 0 1px transparent; 
}

.faq-content {
  position: relative;
  z-index: 2;
  padding: 20px 30px;
}

.faq-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.faq-question {
  margin: 0;
  font-family: 'Unbounded', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  padding-right: 20px;
}

.faq-icon {
  transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  display: flex;
  align-items: center;
  justify-content: center;
}
.faq-icon.is-open {
  transform: rotate(180deg);
}

.faq-answer-wrapper {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}
.faq-answer-wrapper.is-open {
  grid-template-rows: 1fr;
}

.faq-answer-inner {
  overflow: hidden;
}

.faq-answer {
  margin: 0;
  padding-top: 15px;
  font-family: 'Manrope', sans-serif;
  font-size: 1rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.8);
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

@media (max-width: 768px) {
  .faq-content {
    padding: 15px 20px;
  }
  .faq-question {
    font-size: 1rem;
    padding-right: 15px;
  }
}

@media (max-width: 480px) {
  .faq-content {
    padding: 12px 15px;
  }
  .faq-question {
    font-size: 0.9rem;
  }
  .faq-answer {
    font-size: 0.9rem;
    padding-top: 10px;
  }
}
</style>
