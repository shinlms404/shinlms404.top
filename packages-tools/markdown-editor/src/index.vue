<script setup>
import { marked } from 'marked'

// Markdown content
const markdownContent = ref('# Welcome to Markdown Editor\n\nA simple markdown editor with live preview. Edit on the left and preview on the right.\n\n## Key Features\n\n- Real-time preview\n- Formatting toolbar\n- Dark mode support\n\n> Start editing now!')

// Render HTML
const renderedHTML = computed(() => {
  return marked(markdownContent.value)
})

// Formatting tools
const formatTools = [
  { label: 'Heading 1', icon: 'uil:heading', format: '# ' },
  { label: 'Heading 2', icon: 'uil:heading', format: '## ' },
  { label: 'Heading 3', icon: 'uil:heading', format: '### ' },
  { label: 'Bold', icon: 'uil:bold', format: '**bold text**' },
  { label: 'Italic', icon: 'uil:italic', format: '*italic text*' },
  { label: 'Quote', icon: 'uil:comment-alt-lines', format: '> quote text\n' },
  { label: 'Code', icon: 'uil:brackets-curly', format: '`code`' },
  { label: 'Code Block', icon: 'uil:code-branch', format: '```\ncode block\n```' },
  { label: 'Link', icon: 'uil:link', format: '[link text](https://example.com)' },
  { label: 'Image', icon: 'uil:image', format: '![image alt](https://example.com/image.jpg)' },
  { label: 'Unordered List', icon: 'uil:list-ul', format: '- list item\n- list item\n- list item\n' },
  { label: 'Ordered List', icon: 'uil:list-ol', format: '1. list item\n2. list item\n3. list item\n' },
  { label: 'Divider', icon: 'uil:minus', format: '\n---\n' },
  { label: 'Table', icon: 'uil:table', format: '| Header 1 | Header 2 | Header 3 |\n| --- | --- | --- |\n| Cell 1 | Cell 2 | Cell 3 |\n| Cell 4 | Cell 5 | Cell 6 |\n' },
]

// Insert formatting
function insertFormat(format) {
  const textarea = document.querySelector('textarea')
  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const selectedText = markdownContent.value.substring(start, end)

  let newText = ''

  if (selectedText) {
    // Handle selected text based on format type
    if (format === '**bold text**') {
      newText = `**${selectedText}**`
    }
    else if (format === '*italic text*') {
      newText = `*${selectedText}*`
    }
    else if (format === '`code`') {
      newText = `\`${selectedText}\``
    }
    else if (format === '```\ncode block\n```') {
      newText = `\`\`\`\n${selectedText}\n\`\`\``
    }
    else if (format === '[link text](https://example.com)') {
      newText = `[${selectedText}](https://example.com)`
    }
    else if (format.startsWith('#')) {
      // Add heading at line start
      newText = `${format}${selectedText}`
    }
    else {
      // Insert format directly for other cases
      newText = format
    }
  }
  else {
    // Insert format directly when no text selected
    newText = format
  }

  // Update content
  markdownContent.value = markdownContent.value.substring(0, start) + newText + markdownContent.value.substring(end)

  // Set cursor position
  setTimeout(() => {
    textarea.focus()
    if (selectedText) {
      textarea.selectionStart = start + newText.length
      textarea.selectionEnd = start + newText.length
    }
    else {
      // Position cursor appropriately when no text selected
      if (format === '**bold text**') {
        textarea.selectionStart = start + 2
        textarea.selectionEnd = start + 6
      }
      else if (format === '*italic text*') {
        textarea.selectionStart = start + 1
        textarea.selectionEnd = start + 5
      }
      else if (format === '`code`') {
        textarea.selectionStart = start + 1
        textarea.selectionEnd = start + 3
      }
      else if (format === '```\ncode block\n```') {
        textarea.selectionStart = start + 4
        textarea.selectionEnd = start + 8
      }
      else if (format === '[link text](https://example.com)') {
        textarea.selectionStart = start + 1
        textarea.selectionEnd = start + 5
      }
      else {
        textarea.selectionStart = start + newText.length
        textarea.selectionEnd = start + newText.length
      }
    }
  }, 0)
}
</script>

<template>
  <div class="flex-1 flex flex-col">
    <!-- Main editor area -->
    <div class="flex-1 flex max-h-4xl overflow-hidden">
      <!-- Left editor -->
      <div class="w-1/2 flex flex-col border-r border-gray-200 dark:border-gray-700">
        <!-- Formatting toolbar -->
        <div class="p-2 border-b border-gray-200 dark:border-gray-700 flex flex-wrap gap-1">
          <button
            v-for="tool in formatTools"
            :key="tool.label"
            class="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
            :title="tool.label"
            @click="insertFormat(tool.format)"
          >
            <Icon :name="tool.icon" class="text-lg" />
          </button>
        </div>

        <!-- Editor -->
        <textarea
          v-model="markdownContent"
          class="flex-1 p-4 resize-none outline-none bg-white dark:bg-[#1e1e1e] text-gray-800 dark:text-gray-200 font-mono"
          placeholder="Enter Markdown content here..."
        />
      </div>

      <!-- Right preview -->
      <div class="w-1/2 p-4 overflow-auto bg-white dark:bg-[#1e1e1e]">
        <div
          class="prose dark:prose-invert max-w-none"
          v-html="renderedHTML"
        />
      </div>
    </div>
  </div>
