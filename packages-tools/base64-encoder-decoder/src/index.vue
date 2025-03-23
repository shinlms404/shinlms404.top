<script setup>
import { ref } from 'vue'

const input = ref('')
const output = ref('')

function encode() {
  try {
    output.value = btoa(input.value)
  }
  catch {
    output.value = 'Invalid input for encoding.'
  }
}

function decode() {
  try {
    output.value = atob(input.value)
  }
  catch {
    output.value = 'Invalid Base64 format.'
  }
}

function clear() {
  input.value = ''
  output.value = ''
}
</script>

<template>
  <div class="w-350px mx-auto my-50px p-20px bg-gray-100 border border-gray-200 rounded-8px shadow-lg dark:bg-[#1e1e1e] dark:border-gray-700">
    <h1 class="text-center mb-20px text-gray-800 dark:text-gray-200">
      Base64 Encoder / Decoder
    </h1>
    <div class="mb-20px">
      <label class="font-bold mb-5px block text-gray-700 dark:text-gray-300" for="input">Input:</label>
      <textarea
        id="input"
        v-model="input"
        placeholder="Enter text or Base64 here..."
        class="w-full h-120px p-10px border border-gray-300 rounded-4px text-sm bg-white text-gray-800 resize-none dark:bg-[#191919] dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:border-gray-800 dark:focus:border-gray-400"
      />
    </div>
    <div class="mb-20px">
      <label class="font-bold mb-5px block text-gray-700 dark:text-gray-300" for="output">Output:</label>
      <textarea
        id="output"
        v-model="output"
        readonly
        class="w-full h-120px p-10px border border-gray-300 rounded-4px text-sm bg-white text-gray-800 resize-none dark:bg-[#191919] dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:border-gray-800 dark:focus:border-gray-400"
      />
    </div>
    <div class="flex justify-between">
      <button
        class="px-20px py-10px text-sm text-white bg-gray-800 border-none rounded-4px cursor-pointer transition-300 hover:bg-gray-600 dark:bg-[#292929] dark:hover:bg-[#393939]"
        @click="encode"
      >
        Encode
      </button>
      <button
        class="px-20px py-10px text-sm text-white bg-gray-800 border-none rounded-4px cursor-pointer transition-300 hover:bg-gray-600 dark:bg-[#292929] dark:hover:bg-[#393939]"
        @click="decode"
      >
        Decode
      </button>
      <button
        class="px-20px py-10px text-sm text-white bg-gray-800 border-none rounded-4px cursor-pointer transition-300 hover:bg-gray-600 dark:bg-[#292929] dark:hover:bg-[#393939]"
        @click="clear"
      >
        Clear
      </button>
    </div>
  </div>
</template>
