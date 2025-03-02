<template>
  <div class="flex flex-col items-start">
    <div class="flex justify-start w-full gap-8">
      <div
        class="w-24 h-24 rounded-full overflow-hidden border-2"
        :class="isDarkMode ? 'border-gray-700' : 'border-gray-300'"
      >
        <img
          src="/img/avatar.jpg"
          alt="Profile picture"
          class="w-full h-full object-cover"
        />
      </div>
    </div>

    <div class="text-left">
      <div
        class="mt-4 text-sm"
        :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
      >
        @shinlms404
      </div>
      <h1 class="text-4xl font-normal mt-2 mb-6">Charlie Chan</h1>
      <div class="leading-relaxed text-xl">
        <p class="my-3">Hi! Welcome to my personal website.</p>
        <p class="my-3">
          I'm a front-end developer and an open source project creator.
        </p>
        <p class="my-3">
          Currently, I'm freelancing and working on developing a stunning AI
          application.
        </p>
        <p class="my-3">
          For the latest updates, please follow me on
          <a
            href="https://github.com/shinlms404"
            target="_blank"
            :class="
              isDarkMode
                ? 'text-gray-100 hover:text-gray-500'
                : 'text-gray-900 hover:text-gray-500'
            "
            class="underline transition-colors font-bold"
            >GitHub</a
          >.
        </p>
        <p class="my-3">
          Of course, you can also follow my
          <a
            href="https://x.com/CharlieC404"
            target="_blank"
            :class="
              isDarkMode
                ? 'text-gray-100 hover:text-gray-500'
                : 'text-gray-900 hover:text-gray-500'
            "
            class="underline transition-colors font-bold"
            >𝕏</a
          >
          and
          <a
            href="https://blog.shinlms404.top"
            target="_blank"
            :class="
              isDarkMode
                ? 'text-gray-100 hover:text-gray-500'
                : 'text-gray-900 hover:text-gray-500'
            "
            class="underline transition-colors font-bold"
            >Blog</a
          >.
        </p>
        <p class="my-3">Your star is greatly appreciated!</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isDarkMode: Boolean
});
</script>
