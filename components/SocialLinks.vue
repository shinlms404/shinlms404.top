<template>
  <div class="flex jus items-start gap-x-4 my-2">
    <a v-for="link in links" :key="link.name" :href="link.url" target="_blank">
      <Icon
        :name="link.icon"
        :style="{ color: isDarkMode ? 'white' : 'black' }"
        size="1.6em"
      />
    </a>
  </div>
</template>

<script setup>
defineProps({
  isDarkMode: Boolean
});

const links = [
  { name: "github", url: "https://github.com/shinlms404", icon: "uil:github" },
  {
    name: "telegram",
    url: "https://discord.gg/d2YPbeaa",
    icon: "bi:discord"
  },
  {
    name: "twitter",
    url: "https://x.com/CharlieC404",
    icon: "ri:twitter-x-fill"
  },
  {
    name: "threads",
    url: "https://www.threads.net/@chali.cl",
    icon: "tabler:brand-threads"
  },
  {
    name: "youtube",
    url: "https://www.youtube.com/@shinlms404",
    icon: "ion:logo-youtube"
  }
];
</script>
