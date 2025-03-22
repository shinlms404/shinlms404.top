import {
  defineConfig,
  presetAttributify,
  presetMini,
  presetTagify,
} from 'unocss'

export default defineConfig({
  presets: [presetMini(), presetAttributify(), presetTagify()],
  shortcuts: {
    'bg-base': 'bg-white dark:bg-black',
    'text-base': 'text-black dark:text-white',
    'hlink-base':
      'underline transition-colors font-bold hover:text-gray-500 text-gray-900 dark:text-gray-100',
  },
})
