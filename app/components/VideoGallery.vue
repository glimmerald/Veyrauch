<script setup>
import { ref, onMounted, nextTick } from 'vue'

// Динамически получаем список видео с сервера
const { data: fetchedVideos } = await useFetch('/api/videos')

// Размеры:
// Теперь используем только симметричные блоки, чтобы не искажать пропорции вертикальных видео (9:16).
// large: 2x2 ячейки 
// small: 1x1 ячейки
const sizesDistribution = [
  'large', 'large', 'large', 'large', 
  'small', 'small', 'small', 'small', 
  'small', 'small', 'small', 'small'
]

const galleryItems = ref([])
const videoRefs = ref([])

// Функция для перемешивания массива (Алгоритм Фишера-Йетса)
function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

onMounted(() => {
  // Получаем видео из запроса, если пусто — пустой массив
  const videosArray = fetchedVideos.value || []
  
  // Перемешиваем видео и размеры при каждой загрузке страницы
  const shuffledVideos = shuffle([...videosArray]);
  const shuffledSizes = shuffle([...sizesDistribution]);
  
  galleryItems.value = shuffledVideos.map((src, index) => {
    return {
      src,
      size: shuffledSizes[index % shuffledSizes.length]
    }
  });

  // Запускаем Observer после того, как DOM обновится
  nextTick(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.play().catch(e => console.log('Autoplay blocked:', e))
        } else {
          entry.target.pause()
        }
      })
    }, { threshold: 0.1 })

    videoRefs.value.forEach(video => {
      if (video) observer.observe(video)
    })
  })
})
</script>

<template>
  <section class="section section--gallery">
    <div class="gallery-container">
      <h2 class="gallery-title">Галерея</h2>
      
      <!-- ClientOnly предотвращает ошибки гидратации (SSR), так как мы используем Math.random() -->
      <ClientOnly>
        <div class="gallery-grid" v-if="galleryItems.length > 0">
          <div 
            v-for="(item, index) in galleryItems" 
            :key="index"
            class="gallery-item"
            :class="`gallery-item--${item.size}`"
          >
            <video 
              ref="videoRefs"
              :src="item.src" 
              class="gallery-video"
              loop 
              muted 
              playsinline
              preload="none"
            ></video>
            <div class="gallery-item-overlay"></div>
          </div>
        </div>
      </ClientOnly>
    </div>
  </section>
</template>

<style scoped>
.section--gallery {
  position: relative;
  z-index: 2;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 80px 20px;
  background-color: transparent;
}

.gallery-container {
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

.gallery-title {
  font-size: 4rem;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--text-color, #fff);
  margin-bottom: 40px;
  text-align: center;
  letter-spacing: 2px;
}

.gallery-grid {
  display: grid;
  /* 4 колонки: это идеальная основа для мозаики (bento box) */
  grid-template-columns: repeat(4, 1fr);
  /* Высота ячейки динамическая. Чтобы поддерживать пропорции вертикального видео 9:16:
     мы делаем ряды немного выше, чтобы ячейки были вертикальными прямоугольниками */
  grid-auto-rows: 450px;
  gap: 16px;
  width: 100%;
  /* Магия CSS Grid: dense flow автоматически заполняет "дыры" в сетке мелкими элементами! */
  grid-auto-flow: dense;
}

.gallery-item {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.3s ease;
  cursor: pointer;
}

.gallery-item:hover {
  transform: scale(1.02);
  z-index: 2;
  border-color: var(--neon-red, #ff1053);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.gallery-item:hover .gallery-item-overlay {
  opacity: 0;
}

.gallery-video {
  width: 100%;
  height: 100%;
  /* object-fit: cover обрезает края, чтобы заполнить ячейку без искажений */
  object-fit: cover; 
  display: block;
}

.gallery-item-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%);
  opacity: 1;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

/* --- РАЗМЕРЫ МОЗАИКИ --- */
/* Маленькая картинка (1х1). Сохраняет базовую пропорцию ячейки. */
.gallery-item--small {
  grid-column: span 1;
  grid-row: span 1;
}

/* Самая большая картинка: 2x2. Занимает площадь как 4 маленьких. Сохраняет ту же пропорцию! */
.gallery-item--large {
  grid-column: span 2;
  grid-row: span 2;
}

/* --- АДАПТИВ --- */
@media (max-width: 1200px) {
  .gallery-grid {
    grid-auto-rows: 400px;
  }
}

@media (max-width: 1024px) {
  .gallery-grid {
    /* Переходим на 3 колонки */
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 350px;
  }
}

@media (max-width: 768px) {
  .gallery-grid {
    /* Переходим на 2 колонки */
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 450px;
  }
  .gallery-item--large {
    grid-column: span 2;
  }
}

@media (max-width: 480px) {
  .gallery-grid {
    grid-template-columns: 1fr;
    grid-auto-rows: 500px;
  }
  .gallery-item {
    grid-column: span 1 !important;
    grid-row: span 1 !important;
  }
}
</style>
