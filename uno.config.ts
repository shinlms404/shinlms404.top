import {
  defineConfig,
  presetAttributify,
  presetMini,
  presetTagify,
  presetTypography,
} from 'unocss'

export default defineConfig({
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
            color: '#333',
            a: {
              'color': '#3182ce',
              '&:hover': {
                color: '#2c5282',
              },
            },
            code: {
              color: '#805ad5',
              backgroundColor: '#f7fafc',
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
            },
            pre: {
              backgroundColor: '#f7fafc',
              padding: '1em',
              borderRadius: '0.25rem',
              overflow: 'auto',
            },
          },
        },
        invert: {
          css: {
            color: '#d1d5db',
            a: {
              'color': '#60a5fa',
              '&:hover': {
                color: '#93c5fd',
              },
            },
            code: {
              color: '#c4b5fd',
              backgroundColor: '#1f2937',
            },
            pre: {
              backgroundColor: '#1f2937',
            },
          },
        },
      },
    },
  },
  presets: [presetMini(), presetAttributify(), presetTagify(), presetTypography()],
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
    'prose': 'text-base leading-relaxed',
    'prose-invert': 'text-gray-300',
  },
})
