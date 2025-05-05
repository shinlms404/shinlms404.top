<script lang="ts" setup>
interface Tool {
  id: number
  name: string
  path: string
  description: string
  icon: string
  category: string
  isExternal?: boolean
  recommended?: boolean
}

defineProps<{
  tool: Tool
}>()

const emit = defineEmits<{
  (e: 'select', tool: Tool): void
}>()

function selectTool(tool: Tool) {
  emit('select', tool)
}
</script>

<template>
  <a
    class="block bg-card rounded-lg p-5 shadow-md border-card transition-all duration-300 hover:shadow-lg hover:border-[#393939] cursor-pointer relative"
    @click.prevent="selectTool(tool)"
  >
    <div class="flex flex-col mb-3">
      <div
        class="w-9 h-9 rounded-lg bg-icon flex items-center justify-center mr-3"
      >
        <Icon :name="tool.icon" class="text-xl text-gray-700 dark:text-slate-300" />
      </div>
      <h2 class="text-lg font-medium text-gray-800 dark:text-white truncate mt-2">
        {{ tool.name }}
      </h2>
    </div>
    <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
      {{ tool.description }}
    </p>
    <div v-if="tool.isExternal" class="absolute top-2 right-2">
      <Icon name="material-symbols:open-in-new" class="text-gray-500 dark:text-gray-400" />
    </div>
  </a>
</template>
