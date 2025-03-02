<!-- pages/index.vue -->
<template>
  <div
    :class="isDarkMode ? 'bg-black text-white' : 'bg-white text-black'"
    class="min-h-screen flex flex-col font-mono transition-colors duration-300 relative"
  >
    <StarsBackground
      v-if="isDarkMode"
      :is-dark-mode="isDarkMode"
      :star-shadow-before="starShadowBefore"
      :star-shadow-after="starShadowAfter"
    />
    <header class="flex justify-between p-4">
      <DarkModeToggle :is-dark-mode="isDarkMode" @toggle="toggleDarkMode" />
    </header>
    <div class="flex-1 flex justify-center">
      <div class="flex flex-col justify-center items-start p-8">
        <ProfileSection :is-dark-mode="isDarkMode" />
        <ProjectLinks :is-dark-mode="isDarkMode" />
        <SocialLinks :is-dark-mode="isDarkMode" />
        <SupportLinks :is-dark-mode="isDarkMode" />
      </div>
    </div>
    <footer class="py-2 px-4 text-center text-sm opacity-75">
      Made with ❤️ by
      <a href="https://shinlms404.top" class="underline">Charlie Chan</a>
    </footer>
  </div>
</template>

<script setup>
const { isDarkMode, toggleDarkMode } = useDarkMode();
const { starShadowBefore, starShadowAfter } = useStars();

useHead({
  title: "Charlie Chan - Personal Website",
  meta: [
    {
      hid: "description",
      name: "description",
      content: "Front-end developer and open source project creator"
    }
  ]
});
</script>
