<template>
  <canvas ref="canvasRef" class="background-dots"></canvas>
</template>

<script setup>
import { ref } from 'vue';
import { useDotGrid } from '../composables/useDotGrid';

const canvasRef = ref(null);

useDotGrid(canvasRef);
</script>

<style scoped>
.background-dots {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 0;
  background-image: radial-gradient(circle, rgba(255, 255, 255, 0.2) 1px, transparent 1px);
  background-size: 20px 20px;
  background-position: 0 0;
}
</style>
