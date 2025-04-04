<script lang="ts" setup>
interface Tool {
  id: number
  name: string
  path: string
  description: string
  icon: string
  category: string
}

const currentPage = ref(1)
const itemsPerPage = ref(12)
const searchQuery = ref('')
const currentCategory = ref('')

const allTools = ref<Tool[]>([])

const { data: tools, status } = await useAsyncData('tools', () => {
  return queryCollection('tools')
    .order('id', 'DESC')
    .all()
})

if (tools.value && tools.value.length > 0) {
  allTools.value = tools.value[0].meta.body as Tool[]
}
else {
  console.warn('tools is null or empty')
}

// 工具函数：判断工具是否匹配搜索条件
function matchesSearch(tool: Tool, query: string): boolean {
  const lowerQuery = query.toLowerCase()
  return tool.name.toLowerCase().includes(lowerQuery)
    || tool.description.toLowerCase().includes(lowerQuery)
}

// 工具函数：判断工具是否匹配分类
function matchesCategory(tool: Tool, category: string): boolean {
  return category === '' || tool.category === category
}

// 获取所有分类
const categories = computed(() => [
  ...new Set(allTools.value.map(tool => tool.category)),
])

// 获取过滤后的工具列表（分页前）
const filteredToolsBeforePaging = computed(() =>
  allTools.value.filter(tool =>
    matchesSearch(tool, searchQuery.value)
    && matchesCategory(tool, currentCategory.value),
  ),
)

// 计算分页总数
const totalPages = computed(() =>
  Math.ceil(filteredToolsBeforePaging.value.length / itemsPerPage.value),
)

// 当前页显示的工具
const filteredTools = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value
  const endIndex = startIndex + itemsPerPage.value
  return filteredToolsBeforePaging.value.slice(startIndex, endIndex)
})

// 获取可见页码
const visiblePageNumbers = computed(() => {
  const delta = 2
  const range = Array.from(
    { length: Math.min(totalPages.value, currentPage.value + delta) - Math.max(1, currentPage.value - delta) + 1 },
    (_, i) => Math.max(1, currentPage.value - delta) + i,
  )

  // 添加首尾页码和省略号
  return [
    ...(range[0] > 1 ? [1, ...(range[0] > 2 ? ['...'] : [])] : []),
    ...range,
    ...(range[range.length - 1] < totalPages.value
      ? [...(range[range.length - 1] < totalPages.value - 1 ? ['...'] : []), totalPages.value]
      : []
    ),
  ]
})

// 工具选择处理函数
function selectTool(tool: Tool) {
  console.warn(`Selected tool with ID: ${tool.path}`)
  navigateTo(`/tools/${tool.path}?name=${tool.name}`)
  // 实际应用中可以跳转到工具详情页
}

// 监听筛选条件变化，重置到第一页
watch([searchQuery, currentCategory], () => {
  currentPage.value = 1
})
</script>

<template>
  <div class="flex-1 flex flex-col justify-center">
    <div class="flex justify-start items-center mt-5">
      <div
        class="w-14 h-14 rounded-xl bg-button mr-4 overflow-hidden flex items-center justify-center"
      >
        <Icon name="i-carbon-tools" size="2em" class="text-gray-700 dark:text-gray-300" />
      </div>
      <div>
        <h1 class="text-2xl sm:text-3xl text-gray-900 dark:text-gray-100">
          Tools Collection<span class="text-gray-400 dark:text-gray-500">.</span>
        </h1>
        <p class="text-sm sm:text-[1rem] font-light text-gray-600 dark:text-gray-400">
          Simple, powerful utilities.
        </p>
      </div>
    </div>

    <div class="my-10">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search tools..."
        class="w-full p-3 border-card bg-button text-base placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500"
      >
    </div>

    <div class="flex flex-wrap gap-2 mb-8">
      <button
        class="px-3 py-1 rounded-full text-sm" :class="[
          currentCategory === ''
            ? 'bg-button-active'
            : 'bg-button text-button',
        ]"
        @click="currentCategory = ''"
      >
        All
      </button>
      <button
        v-for="category in categories"
        :key="category"
        class="px-3 py-1 rounded-full text-sm" :class="[
          currentCategory === category
            ? 'bg-button-active'
            : 'bg-button text-button',
        ]"
        @click="currentCategory = category"
      >
        {{ category }}
      </button>
    </div>

    <div v-if="status === 'pending'" class="flex flex-col items-center justify-center h-96">
      <svg class="animate-spin h-12 w-12 text-gray-600 dark:text-gray-400" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
      <span class="mt-4 text-gray-600 dark:text-gray-400">Loading...</span>
    </div>

    <div v-else-if="status === 'success'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <a
        v-for="tool in filteredTools"
        :key="tool.id"
        class="block bg-card rounded-lg p-5 shadow-md border-card transition-all duration-300 hover:shadow-lg hover:border-[#393939] cursor-pointer"
        @click.prevent="selectTool(tool)"
      >
        <div class="flex flex-col  mb-3">
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
      </a>
    </div>

    <div class="mt-10 flex justify-center">
      <div class="flex gap-1">
        <button
          :disabled="currentPage === 1"
          class="px-3 py-1 rounded border-button text-button disabled:opacity-50 dark:disabled:opacity-40 cursor-pointer"
          @click="currentPage = Math.max(1, currentPage - 1)"
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
          @click="typeof page === 'number' && (currentPage = page)"
        >
          {{ page }}
        </button>
        <button
          :disabled="currentPage === totalPages"
          class="px-3 py-1 rounded border-button text-button disabled:opacity-50 dark:disabled:opacity-40 cursor-pointer"
          @click="currentPage = Math.min(totalPages, currentPage + 1)"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>
