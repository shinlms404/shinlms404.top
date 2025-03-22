<script lang="ts" setup>
defineProps({
  isDarkMode: Boolean
});

const { isDarkMode, toggleDarkMode } = useDarkMode();
</script>

<template>
  <header class="flex justify-between px-10 min-h-15">
    <nav></nav>
    <div class="flex items-center gap-5">
      <Time />
      <Me />
      <Tools />
      <DarkMode :is-dark-mode="isDarkMode" @toggle="toggleDarkMode" />
    </div>
  </header>
</template>
