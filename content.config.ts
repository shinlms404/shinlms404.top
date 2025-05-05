import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    tools: defineCollection({
      type: 'data',
      source: 'tools/**.json',
      schema: z.object({
        id: z.string(),
        name: z.string(),
        path: z.string(),
        description: z.string(),
        icon: z.string(),
        category: z.string(),
        isExternal: z.boolean().optional(),
        recommended: z.boolean(),
      }),
    }),
  },
})
