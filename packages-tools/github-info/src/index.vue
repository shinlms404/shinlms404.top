<script setup>
const query = ref('')
const result = ref(null)
const error = ref('')
const loading = ref(false)

async function fetchInfo() {
  if (!query.value) {
    error.value = 'Please enter a username'
    return
  }

  loading.value = true
  error.value = ''
  result.value = null

  try {
    const response = await fetch(`https://api.github.com/users/${query.value}`)
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }

    result.value = await response.json()
  }
  catch (e) {
    error.value = e.message
  }
  finally {
    loading.value = false
  }
}

function openProfile() {
  if (result.value?.html_url) {
    window.open(result.value.html_url, '_blank')
  }
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6 dark:text-white">
      GitHub Info
    </h1>

    <div class="mb-6">
      <div class="flex gap-4">
        <input
          v-model="query"
          placeholder="Enter GitHub username"
          class="flex-1 px-4 py-2 border rounded-lg dark:bg-[#191919] dark:border-gray-700 dark:text-white"
          @keyup.enter="fetchInfo"
        >
        <button
          class="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 dark:bg-[#292929] dark:hover:bg-gray-700"
          :disabled="loading"
          @click="fetchInfo"
        >
          {{ loading ? 'Loading...' : 'Search' }}
        </button>
      </div>
    </div>

    <div v-if="error" class="p-4 bg-red-100 text-red-700 rounded-lg mb-6 dark:bg-red-900 dark:text-red-200">
      {{ error }}
    </div>

    <div v-if="result" class="bg-white rounded-lg shadow-lg p-6 dark:bg-[#292929]">
      <div class="flex items-center gap-4 mb-4">
        <img :src="result.avatar_url" class="w-16 h-16 rounded-full">
        <div>
          <h2 class="text-xl font-bold dark:text-white">
            {{ result.name }}
          </h2>
          <p class="text-gray-600 dark:text-gray-300">
            {{ result.bio }}
          </p>
        </div>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="p-4 bg-gray-50 rounded-lg dark:bg-[#191919]">
          <div class="text-sm text-gray-600 dark:text-gray-300">
            Followers
          </div>
          <div class="text-xl font-bold dark:text-white">
            {{ result.followers }}
          </div>
        </div>
        <div class="p-4 bg-gray-50 rounded-lg dark:bg-[#191919]">
          <div class="text-sm text-gray-600 dark:text-gray-300">
            Following
          </div>
          <div class="text-xl font-bold dark:text-white">
            {{ result.following }}
          </div>
        </div>
        <div class="p-4 bg-gray-50 rounded-lg dark:bg-[#191919]">
          <div class="text-sm text-gray-600 dark:text-gray-300">
            Public Repos
          </div>
          <div class="text-xl font-bold dark:text-white">
            {{ result.public_repos }}
          </div>
        </div>
        <div class="p-4 bg-gray-50 rounded-lg dark:bg-[#191919]">
          <div class="text-sm text-gray-600 dark:text-gray-300">
            Location
          </div>
          <div class="text-xl font-bold dark:text-white">
            {{ result.location || 'N/A' }}
          </div>
        </div>
      </div>
      <div class="mt-6 flex justify-end">
        <button
          class="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 dark:bg-[#292929] dark:hover:bg-[#191919] flex items-center gap-2"
          @click="openProfile"
        >
          <span>View Profile</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
