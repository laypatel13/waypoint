import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const checkpoints = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/checkpoints" }),
  schema: z.object({
    date: z.date(),
    title: z.string(),
    // highlight: an achievement with a short story; learning: a course or certificate
    kind: z.enum(["highlight", "learning"]),
    issuer: z.string().optional(),
  }),
});

export const collections = { checkpoints };
