<script setup lang="ts">
const stars = ref([])

function generateStars() {
  const count = 150
  const starsArray = []

  for (let i = 0; i < count; i++) {
    starsArray.push({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1 + 1,
      duration: Math.random() * 1 + 1,
    })
  }

  return starsArray
}

onMounted(() => {
  stars.value = generateStars()
})
</script>

<template>
  <div class="stars">
    <div
      v-for="(star, index) in stars"
      :key="index"
      class="star"
      :style="{
        left: `${star.x}%`,
        top: `${star.y}%`,
        width: `${star.size}px`,
        height: `${star.size}px`,
        animationDuration: `${star.duration}s`,
      }"
    />
  </div>
</template>

<style scoped>
.stars {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

.star {
  position: absolute;
  background: currentColor;
  border-radius: 50%;
  animation: twinkle infinite ease-in-out;
  opacity: 0.3;
  transform: translate(-50%, -50%);
}

@keyframes twinkle {
  0%,
  100% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
}
</style>
