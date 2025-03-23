<script setup>
import { XMLParser } from 'fast-xml-parser'
import json2xml from 'jsontoxml'
import { ref } from 'vue'

const mode = ref('xmlToJson')
const inputText = ref('')
const outputText = ref('')

function convert() {
  try {
    if (mode.value === 'xmlToJson') {
      const parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: '',
      })
      const jsonObj = parser.parse(inputText.value)
      outputText.value = JSON.stringify(jsonObj, null, 2)
    }
    else {
      const jsonObj = JSON.parse(inputText.value)
      outputText.value = json2xml(jsonObj, { prettyPrint: true })
    }
  }
  catch (e) {
    outputText.value = `Error: ${e.message}`
  }
}
</script>

<template>
  <div class="p-6">
    <div class="max-w-xl mx-auto">
      <h1 class="text-3xl font-bold mb-4 text-center">
        XML/JSON Converter
      </h1>
      <div class="flex justify-center mb-4">
        <button
          class="px-4 py-2 mr-2 rounded" :class="[
            mode === 'xmlToJson' ? 'bg-black text-white dark:bg-[#292929]' : 'bg-gray-200 text-black dark:bg-[#494949] dark:text-white',
          ]"
          @click="mode = 'xmlToJson'"
        >
          XML to JSON
        </button>
        <button
          class="px-4 py-2 rounded" :class="[
            mode === 'jsonToXml' ? 'bg-black text-white dark:bg-[#292929]' : 'bg-gray-200 text-black dark:bg-[#494949] dark:text-white',
          ]"
          @click="mode = 'jsonToXml'"
        >
          JSON to XML
        </button>
      </div>
      <textarea
        v-model="inputText"
        class="w-full p-2 border border-gray-300 dark:border-gray-600 mb-4 rounded dark:bg-[#1e1e1e]"
        rows="10"
        placeholder="Enter your input here..."
      />
      <button
        class="w-full px-4 py-2 bg-black dark:bg-[#292929] rounded hover:bg-[#393939] mb-4"
        @click="convert"
      >
        Convert
      </button>
      <textarea
        v-model="outputText"
        class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-[#1e1e1e]"
        rows="10"
        placeholder="Output will appear here..."
        readonly
      />
    </div>
  </div>
</template>

  <style scoped>
  /* 额外的自定义样式可在此处添加，UnoCSS 已处理大部分样式 */
</style>
