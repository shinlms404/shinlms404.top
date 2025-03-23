<script lang="ts" setup>
defineProps({
  isDarkMode: Boolean,
})

const { isDarkMode, toggleDarkMode } = useDarkMode()

const route = useRoute()
const router = useRouter()
</script>

<template>
  <header class="flex justify-between items-center px-4 min-h-15">
    <div>
      <button v-if="route.path !== '/'" class="flex justify-center items-center w-fit h-full hover:text-gray-500" @click="router.go(-1)">
        <Icon name="material-symbols-light:arrow-back-2-rounded" size="1.5rem" />
        <span text="1rem">back</span>
      </button>
    </div>
    <div class="flex items-center gap-5">
      <Time />
      <Me />
      <Tools />
      <DarkMode :is-dark-mode="isDarkMode" @toggle="toggleDarkMode" />
    </div>
  </header>
</template>
