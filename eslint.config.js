import antfu from '@antfu/eslint-config'

export default antfu(
  {
    vue: true,
    typescript: true,
    solid: false,
    svelte: false,
    astro: false,
    formatters: true,
  },
  {
    ignores: [
      '.nuxt/**',
      '.output/**',
    ],
  },
)
