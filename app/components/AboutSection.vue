<template>
  <section class="section about-section">
    <div class="container about-container">
      <div class="about-image-wrapper">
        <img src="/images/about.jpg" alt="Лера - преподаватель K-pop танцев в Краснодаре" class="about-image" />
        <div class="image-glow"></div>
      </div>
      <div class="about-content">
        <h2 class="about-heading neon-heading-glow">Кто ведет тренировки?</h2>
        <div class="about-text">
          <p>
            <b>Привет! Меня зовут Лера.</b>
          </p>
          <p>
            Я танцую уже более 6 лет, и K-pop для меня - это гораздо больше, чем просто любимое направление. Это то, что
            вдохновляет меня развиваться, изучать новые хореографии и делиться этой любовью с другими.
          </p>
          <p>
            При этом я не ограничиваюсь только K-pop. Уже три года я занимаюсь современной хореографией, потому что
            уверена: хороший преподаватель не перестает учиться сам. Этот опыт помогает мне лучше понимать движение,
            уделять внимание технике и объяснять даже сложные элементы простым и понятным языком.
          </p>
          <p>
            После нескольких лет в танцах, я решила открыть собственные занятия. Мне хотелось создать место, где не
            страшно сделать ошибку, где не нужно соответствовать чьим-то ожиданиям и где можно начать танцевать с нуля.
          </p>
          <p>
            Я верю, что прогресс начинается с удовольствия от процесса. Поэтому на моих занятиях мы не гонимся за
            идеалом любой ценой. Мы постепенно осваиваем технику, внимательно относимся к своему телу и учимся двигаться
            уверенно, сохраняя самое главное - удовольствие от танца.
          </p>
          <p>
            Если вы давно хотели попробовать кавердэнс, но переживали, что у вас ничего не получится, возможно, именно
            здесь стоит начать.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-section {
  z-index: 2;
  overflow: hidden;
}

.about-container {
  display: flex;
  align-items: center;
  gap: var(--spacing-xl);
}

.about-image-wrapper {
  flex: 1.2;
  position: relative;
  max-width: 650px;
  display: flex;
  justify-content: center;
}

.about-image {
  width: 100%;
  border-radius: 24px;
  position: relative;
  z-index: 2;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease;
}

.about-image:hover {
  transform: translateY(-5px);
}

.image-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 110%;
  height: 110%;
  background: radial-gradient(circle, rgba(255, 16, 83, 0.25) 0%, rgba(0, 0, 0, 0) 60%);
  z-index: 1;
  filter: blur(40px);
}

.about-content {
  flex: 1;
}

.about-heading {
  font-size: var(--text-h2);
  font-weight: 800;
  text-transform: uppercase;
  color: #fff;
  margin-bottom: 30px;
  text-align: left;
  letter-spacing: 2px;
  line-height: 1.2;
  overflow-wrap: break-word;
  word-break: break-word;
}

.about-text {
  font-family: 'Manrope', sans-serif;
  font-size: 1.1rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

@media (max-width: 1024px) {
  .about-container {
    flex-direction: column;
    text-align: center;
    gap: var(--spacing-lg);
  }

  .about-image-wrapper {
    max-width: 100%;
    padding: 0 10px;
  }

  .about-heading {
    text-align: center;
  }

  .about-text {
    text-align: left;
  }
}

@media (max-width: 480px) {
  .about-text {
    font-size: 1rem;
    line-height: 1.6;
    gap: 15px;
  }

  .about-heading {
    letter-spacing: 0;
  }
}
</style>
