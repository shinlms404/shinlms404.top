<script setup>
defineProps({
  isDarkMode: Boolean
});

const links = [
  {
    name: "afdian",
    text: "Support me on 爱发电",
    url: "https://afdian.com/a/shinlms404",
    icon: "ant-design:thunderbolt-filled"
  }
];
</script>

<template>
  <div class="flex jus items-start gap-x-4 my-5">
    <a
      v-for="link in links"
      :key="link.name"
      :href="link.url"
      target="_blank"
      class="flex justify-center items-center gap-1 rounded-lg border px-3 py-2"
    >
      <Icon :name="link.icon" size="1.4em" />
      {{ link.text }}
    </a>
  </div>
</template>
