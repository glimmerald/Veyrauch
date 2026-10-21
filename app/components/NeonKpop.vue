<template>
  <span class="neon-kpop-wrap" aria-label="K-pop">
    <svg 
      viewBox="-40 -40 3866 866" 
      class="neon-kpop-svg" 
      aria-hidden="true" 
      focusable="false"
    >
      <path 
        d="M0.0 768.0H234.0L421.5384521484375 533.576904296875L552.0 768.0H844.0L583.7852783203125 330.7684326171875L834.0 18.0H564.0L256.0 425.9142150878906V18.0H0.0ZM820.0 321.0V519.0H1102.0V321.0ZM1650.0 18.0H1213.0V768.0H1471.0V564.0H1650.0Q1752.0 564.0 1824.5 530.5Q1897.0 497.0 1935.0 435.5Q1973.0 374.0 1973.0 291.0Q1973.0 208.0 1935.0 146.5Q1897.0 85.0 1824.5 51.5Q1752.0 18.0 1650.0 18.0ZM1471.0 363.0V219.0H1633.0Q1671.0 219.0 1692.0 237.5Q1713.0 256.0 1713.0 291.0Q1713.0 325.0 1692.0 344.0Q1671.0 363.0 1633.0 363.0H1471.0ZM2478.0 786.0Q2615.0 786.0 2717.5 737.0Q2820.0 688.0 2877.0 599.5Q2934.0 511.0 2934.0 393.0Q2934.0 275.0 2877.0 186.5Q2820.0 98.0 2717.5 49.0Q2615.0 0.0 2478.0 0.0Q2341.0 0.0 2238.5 49.0Q2136.0 98.0 2079.0 186.5Q2022.0 275.0 2022.0 393.0Q2022.0 511.0 2079.0 599.5Q2136.0 688.0 2238.5 737.0Q2341.0 786.0 2478.0 786.0ZM2478.0 556.0Q2417.0 556.0 2373.0 536.5Q2329.0 517.0 2305.5 480.5Q2282.0 444.0 2282.0 393.0Q2282.0 342.0 2305.5 305.5Q2329.0 269.0 2373.0 249.5Q2417.0 230.0 2478.0 230.0Q2539.0 230.0 2583.0 249.5Q2627.0 269.0 2650.5 305.5Q2674.0 342.0 2674.0 393.0Q2674.0 444.0 2650.5 480.5Q2627.0 517.0 2583.0 536.5Q2539.0 556.0 2478.0 556.0ZM3463.0 18.0H3026.0V768.0H3284.0V564.0H3463.0Q3565.0 564.0 3637.5 530.5Q3710.0 497.0 3748.0 435.5Q3786.0 374.0 3786.0 291.0Q3786.0 208.0 3748.0 146.5Q3710.0 85.0 3637.5 51.5Q3565.0 18.0 3463.0 18.0ZM3284.0 363.0V219.0H3446.0Q3484.0 219.0 3505.0 237.5Q3526.0 256.0 3526.0 291.0Q3526.0 325.0 3505.0 344.0Q3484.0 363.0 3446.0 363.0H3284.0Z" 
        class="neon-kpop-path" 
      />
    </svg>
    <span class="sr-only">K-pop</span>
  </span>
</template>

<style scoped>
.neon-kpop-wrap {
  display: inline-flex;
  align-items: center;
  vertical-align: -0.06em;
  margin-right: 0.22em;
  line-height: 1;
}

.neon-kpop-svg {
  height: 0.82em;
  width: auto;
  overflow: visible;
  display: inline-block;
}

.neon-kpop-path {
  fill: none;
  stroke: var(--neon-red);
  stroke-width: 2.2px;
  vector-effect: non-scaling-stroke;
  stroke-linejoin: round;
  stroke-linecap: round;
  filter: drop-shadow(0 0 10px rgba(255, 16, 83, 0.75)) drop-shadow(0 0 25px rgba(255, 16, 83, 0.45));
}

@media (max-width: 768px) {
  .neon-kpop-wrap {
    margin-right: 0.18em;
  }
  .neon-kpop-path {
    stroke-width: 2px;
    filter: drop-shadow(0 0 8px rgba(255, 16, 83, 0.7)) drop-shadow(0 0 18px rgba(255, 16, 83, 0.4));
  }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
