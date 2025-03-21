<!-- pages/index.vue -->

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

<template>
  <div
    class="bg-base text-base min-h-screen flex flex-col font-mono transition-colors duration-500 relative"
  >
    <StarsBackground
      :is-dark-mode="isDarkMode"
      :star-shadow-before="starShadowBefore"
      :star-shadow-after="starShadowAfter"
    />
    <header class="flex justify-between px-10 min-h-20">
      <nav></nav>
      <div class="flex items-center gap-5">
        <Time />
        <Tools />
        <DarkModeToggle :is-dark-mode="isDarkMode" @toggle="toggleDarkMode" />
      </div>
    </header>
    <div class="flex-1 flex justify-center">
      <div class="flex flex-col justify-center items-start p-8 max-w-7xl">
        <ProfileSection />
        <ProjectLinks />
        <SocialLinks />
        <SupportLinks />
      </div>
    </div>
    <footer class="py-2 px-4 text-center text-sm opacity-75">
      Made with ❤️ by
      <a href="https://shinlms404.top" class="underline">Charlie Chan</a>
    </footer>
  </div>
</template>
