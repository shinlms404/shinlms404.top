<template>
  <button @click="$emit('toggle')">
    <Icon
      :name="
        isDarkMode
          ? 'line-md:moon-filled-loop'
          : 'line-md:moon-filled-alt-to-sunny-filled-loop-transition'
      "
      :style="{ color: isDarkMode ? 'white' : 'black' }"
      size="1.5em"
    />
  </button>
</template>

<script setup>
defineProps({
  isDarkMode: {
    type: Boolean,
    required: true
  }
});

defineEmits(["toggle"]);
</script>
