import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const checkpoints = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/checkpoints" }),
  schema: z.object({
    date: z.date(),
    title: z.string(),
  }),
});

export const collections = { checkpoints };
