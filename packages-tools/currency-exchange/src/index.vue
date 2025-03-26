<script setup lang="ts">
const currencies = ref(['AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 'BAM', 'BBD', 'BDT', 'BGN', 'BHD', 'BIF', 'BMD', 'BND', 'BOB', 'BRL', 'BSD', 'BTN', 'BWP', 'BYN', 'BZD', 'CAD', 'CDF', 'CHF', 'CLP', 'CNY', 'COP', 'CRC', 'CUP', 'CVE', 'CZK', 'DJF', 'DKK', 'DOP', 'DZD', 'EGP', 'ERN', 'ETB', 'EUR', 'FJD', 'FKP', 'FOK', 'GBP', 'GEL', 'GGP', 'GHS', 'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 'IDR', 'ILS', 'IMP', 'INR', 'IQD', 'IRR', 'ISK', 'JEP', 'JMD', 'JOD', 'JPY', 'KES', 'KGS', 'KHR', 'KID', 'KMF', 'KRW', 'KWD', 'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'LYD', 'MAD', 'MDL', 'MGA', 'MKD', 'MMK', 'MNT', 'MOP', 'MRU', 'MUR', 'MVR', 'MWK', 'MXN', 'MYR', 'MZN', 'NAD', 'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'OMR', 'PAB', 'PEN', 'PGK', 'PHP', 'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RWF', 'SAR', 'SBD', 'SCR', 'SDG', 'SEK', 'SGD', 'SHP', 'SLE', 'SLL', 'SOS', 'SRD', 'SSP', 'STN', 'SYP', 'SZL', 'THB', 'TJS', 'TMT', 'TND', 'TOP', 'TRY', 'TTD', 'TVD', 'TWD', 'TZS', 'UAH', 'UGX', 'USD', 'UYU', 'UZS', 'VES', 'VND', 'VUV', 'WST', 'XAF', 'XCD', 'XDR', 'XOF', 'XPF', 'YER', 'ZAR', 'ZMW', 'ZWL'])
const fromCurrency = ref('USD')
const toCurrency = ref('CNY')
const amount = ref(1)
const result = ref<number | null>(null)
const lastUpdated = ref('')
const loading = ref(false)
const error = ref('')

// 获取实时汇率（需要替换为你的API密钥）
const API_KEY = '6e6f3b43d6b159f6d8ebaa10'
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair`

interface ExchangeRateResponse {
  conversion_rate: number
  time_last_update_utc: string
}

async function convertCurrency() {
  if (!amount.value || amount.value <= 0) {
    error.value = 'Please enter a valid amount'
    return
  }

  try {
    loading.value = true
    error.value = ''

    const { data } = await useFetch<ExchangeRateResponse>(
      `${API_URL}/${fromCurrency.value}/${toCurrency.value}/${amount.value}`,
    )

    if (data.value) {
      result.value = data.value.conversion_rate * amount.value
      lastUpdated.value = new Date(data.value.time_last_update_utc).toLocaleString()
    }
  }
  catch (err) {
    error.value = '获取汇率失败，请稍后重试'
    console.error(err)
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-w-xl mx-auto p-4">
    <div class="p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <select v-model="fromCurrency" class="w-full p-2 border rounded dark:bg-[#1e1e1e]">
            <option v-for="currency in currencies" :key="currency" :value="currency">
              {{ currency }}
            </option>
          </select>
        </div>

        <div>
          <select v-model="toCurrency" class="w-full p-2 border rounded dark:bg-[#1e1e1e]">
            <option v-for="currency in currencies" :key="currency" :value="currency">
              {{ currency }}
            </option>
          </select>
        </div>
      </div>

      <div class="mt-4">
        <input
          v-model.number="amount"
          type="number"
          class="w-full p-2 border rounded dark:bg-[#1e1e1e]"
          placeholder="Enter amount"
        >
      </div>

      <div class="mt-6 text-center">
        <button
          :disabled="loading"
          class="px-4 py-2 bg-[#292929] text-white rounded hover:bg-[#393939] disabled:opacity-50"
          @click="convertCurrency"
        >
          {{ loading ? 'Converting...' : 'Convert' }}
        </button>
      </div>

      <div v-if="result" class="mt-6 p-4 bg-gray-100 dark:bg-[#1e1e1e] rounded">
        <div class="text-xl font-semibold">
          {{ amount }} {{ fromCurrency }} =
          <span class="text-blue-500">{{ result }} {{ toCurrency }}</span>
        </div>
        <div class="mt-2 text-sm text-gray-500">
          Exchange rate update time: {{ lastUpdated }}
        </div>
      </div>

      <div v-if="error" class="mt-4 p-3 bg-red-100 text-red-700 rounded">
        {{ error }}
      </div>
    </div>
  </div>
</template>
