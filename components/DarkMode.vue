<script setup>
defineProps({
  isDarkMode: {
    type: Boolean,
    required: true
  }
});

defineEmits(["toggle"]);
</script>

<template>
  <button class="flex items-center justify-center" @click="$emit('toggle')">
    <Icon v-show="isDarkMode" name="line-md:moon-filled-loop" size="1.5em" />
    <Icon
      v-show="!isDarkMode"
      name="line-md:moon-filled-alt-to-sunny-filled-loop-transition"
      size="1.5em"
    />
  </button>
</template>
