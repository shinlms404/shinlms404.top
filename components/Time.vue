<script lang="ts" setup>
const currentTime = ref("");

const updateTime = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;

  currentTime.value = `${formattedHours}:${minutes}:${seconds} ${ampm}`;
};

let timer;

onMounted(() => {
  updateTime();
  timer = setInterval(updateTime, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<template>
  <div>
    {{ currentTime }}
  </div>
</template>
