// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-03-02",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "nuxt-lodash", "@nuxt/icon"],
  app: {
    head: {
      meta: [{ name: "baidu-site-verification", content: "codeva-oBnKCLc0P8" }]
    }
  }
});
