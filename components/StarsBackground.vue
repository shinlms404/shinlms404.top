<template>
  <div
    v-if="isDarkMode"
    class="stars"
    :style="{
      '--star-shadow-before': starShadowBefore,
      '--star-shadow-after': starShadowAfter
    }"
  ></div>
</template>

<script setup>
defineProps({
  isDarkMode: Boolean,
  starShadowBefore: String,
  starShadowAfter: String
});
</script>

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

.stars::before,
.stars::after {
  content: "";
  position: absolute;
  width: 2px;
  height: 2px;
  background: currentColor;
  border-radius: 50%;
  animation: twinkle 2s infinite ease-in-out;
  opacity: 0.3;
}

.stars::before {
  box-shadow: var(--star-shadow-before);
}

.stars::after {
  box-shadow: var(--star-shadow-after);
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
