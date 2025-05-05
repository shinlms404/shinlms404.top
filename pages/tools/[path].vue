<script lang="ts" setup>
const route = useRoute()
const toolComponent = ref(null)

async function loadToolComponent(path: string) {
  try {
    // 动态导入工具组件
    const comp = await import(`~/packages-tools/${path}/src/index.vue`)
    toolComponent.value = comp.default || comp
  }
  catch (err) {
    console.error(`加载工具组件失败: ${path}`, err)
    // 处理加载失败的情况，例如显示错误信息或重定向
    toolComponent.value = null
  }
};

watch(
  () => route.path,
  (path) => {
    const name = path.split('/').pop()
    if (name) {
      loadToolComponent(name)
      // 设置页面标题
      const { setTitle } = usePageTitle()
      setTitle(name, 'Tools')
    }
  },
  { immediate: true },
)

// useHead({
//   title: '工具',
// })
</script>

<template>
  <div class="flex-1 max-w-7xl flex-1 flex flex-col justify-center items-center">
    <component :is="toolComponent" v-if="toolComponent" />
    <div v-else>
      加载中...
    </div>
  </div>
</template>
