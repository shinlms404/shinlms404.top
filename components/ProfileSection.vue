<script setup>
defineProps({
  isDarkMode: Boolean,
})
</script>

<template>
  <div class="flex flex-col items-start">
    <div class="flex justify-start w-full">
      <div
        class="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-700"
      >
        <img
          src="/img/avatar.jpg"
          alt="Profile picture"
          class="w-full h-full object-cover"
        >
      </div>
    </div>

    <div class="text-left">
      <div class="mt-4 text-sm text-gray-600 dark:text-gray-400">
        @shinlms404
      </div>
      <h1 class="text-4xl font-normal mt-2 mb-6">
        Charlie Chan
      </h1>
      <div class="leading-relaxed text-xl">
        <p class="my-3">
          Hi! Welcome to my personal website.
        </p>
        <p class="my-3">
          I'm a front-end developer and an open source project creator.
        </p>
        <p class="my-3">
          Currently, I'm freelancing and working on developing a stunning
          application.
        </p>
        <p class="my-3">
          For the latest updates, please follow me on
          <a
            href="https://github.com/shinlms404"
            target="_blank"
            class="hlink-base"
          >GitHub</a>.
        </p>
        <p class="my-3">
          Of course, you can also follow my
          <a href="https://x.com/shinlms404" target="_blank" class="hlink-base">𝕏</a>
          and
          <a
            href="https://blog.shinlms404.top"
            target="_blank"
            class="hlink-base"
          >Blog</a>.
        </p>
        <p class="my-3">
          Your star is greatly appreciated!
        </p>
      </div>
    </div>
  </div>
</template>
