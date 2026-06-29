<template>
  <div class="section-header">
    <h2 class="section-title neon-heading-glow">
      <slot></slot>
    </h2>
  </div>
</template>

<style scoped>
.section-header {
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  padding: 0 20px;
}

.section-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  text-transform: uppercase;
  color: var(--text-color, #fff);
  margin-bottom: 40px;
  text-align: left;
  letter-spacing: 2px;
}
</style>
