# nevadah.github.io — guide for Claude Code

Nevada Hamaker's personal website, at https://nevadah.github.io, built with Astro and published to GitHub Pages from `main` (see `.github/workflows/deploy.yml`). It presents his experience, his GitHub projects, and the articles he has written, mostly on LinkedIn. It supports his job search, so accuracy matters more than polish.

## Commands

- `npm ci` then `npm run dev` for a local server; `npm run build` must pass before pushing.
- Pushing to `main` publishes the site within a few minutes. Treat a push as publishing.

## How content works

All content is data files in `src/content/`, validated by the schemas in `src/content.config.ts`. Pages read it through the helpers in `src/lib/content.ts`. Adding a role, project, or article means adding one file, not editing a component.

- `profile.json`: name, headline, summary, location, and links (GitHub, LinkedIn, email). Used in the header, footer, page metadata, and structured data.
- `experience/`: one Markdown file per role, named `YYYY-MM-company.md` by start date. Frontmatter: `title`, `company`, `location?`, `start` and `end` as `YYYY-MM` (omit `end` for a current role), `summary`, `draft`. The body holds the bullets.
- `projects/`: one file per project. Frontmatter: `title`, `description`, `repo`, `url?`, `tech`, `featured`, `order` (lower first), `draft`.
- `articles/`: one file per article. Frontmatter: `title`, `description`, `date`, `url` (where it was published), `draft`. The body is optional and can hold a full copy.
- `draft: true` keeps an entry off the site. Placeholder entries are drafts; delete them once real ones exist.

## Facts and voice

- **Never invent facts.** Employers, titles, dates, accomplishments, metrics, technologies, and article details come only from Nevada, his resume, or his own repositories and posts. If something is missing, leave a clearly marked placeholder or ask.
- Text marked `PLACEHOLDER` is not final copy; Nevada rewrites it.
- Voice: first person where it fits, plain and specific, no hype or filler.
- Don't publish anything Nevada hasn't seen. New content goes in with `draft: true` unless he says otherwise.

## Site rules

- No tracking, analytics, cookies, ads, or third-party requests. No external fonts or scripts.
- Every page must work at phone width, in light and dark mode, and meet WCAG AA contrast.
- Every page needs a real `<title>`, a description, and Open Graph tags (from `Base.astro`), because links to this site get pasted into LinkedIn and email.
- Keep the structured data (`Person` in `Base.astro`) accurate.
- The current design is a placeholder; larger visual changes are discussed with Nevada first.
