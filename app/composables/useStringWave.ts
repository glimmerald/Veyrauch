import { ref, watch, onMounted, onUnmounted } from 'vue';

export function useStringWave(options: any = {}) {
  const colors = options.colors || ['#ff1053', '#b026ff', '#00ff73'];
  const maxAmp = options.maxAmp || 12;
  const closed = options.closed || false;
  const continuous = options.continuous || false;

  const paths = ref(['', '', '']);
  const basePoints = ref<any[]>([]); // {x, y, nx, ny, l, envelope}
  const amplitude = ref(0);

  let time = 0;
  let rafId: number | null = null;
  let isMounted = false;

  function update() {
    rafId = null;
    if (!isMounted) return;

    const pts = basePoints.value;
    const isActive = Math.abs(amplitude.value) > 0.001;

    if (!pts || pts.length === 0) {
      if (continuous || isActive) {
        rafId = requestAnimationFrame(update);
      }
      return;
    }

    if (isActive) {
      time += 0.025;
      const newPaths = [];
      for (let c = 0; c < colors.length; c++) {
        let d = '';
        const f1 = 2 + c * 0.5;
        const f2 = 4 + c * 0.3;
        const p1 = (c * Math.PI) / 3;
        const p2 = (c * Math.PI) / 2;

        const displacedPoints = [];
        for (let i = 0; i < pts.length; i++) {
          const p = pts[i];
          const envelope = p.envelope !== undefined ? p.envelope : Math.sin(p.l * Math.PI);

          const wave1 = Math.sin(time * f1 + p.l * Math.PI * 3 + p1);
          const wave2 = 0.5 * Math.sin(time * f2 + p.l * Math.PI * 5 + p2);

          const disp = envelope * (wave1 + wave2) * maxAmp * amplitude.value;

          displacedPoints.push({
            x: p.x + p.nx * disp,
            y: p.y + p.ny * disp
          });
        }

        if (displacedPoints.length > 0) {
          d += `M ${displacedPoints[0].x} ${displacedPoints[0].y} `;
          for (let i = 1; i < displacedPoints.length - 1; i++) {
            const xc = (displacedPoints[i].x + displacedPoints[i + 1].x) / 2;
            const yc = (displacedPoints[i].y + displacedPoints[i + 1].y) / 2;
            d += `Q ${displacedPoints[i].x} ${displacedPoints[i].y} ${xc} ${yc} `;
          }
          if (displacedPoints.length > 1) {
            const last = displacedPoints[displacedPoints.length - 1];
            d += `L ${last.x} ${last.y} `;
          }
        }
        if (closed) d += ' Z';
        newPaths.push(d);
      }
      paths.value = newPaths;
      rafId = requestAnimationFrame(update);
    } else {
      if (paths.value[0] !== '') {
        paths.value = ['', '', ''];
      }
      if (continuous) {
        rafId = requestAnimationFrame(update);
      }
    }
  }

  function start() {
    if (isMounted && rafId === null) {
      rafId = requestAnimationFrame(update);
    }
  }

  function stop() {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  watch(amplitude, (val) => {
    if (Math.abs(val) > 0.001) {
      start();
    }
  });

  onMounted(() => {
    isMounted = true;
    if (continuous || Math.abs(amplitude.value) > 0.001) {
      start();
    }
  });

  onUnmounted(() => {
    isMounted = false;
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
