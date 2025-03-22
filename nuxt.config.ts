// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-03-02",
  devtools: { enabled: true },
  modules: ["@unocss/nuxt", "nuxt-lodash", "@nuxt/icon"],
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      meta: [{ name: "baidu-site-verification", content: "codeva-oBnKCLc0P8" }]
    },
    pageTransition: { name: "page", mode: "out-in" }
  }
});
