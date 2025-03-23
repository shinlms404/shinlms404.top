<script setup>
import { Analytics } from '@vercel/analytics/nuxt'

useHead({
  title: 'Charlie Chan',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: 'Front-end developer and open source project creator',
    },
  ],
})
</script>

<template>
  <div>
    <div
      class="bg-base text-base min-h-screen flex flex-col font-mono transition-all duration-500 relative"
    >
      <StarsBackground />
      <Header />
      <div class="flex-1 flex justify-center">
        <NuxtPage />
      </div>
      <Footer />
    </div>
    <Analytics />
  </div>
</template>
