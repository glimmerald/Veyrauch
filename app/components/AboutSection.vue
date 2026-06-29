<template>
  <section class="section about-section">
    <div class="about-container">
      <div class="about-image-wrapper">
        <img src="/images/about.jpg" alt="Обо мне" class="about-image" />
        <div class="image-glow"></div>
      </div>
      <div class="about-content">
        <h2 class="about-heading neon-heading-glow">Кто ведет тренировки?</h2>
        <div class="about-text">
          <p>
            <b>Привет! Меня зовут Лера.</b>
          </p>
          <p>
            Я в танцах уже 6 лет, и K-pop cover dance — моя главная страсть.
            Мой главный фокус сейчас — это делиться опытом. Я запустила свои классы в Краснодаре, чтобы доказать:
            научиться круто двигаться и кайфовать от себя может каждый. Даже если ты никогда раньше не танцевала. На
            моих тренировках нет строгих оценок — только поддержка, вайб любимых айдолов и бережный, пошаговый разбор
            хореографии.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-section {
  padding: 100px 20px;
  position: relative;
  z-index: 2;
  overflow: hidden;
}

.about-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 60px;
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
  font-size: clamp(2.2rem, 4vw, 3.5rem);
  font-weight: 800;
  text-transform: uppercase;
  color: #fff;
  margin-bottom: 30px;
  text-align: left;
  letter-spacing: 2px;
  line-height: 1.2;
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

@media (max-width: 900px) {
  .about-container {
    flex-direction: column;
    text-align: center;
    gap: 40px;
  }

  .about-image-wrapper {
    max-width: 100%;
  }

  .about-heading {
    text-align: center;
  }

  .about-text {
    text-align: left;
  }
}
</style>
