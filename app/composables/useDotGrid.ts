import { onMounted, onUnmounted } from 'vue';

export function useDotGrid(canvasRef: any) {
  const colors = ['#ff1053', '#b026ff', '#00ff73'];
  const gridStep = 20;
  let rafId: number | null = null;
  let width = 0;
  let height = 0;
  let cols = 0;
  let rows = 0;

  interface FlickeringDot {
    c: number; // column
    r: number; // row
    color: string;
    phase: number;
    speed: number;
    maxAlpha: number;
  }

  let activeDots: FlickeringDot[] = [];
  const maxActiveDots = 60; // Max dots flickering simultaneously

  let mouseX = -1000;
  let mouseY = -1000;

  function onMouseMove(e: MouseEvent) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }

  function resize() {
    if (!canvasRef.value) return;
    const canvas = canvasRef.value;
    const dpr = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }

    cols = Math.ceil(width / gridStep);
    rows = Math.ceil(height / gridStep);
  }

  function addFlickeringDot(c: number, r: number) {
    // Prevent stacking too many dots on the exact same spot
    if (activeDots.some(d => d.c === c && d.r === r)) return;

    activeDots.push({
      c,
      r,
      color: colors[Math.floor(Math.random() * colors.length)],
      phase: 0,
      speed: 0.01 + Math.random() * 0.015,
      maxAlpha: 0.6 + Math.random() * 0.4
    });
  }

  function spawnDot(timeScale: number) {
    if (activeDots.length >= maxActiveDots) return;

    // 1. Глобальный спавн (компенсация FPS: базовый шанс 2% при 60fps)
    if (Math.random() < 0.03 * timeScale) {
      const c = Math.floor(Math.random() * cols);
      const r = Math.floor(Math.random() * rows);
      addFlickeringDot(c, r);
    }

    // 2. Спавн вокруг мыши (компенсация FPS: шанс 4% при 60fps)
    if (mouseX >= 0 && mouseY >= 0 && Math.random() < 0.05 * timeScale) {
      // Выбираем случайную точку в радиусе 70px от курсора
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 70;
      const targetX = mouseX + Math.cos(angle) * radius;
      const targetY = mouseY + Math.sin(angle) * radius;

      const c = Math.floor(targetX / gridStep);
      const r = Math.floor(targetY / gridStep);

      // Проверяем, что точка не вышла за границы экрана
      if (c >= 0 && c <= cols && r >= 0 && r <= rows) {
        addFlickeringDot(c, r);
      }
    }
  }

  let lastTime = 0;

  function update(time: number) {
    if (!lastTime) lastTime = time;
    const deltaTime = time - lastTime;
    lastTime = time;

    // Коэффициент времени относительно 60 FPS (~16.6мс на кадр).
    // Ограничиваем максимум значением 3, чтобы при сворачивании вкладки 
    // не генерировались огромные скачки во времени.
    const timeScale = Math.min(deltaTime / 16.666, 3);

    if (!canvasRef.value) return;
    const canvas = canvasRef.value;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear the canvas
    ctx.clearRect(0, 0, width, height);

    // 1. Draw the static grid
    // Using a single path for all dots is highly optimized for Canvas
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.beginPath();
    for (let i = 0; i <= cols; i++) {
      for (let j = 0; j <= rows; j++) {
        // The old CSS radial-gradient was starting at 0,0. 
        // We can replicate that exact alignment:
        const x = i * gridStep;
        const y = j * gridStep;
        ctx.rect(x - 0.5, y - 0.5, 1, 1);
      }
    }
    ctx.fill();

    // 2. Spawn new flickering dots
    spawnDot(timeScale);

    // 3. Update and draw active flickering dots
    for (let i = activeDots.length - 1; i >= 0; i--) {
      const dot = activeDots[i];
      dot.phase += dot.speed * timeScale;

      // When the sine wave completes half a cycle (PI), the flicker ends
      if (dot.phase >= Math.PI) {
        activeDots.splice(i, 1);
        continue;
      }

      const x = dot.c * gridStep;
      const y = dot.r * gridStep;

      const currentAlpha = Math.sin(dot.phase) * dot.maxAlpha;
      const radius = 1 + Math.sin(dot.phase) * 1.5; // Slight size pulsing

      ctx.fillStyle = dot.color;
      ctx.globalAlpha = currentAlpha;

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();

      // Add a small glow effect
      ctx.shadowBlur = 10;
      ctx.shadowColor = dot.color;
      ctx.fill();

      // Reset shadow for the next draws
      ctx.shadowBlur = 0;
    }

    // Reset global alpha for the next frame
    ctx.globalAlpha = 1.0;

    rafId = requestAnimationFrame(update);
  }

  onMounted(() => {
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    update();
  });

  onUnmounted(() => {
    window.removeEventListener('resize', resize);
    window.removeEventListener('mousemove', onMouseMove);
    if (rafId) cancelAnimationFrame(rafId);
  });
}
