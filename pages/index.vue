<script lang="ts" setup>
const { setTitle } = usePageTitle()
setTitle('Home')
</script>

<template>
  <div class="flex flex-col justify-center items-start p-8 max-w-7xl">
    <ProfileSection />
    <!-- <ProjectLinks /> -->
    <SocialLinks />
    <SupportLinks />
  </div>
</template>

<style></style>
