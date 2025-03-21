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

<template>
  <div class="flex justify-center items-start gap-x-4 mb-3 text-xl">
    Projects:
    <a
      v-for="link in links"
      :key="link.name"
      :href="link.url"
      target="_blank"
      class="hlink-base"
    >
      {{ link.text }}
    </a>
  </div>
</template>
