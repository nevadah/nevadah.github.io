import { getCollection, getEntry } from 'astro:content';

/** The profile from src/content/profile.json. */
export async function getProfile() {
  const entry = await getEntry('profile', 'profile');
  if (!entry) throw new Error('src/content/profile.json is missing');
  return entry.data;
}

/** Published roles, most recent start date first. */
export async function getExperience() {
  const roles = await getCollection('experience', ({ data }) => !data.draft);
  return roles.sort((a, b) => b.data.start.localeCompare(a.data.start));
}

/** Published projects: featured first, then by `order`, then by title. */
export async function getProjects() {
  const projects = await getCollection('projects', ({ data }) => !data.draft);
  return projects.sort(
    (a, b) =>
      Number(b.data.featured) - Number(a.data.featured) ||
      a.data.order - b.data.order ||
      a.data.title.localeCompare(b.data.title),
  );
}

/** Published articles, newest first. */
export async function getArticles() {
  const articles = await getCollection('articles', ({ data }) => !data.draft);
  return articles.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** "2022-03" → "Mar 2022"; "1996" → "1996"; no value → "Present". */
export function formatMonth(value?: string) {
  if (!value) return 'Present';
  const [year, month] = value.split('-').map(Number);
  if (!month) return String(year);
  return new Date(Date.UTC(year, month - 1)).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
