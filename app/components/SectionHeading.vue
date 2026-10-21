<template>
  <div class="section-header">
    <h2 class="section-title neon-heading-glow">
      <slot></slot>
    </h2>
  </div>
</template>

<style scoped>
.section-header {
  max-width: var(--container-max-width, 1200px);
  margin: 0 auto;
  width: 100%;
  padding-left: var(--container-padding-x);
  padding-right: var(--container-padding-x);
  box-sizing: border-box;
}

.section-title {
  font-size: var(--text-h2);
  font-weight: 800;
  text-transform: uppercase;
  color: var(--text-color, #fff);
  margin-bottom: 40px;
  text-align: left;
  letter-spacing: 2px;
  line-height: 1.25;
  overflow-wrap: break-word;
  word-break: break-word;
}

@media (max-width: 768px) {
  .section-title {
    margin-bottom: 28px;
    letter-spacing: 1px;
    line-height: 1.28;
  }
}

@media (max-width: 480px) {
  .section-title {
    letter-spacing: 0.5px;
    margin-bottom: 22px;
  }
}
</style>
