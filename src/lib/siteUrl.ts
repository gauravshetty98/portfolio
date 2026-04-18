/**
 * Public site root (no trailing slash). Used by the chat API to attach
 * deep links the model can return to users.
 */
export function getSiteRoot(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (explicit) return explicit;
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/$/, "")}`;
  return "http://localhost:3000";
}

/** e.g. sectionId "about" -> https://host/#about */
export function siteSectionUrl(sectionId: string): string {
  const id = sectionId.replace(/^#/, "");
  return `${getSiteRoot()}/#${id}`;
}

export function siteProjectPageUrl(slug: string): string {
  const root = getSiteRoot();
  return `${root}/projects/${encodeURIComponent(slug)}`;
}

/**
 * Optional: set NEXT_PUBLIC_GITHUB_FILE_BASE to your repo's main-branch root, e.g.
 * https://github.com/you/portfolio/blob/main
 */
export function getGithubFileBase(): string | null {
  const b = process.env.NEXT_PUBLIC_GITHUB_FILE_BASE?.trim().replace(/\/$/, "");
  return b || null;
}

export function githubBlobUrl(repoRelativePath: string): string | null {
  const base = getGithubFileBase();
  if (!base) return null;
  const p = repoRelativePath.replace(/^\/+/, "");
  return `${base}/${p}`;
}

/** Hash links for the classic one-page layout (see SharedHero nav). */
export function portfolioNavigation() {
  const root = getSiteRoot();
  return {
    home: root,
    sections: {
      about: `${root}/#about`,
      experience: `${root}/#experience`,
      education: `${root}/#education`,
      projects: `${root}/#projects`,
      publications: `${root}/#publications`,
      skills: `${root}/#skills`,
      contact: `${root}/#contact`,
    },
    note: "Opening these URLs (or middle-click) loads the site; hash paths match classic layout sections. If the visitor is already in Chat mode, they can use the header toggle to switch to Classic to scroll those sections.",
  };
}

export function sourceFileLink(repoRelativePath: string) {
  const viewOnGithub = githubBlobUrl(repoRelativePath);
  return {
    pathInRepo: repoRelativePath,
    ...(viewOnGithub ? { viewOnGithub } : {}),
  };
}
