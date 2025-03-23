import {
  defineConfig,
  presetAttributify,
  presetMini,
  presetTagify,
} from 'unocss'

export default defineConfig({
  presets: [presetMini(), presetAttributify(), presetTagify()],
  shortcuts: {
    'bg-base': 'bg-white dark:bg-[#121212]',
    'text-base': 'text-black dark:text-white',
    'hlink-base': 'underline transition-colors font-bold hover:text-gray-500 text-gray-900 dark:text-gray-100',
    'bg-card': 'bg-white dark:bg-[#1e1e1e]',
    'border-card': 'border border-gray-200 dark:border-[#191919]',
    'bg-icon': 'bg-gray-50 dark:bg-[#131313]',
    'bg-button': 'bg-gray-100 dark:bg-[#1e1e1e] hover:bg-gray-200 dark:hover:bg-[#393939]',
    'text-button': 'text-gray-700 dark:text-gray-300',
    'bg-button-active': 'bg-[#1e1e1e] dark:bg-[#393939] text-white',
    'border-button': 'border border-gray-200 dark:border-gray-800 hover:border-gray-800 dark:hover:border-[#393939]',
  },
})
