import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Every entry is a file under src/content/. Adding a role, project, or article
// means adding one file; no component code changes. A field that is missing or
// the wrong type fails the build, so a bad file never reaches the live site.

/** The single profile entry: src/content/profile.json. */
const profile = defineCollection({
  loader: glob({ pattern: 'profile.json', base: './src/content' }),
  schema: z.object({
    name: z.string(),
    headline: z.string(),
    summary: z.string(),
    location: z.string().optional(),
    links: z
      .array(z.object({ label: z.string(), url: z.string().url() }))
      .default([]),
  }),
});

/** One file per role, e.g. src/content/experience/2022-acme.md. The body holds the details. */
const experience = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experience' }),
  schema: z.object({
    title: z.string(),
    company: z.string(),
    location: z.string().optional(),
    start: z.string().regex(/^\d{4}-\d{2}$/, 'Use YYYY-MM'),
    end: z.string().regex(/^\d{4}-\d{2}$/, 'Use YYYY-MM').optional(), // omit for a current role
    summary: z.string(),
    draft: z.boolean().default(false),
  }),
});

/** One file per project, e.g. src/content/projects/seura-photos.md. */
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    repo: z.string().url(),
    url: z.string().url().optional(), // a live site or demo, if there is one
    tech: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    order: z.number().int().default(100), // lower numbers are listed first
    draft: z.boolean().default(false),
  }),
});

/** One file per article. Usually a pointer to LinkedIn; the body can hold a full copy. */
const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    url: z.string().url(), // where it was originally published
    draft: z.boolean().default(false),
  }),
});

export const collections = { profile, experience, projects, articles };
