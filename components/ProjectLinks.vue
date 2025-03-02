<template>
  <div class="flex justify-center items-start gap-x-4 mb-3">
    Projects:
    <a
      v-for="link in links"
      :key="link.name"
      :href="link.url"
      target="_blank"
      :class="
        isDarkMode
          ? 'text-gray-100 hover:text-gray-500'
          : 'text-gray-900 hover:text-gray-500'
      "
      class="underline text-lg"
    >
      {{ link.text }}
    </a>
  </div>
</template>

<script setup>
defineProps({
  isDarkMode: Boolean
});

const links = [
  {
    name: "Signature Generator",
    text: "Signature",
    url: "https://signature.app.shinlms404.top/"
  }
];
</script>
