<script lang="ts" setup>
interface Props {
  currentPage: number
  totalPages: number
  visiblePageNumbers: (number | string)[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:currentPage', page: number): void
}>()

function handlePageChange(page: number | string) {
  if (typeof page === 'number') {
    emit('update:currentPage', page)
  }
}

function handlePrevPage() {
  if (props.currentPage > 1) {
    emit('update:currentPage', props.currentPage - 1)
  }
}

function handleNextPage() {
  if (props.currentPage < props.totalPages) {
    emit('update:currentPage', props.currentPage + 1)
  }
}
</script>

<template>
  <div class="flex justify-center">
    <div class="flex gap-1">
      <button
        :disabled="currentPage === 1"
        class="px-3 py-1 rounded border-button text-button disabled:opacity-50 dark:disabled:opacity-40 cursor-pointer"
        @click="handlePrevPage"
      >
        Previous
      </button>
      <button
        v-for="page in visiblePageNumbers"
        :key="page"
        class="px-3 py-1 rounded" :class="[
          currentPage === page
            ? 'bg-button-active'
            : 'bg-gray-200 dark:bg-[#191919] text-button border-button',
        ]"
        @click="handlePageChange(page)"
      >
        {{ page }}
      </button>
      <button
        :disabled="currentPage === totalPages"
        class="px-3 py-1 rounded border-button text-button disabled:opacity-50 dark:disabled:opacity-40 cursor-pointer"
        @click="handleNextPage"
      >
        Next
      </button>
    </div>
  </div>
</template>
