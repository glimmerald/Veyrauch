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
    <SectionHeading>Галерея</SectionHeading>
    
    <!-- ClientOnly предотвращает ошибки гидратации (SSR), так как мы используем Math.random() -->
    <ClientOnly>
      <div class="gallery-scroll-wrapper" v-if="galleryItems.length > 0">
        <div class="gallery-grid">
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
      </div>
    </ClientOnly>
  </section>
</template>

<style scoped>
.section--gallery {
  position: relative;
  z-index: 2;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 80px 0;
  background-color: transparent;
}



.gallery-scroll-wrapper {
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 30px;
  padding-top: 10px;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
}

.gallery-scroll-wrapper::-webkit-scrollbar {
  display: none;
}

.gallery-grid {
  display: grid;
  /* Высота мозаики - 2 ряда (максимальный размер большого формата) */
  grid-template-rows: repeat(2, 350px);
  /* Ширина базовой ячейки */
  grid-auto-columns: 218px;
  gap: 16px;
  width: max-content;
  /* Мозаика заполняется по колонкам (слева направо) */
  grid-auto-flow: column dense;
  padding-left: max(20px, calc((100vw - 1400px) / 2 + 20px));
  padding-right: max(20px, calc((100vw - 1400px) / 2 + 20px));
}

.gallery-item {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.3s ease;
  cursor: pointer;
  /* Для Safari баг-фикс с overflow: hidden и border-radius */
  -webkit-mask-image: -webkit-radial-gradient(white, black);
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
.gallery-item--small {
  grid-row: span 1;
  grid-column: span 1;
}

.gallery-item--large {
  grid-row: span 2;
  grid-column: span 2;
}

/* --- АДАПТИВ --- */
@media (max-width: 1200px) {
  .gallery-grid {
    grid-template-rows: repeat(2, 300px);
    grid-auto-columns: 186px;
  }
}

@media (max-width: 1024px) {
  .gallery-grid {
    grid-template-rows: repeat(2, 250px);
    grid-auto-columns: 155px;
  }
}

@media (max-width: 768px) {
  .gallery-grid {
    grid-template-rows: repeat(2, 200px);
    grid-auto-columns: 124px;
  }
}

@media (max-width: 480px) {
  .gallery-grid {
    grid-template-rows: repeat(2, 180px);
    grid-auto-columns: 112px;
  }
}
</style>
