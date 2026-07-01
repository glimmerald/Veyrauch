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
  font-size: var(--text-h2);
  font-weight: 800;
  text-transform: uppercase;
  color: var(--text-color, #fff);
  margin-bottom: 40px;
  text-align: left;
  letter-spacing: 2px;
  overflow-wrap: break-word;
  word-break: break-word;
}

@media (max-width: 480px) {
  .section-title {
    letter-spacing: 0;
    margin-bottom: 25px;
  }
}
</style>
