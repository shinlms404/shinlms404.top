<script setup>
import { ref } from 'vue'

const patternDescription = ref('')
const regexPattern = ref('')

function generateRegex() {
  const description = patternDescription.value.toLowerCase().trim()
  if (!description) {
    regexPattern.value = ''
    return
  }

  if (description.includes('email')) {
    // Simple email regex
    regexPattern.value = '/^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$/'
  }
  else if (description.includes('url')) {
    // Simple URL regex
    regexPattern.value = '/^(https?:\\/\\/)?([\\da-z.-]+)\\.([a-z.]{2,6})([\\/\\w .-]*)*\\/?$/'
  }
  else if (description.includes('phone')) {
    // Simple US phone regex
    regexPattern.value = '/^(\\+\\d{1,2}\\s?)?1?\\-?\\.?\\s?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$/'
  }
  else if (description.includes('ip') && !description.includes('ipv6')) {
    // IPv4 regex
    regexPattern.value = '/^(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}$/'
  }
  else if (description.includes('date')) {
    // Date regex (YYYY-MM-DD)
    regexPattern.value = '/^\\d{4}-(0[1-9]|1[012])-(0[1-9]|[12]\\d|3[01])$/'
  }
  else if (description.includes('time')) {
    // Time regex (HH:MM or HH:MM:SS)
    regexPattern.value = '/^(?:[01]\\d|2[0-3]):[0-5]\\d(?::[0-5]\\d)?$/'
  }
  else if (description.includes('password')) {
    // Simple password regex: minimum eight characters, at least one letter and one number
    regexPattern.value = '/^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$/'
  }
  else if (description.includes('username')) {
    // Username regex: letters, numbers, underscores, 3-16 characters
    regexPattern.value = '/^[a-zA-Z0-9_]{3,16}$/'
  }
  else if (description.includes('hex')) {
    // Hex color code regex
    regexPattern.value = '/^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/'
  }
  else if (description.includes('credit card')) {
    // Simplified credit card regex (Visa/MasterCard)
    regexPattern.value = '/^(4\\d{12}(\\d{3})?|5[1-5]\\d{14})$/'
  }
  else if (description.includes('ssn')) {
    // US Social Security Number regex (SSN)
    regexPattern.value = '/^(?!000|666|9\\d{2})\\d{3}-(?!00)\\d{2}-(?!0000)\\d{4}$/'
  }
  else if (description.includes('postal code')) {
    // US Postal Code regex (5 digits or 5+4 digits)
    regexPattern.value = '/^\\d{5}(-\\d{4})?$/'
  }
  else if (description.includes('ipv6')) {
    // Simplified IPv6 regex
    regexPattern.value = '/^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/'
  }
  else if (description.includes('uuid')) {
    // UUID regex
    regexPattern.value = '/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i'
  }
  else if (description.includes('html')) {
    // Simple HTML tag regex
    regexPattern.value = '/^<([a-z]+)([^<]+)*(?:>(.*)<\\/\\1>|\\s+\\/>)$/'
  }
  else if (description.includes('md5')) {
    // MD5 hash regex
    regexPattern.value = '/^[a-f0-9]{32}$/i'
  }
  else if (description.includes('slug')) {
    // Slug regex: lowercase letters, numbers, hyphens
    regexPattern.value = '/^[a-z0-9]+(?:-[a-z0-9]+)*$/'
  }
  else if (description.includes('name')) {
    // Simple name regex: letters and spaces
    regexPattern.value = '/^[a-zA-Z]+(?: [a-zA-Z]+)*$/'
  }
  else {
    // Default: match any character
    regexPattern.value = '/.*/'
  }
}
</script>

<template>
  <div class="text-black dark:text-white flex items-center justify-center p-4">
    <div class="max-w-lg w-full border border-gray-300 dark:border-gray-600 rounded-lg p-6">
      <h1 class="text-2xl font-bold mb-4">
        Regex Generator
      </h1>
      <p class="mb-4">
        Enter a pattern description (e.g., email, URL, phone, IP, date, time, password, username, hex, credit card, SSN, postal code, IPv6, UUID, HTML, MD5, slug, name) to generate a recommended regex.
      </p>
      <input
        v-model="patternDescription"
        type="text"
        placeholder="e.g., email, URL, phone number, IP"
        class="w-full p-2 rounded mb-4 border border-gray-300 dark:border-[#191919] dark:bg-[#191919]"
      >
      <button
        class="bg-gray-800 text-white dark:bg-gray-400 dark:text-black px-4 py-2 rounded hover:opacity-80 transition"
        @click="generateRegex"
      >
        Generate Regex
      </button>
      <div v-if="regexPattern" class="mt-4 p-4 border border-gray-300 dark:border-gray-600 rounded">
        <h2 class="font-semibold">
          Recommended Regex:
        </h2>
        <p class="mt-2 font-mono break-all">
          {{ regexPattern }}
        </p>
      </div>
    </div>
  </div>
</template>
