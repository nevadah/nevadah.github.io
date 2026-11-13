# nevadah.github.io — guide for Claude Code

Nevada Hamaker's personal website, at https://nevadah.github.io, built with Astro and published to GitHub Pages whenever `main` changes (see `.github/workflows/deploy.yml`). It presents his experience, his GitHub projects, and the articles he has written, mostly on LinkedIn. It supports his job search, so accuracy matters more than polish.

## Commands

- `npm ci` then `npm run dev` for a local server; `npm run build` must pass before pushing.

## How changes are made: always through a pull request

Never commit or push to `main` directly. Anything that reaches `main` is published within a few minutes, and Nevada reviews every change before that happens.

1. Start a branch from an up-to-date `main`: `content/<short-description>` for content, `site/<short-description>` for code, design, or configuration.
2. Make the change. `npm run build` must pass; check any visual change in a browser at desktop and phone widths, in light and dark mode.
3. Commit, push the branch, and open a pull request into `main`. The title says what changes on the site. The description lists the changes and quotes any new copy you wrote (article summaries, descriptions) in full, so Nevada can approve the wording there. If `gh pr create` isn't available, use the REST API: `gh api repos/nevadah/nevadah.github.io/pulls -f title=... -f head=<branch> -f base=main -f body=...`.
4. Wait for the "Check build" workflow on the pull request to pass, then give Nevada the link.
5. Don't merge it yourself. Nevada merges, and merging publishes. If he asks for changes, push more commits to the same branch.
6. After he merges, confirm the "Deploy to GitHub Pages" run for the merge commit succeeded.

## How content works

All content is data files in `src/content/`, validated by the schemas in `src/content.config.ts`. Pages read it through the helpers in `src/lib/content.ts`. Adding a role, project, or article means adding one file, not editing a component.

- `profile.json`: name, headline, summary, location, links, skills, education, and `resume` (path to the PDF in `public/`). Used in the header, footer, page metadata, and structured data.
- The resume PDF in `public/` is a copy with the phone number and email removed. When Nevada sends a new resume, remove them again (true redaction, not a cover-up) and check the text before replacing the file. Never publish his phone number or email.
- `experience/`: one Markdown file per role, named `YYYY-MM-company.md` by start date. Frontmatter: `title`, `company`, `location?`, `start` and `end` as `YYYY-MM` (omit `end` for a current role), `summary`, `draft`. The body holds the bullets.
- `projects/`: one file per project. Frontmatter: `title`, `description`, `repo`, `url?`, `tech`, `stack?` (a one-line summary of how it's built, shown instead of the tech list), `featured`, `order` (lower first), `draft`. The optional body is a fuller description of how it's built, shown under "How it's built".
- `articles/`: one file per article. Frontmatter: `title`, `description`, `date`, `url` (where it was published), `draft`. The body is optional and can hold a full copy.
- `draft: true` keeps an entry off the site. Placeholder entries are drafts; delete them once real ones exist.

## Facts and voice

- **Never invent facts.** Employers, titles, dates, accomplishments, metrics, technologies, and article details come only from Nevada, his resume, or his own repositories and posts. If something is missing, leave a clearly marked placeholder or ask.
- Text marked `PLACEHOLDER` is not final copy; Nevada rewrites it.
- Voice: first person where it fits, plain and specific, no hype or filler.
- Don't publish anything Nevada hasn't seen. The pull request is the review, so new content can go in ready to publish. Use `draft: true` only for an entry that should stay in the repository but off the site.

## Site rules

- No tracking, analytics, cookies, ads, or third-party requests. No external fonts or scripts.
- Every page must work at phone width, in light and dark mode, and meet WCAG AA contrast.
- Every page needs a real `<title>`, a description, and Open Graph tags (from `Base.astro`), because links to this site get pasted into LinkedIn and email.
- The link preview card (`src/lib/og.ts`, `src/pages/og/home.png.ts`) is generated at build time from `profile.json`; nothing to do by hand when the profile changes. A new page that needs its own card gets its own route under `src/pages/og/` and passes `image` to `Base.astro`.
- Keep the structured data (`Person` in `Base.astro`) accurate.
- The design is clean and text-first: a margin rail for section names and dates beside a reading column, Source Serif 4 and Public Sans, ink on white with one blue for links. Keep to it; larger visual changes are discussed with Nevada first.
