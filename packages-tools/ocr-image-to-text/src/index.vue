<script setup lang="ts">
import { createWorker } from 'tesseract.js'

const loading = ref(false)
const error = ref('')
const textResult = ref('')

async function handleImageUpload(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file)
    return

  try {
    loading.value = true
    error.value = ''

    const worker = await createWorker('chi_sim+eng')
    const { data: { text } } = await worker.recognize(file)
    textResult.value = text.replace(/(\n{3,})/g, '\n\n')

    await worker.terminate()
  }
  catch {
    error.value = `Recognition failed`
  }
  finally {
    loading.value = false
  }
}

const formattedResult = computed(() => {
  return textResult.value.replace(/([^\n])\n([^\n])/g, '$1$2')
})

function copyToClipboard() {
  try {
    navigator.clipboard.writeText(textResult.value)
    // eslint-disable-next-line no-alert
    alert('Copied to clipboard')
  }
  catch {
    error.value = 'Copy failed'
  }
}
</script>

<template>
  <div class="max-w-800px mx-auto p-4">
    <div class="border-2 border-dashed border-gray-300 rounded-8px p-8 mb-6 relative min-h-[160px] flex items-center justify-center hover:border-gray-500 transition-colors cursor-pointer">
      <input
        type="file"
        accept="image/png, image/jpeg"
        class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        @change="handleImageUpload"
      >
      <div class="text-gray-500 text-sm pointer-events-none">
        <div class="i-carbon-image-search text-24px mb-2" />
        <div>Click to upload or drag and drop image</div>
        <div class="text-gray-400 mt-1">
          Support PNG/JPG format
        </div>
      </div>
    </div>

    <div v-if="loading" class="fixed inset-0 bg-white/10 flex flex-col items-center justify-center gap-4">
      <div class="w-8 h-8 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
      <div class="text-gray-600">
        Recognizing...
      </div>
    </div>

    <div v-if="error" class="bg-red-50 text-red-600 px-4 py-3 rounded mt-4">
      <span>⚠️</span> {{ error }}
    </div>

    <div v-if="textResult" class="mt-6">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-medium">
          Recognition results
        </h3>
        <button
          class="hover:text-gray-500 flex items-center"
          @click="copyToClipboard"
        >
          <span>Copy</span>
        </button>
      </div>
      <pre class="bg-gray-100 dark:bg-[#1e1e1e] p-4 rounded overflow-auto max-h-500px whitespace-pre-wrap">{{ formattedResult }}</pre>
    </div>
  </div>
</template>
