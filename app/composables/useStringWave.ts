import { ref, onMounted, onUnmounted } from 'vue';

export function useStringWave(options: any = {}) {
  const colors = options.colors || ['#ff1053', '#b026ff', '#00ff73'];
  const maxAmp = options.maxAmp || 12;
  const closed = options.closed || false;

  const paths = ref(['', '', '']);
  const basePoints = ref<any[]>([]); // {x, y, nx, ny, l, envelope}
  const amplitude = ref(0);

  let time = 0;
  let rafId: any = null;

  function update() {
    time += 0.025;

    const pts = basePoints.value;
    if (!pts || pts.length === 0) {
      rafId = requestAnimationFrame(update);
      return;
    }

    if (Math.abs(amplitude.value) > 0.001) {
      const newPaths = [];
      for (let c = 0; c < colors.length; c++) {
        let d = '';
        let f1 = 2 + c * 0.5;
        let f2 = 4 + c * 0.3;
        let p1 = c * Math.PI / 3;
        let p2 = c * Math.PI / 2;

        for (let i = 0; i < pts.length; i++) {
          let p = pts[i];
          // Если конверт передан, используем его, иначе синусоида от l
          let envelope = p.envelope !== undefined ? p.envelope : Math.sin(p.l * Math.PI);

          let wave1 = Math.sin(time * f1 + p.l * Math.PI * 3 + p1);
          let wave2 = 0.5 * Math.sin(time * f2 + p.l * Math.PI * 5 + p2);

          let disp = envelope * (wave1 + wave2) * maxAmp * amplitude.value;

          let x = p.x + p.nx * disp;
          let y = p.y + p.ny * disp;

          if (i === 0) d += `M ${x} ${y} `;
          else d += `L ${x} ${y} `;
        }
        if (closed) d += ' Z';
        newPaths.push(d);
      }
      paths.value = newPaths;
    } else if (paths.value[0] !== '') {
      paths.value = ['', '', ''];
    }

    rafId = requestAnimationFrame(update);
  }

  function start() {
    if (!rafId) update();
  }

  function stop() {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  onMounted(() => {
    start();
  });

  onUnmounted(() => {
    stop();
  });

  return {
    paths,
    basePoints,
    amplitude,
    colors,
    start,
    stop
  };
}