</template>

<style>
/* Custom scrollbar styles */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(156, 163, 175, 0.8);
}

/* Markdown styles */
.prose {
  color: #374151;
  max-width: 65ch;
  font-size: 1rem;
  line-height: 1.75;
}

.prose h1 {
  color: #111827;
  font-weight: 800;
  font-size: 2.25em;
  margin-top: 0;
  margin-bottom: 0.8888889em;
  line-height: 1.1111111;
}

.prose h2 {
  color: #111827;
  font-weight: 700;
  font-size: 1.5em;
  margin-top: 2em;
  margin-bottom: 1em;
  line-height: 1.3333333;
}

.prose h3 {
  color: #111827;
  font-weight: 600;
  font-size: 1.25em;
  margin-top: 1.6em;
  margin-bottom: 0.6em;
  line-height: 1.6;
}

.prose p {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
}

.prose a {
  color: #2563eb;
  text-decoration: underline;
  font-weight: 500;
}

.prose strong {
  color: #111827;
  font-weight: 600;
}

.prose ol {
  counter-reset: list-counter;
  margin-top: 1.25em;
  margin-bottom: 1.25em;
  padding-left: 1.625em;
}

.prose ul {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
  padding-left: 1.625em;
  list-style-type: disc;
}

.prose li {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}

.prose blockquote {
  font-weight: 500;
  font-style: italic;
  color: #111827;
  border-left-width: 0.25rem;
  border-left-color: #e5e7eb;
  margin-top: 1.6em;
  margin-bottom: 1.6em;
  padding-left: 1em;
}

.prose code {
  color: #111827;
  font-weight: 600;
  font-size: 0.875em;
  background-color: #f3f4f6;
  padding: 0.25em 0.4em;
  border-radius: 0.25rem;
}

.prose pre {
  color: #e5e7eb;
  background-color: #1f2937;
  overflow-x: auto;
  font-size: 0.875em;
  line-height: 1.7142857;
  margin-top: 1.7142857em;
  margin-bottom: 1.7142857em;
  border-radius: 0.375rem;
  padding: 0.8571429em 1.1428571em;
}

.prose pre code {
  background-color: transparent;
  border-width: 0;
  border-radius: 0;
  padding: 0;
  font-weight: 400;
  color: inherit;
  font-size: inherit;
  font-family: inherit;
  line-height: inherit;
}

.prose img {
  margin-top: 2em;
  margin-bottom: 2em;
}

.prose hr {
  border-color: #e5e7eb;
  margin-top: 3em;
  margin-bottom: 3em;
}

.prose table {
  width: 100%;
  table-layout: auto;
  text-align: left;
  margin-top: 2em;
  margin-bottom: 2em;
  font-size: 0.875em;
  line-height: 1.7142857;
}

.prose thead {
  color: #111827;
  font-weight: 600;
  border-bottom-width: 1px;
  border-bottom-color: #d1d5db;
}

.prose thead th {
  vertical-align: bottom;
  padding-right: 0.5714286em;
  padding-bottom: 0.5714286em;
  padding-left: 0.5714286em;
}

.prose tbody tr {
  border-bottom-width: 1px;
  border-bottom-color: #e5e7eb;
}

.prose tbody tr:last-child {
  border-bottom-width: 0;
}

.prose tbody td {
  vertical-align: top;
  padding-top: 0.5714286em;
  padding-right: 0.5714286em;
  padding-bottom: 0.5714286em;
  padding-left: 0.5714286em;
}

/* Dark mode Markdown styles */
.dark .prose {
  color: #d1d5db;
}

.dark .prose h1,
.dark .prose h2,
.dark .prose h3,
.dark .prose h4,
.dark .prose h5,
.dark .prose h6 {
  color: #f3f4f6;
}

.dark .prose a {
  color: #60a5fa;
}

.dark .prose strong {
  color: #f3f4f6;
}

.dark .prose blockquote {
  color: #f3f4f6;
  border-left-color: #4b5563;
}

.dark .prose code {
  color: #f3f4f6;
  background-color: #374151;
}

.dark .prose pre {
  color: #e5e7eb;
  background-color: #1f2937;
}

.dark .prose hr {
  border-color: #4b5563;
}

.dark .prose thead {
  color: #f3f4f6;
  border-bottom-color: #4b5563;
}

.dark .prose tbody tr {
  border-bottom-color: #4b5563;
}
</style>
