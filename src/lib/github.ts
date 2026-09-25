// Merged PR counts from GitHub's search API. Fetched once at build time so the
// HTML always carries a real number; the page then refreshes it live in the
// browser (see src/components/PrCounts.astro).

export const GITHUB_USER = "laypatel13";

export const OSS_REPOS = {
  learningUnlimited: "learning-unlimited/ESP-Website",
  freeCodeCamp: "freeCodeCamp/freeCodeCamp",
} as const;

export type OssRepo = (typeof OSS_REPOS)[keyof typeof OSS_REPOS];

// last known counts, used when GitHub can't be reached (offline build, rate limit)
const FALLBACK: Record<OssRepo, number> = {
  "learning-unlimited/ESP-Website": 4,
  "freeCodeCamp/freeCodeCamp": 23,
};

export const mergedQuery = (repo: string) => `is:pr is:merged author:${GITHUB_USER} repo:${repo}`;

// the same search as a page on github.com, for "N merged PRs" links
export const mergedPrsUrl = (repo: string) =>
  `https://github.com/${repo}/pulls?q=${encodeURIComponent(`is:pr is:merged author:${GITHUB_USER}`)}`;

// the dev server re-renders on every request, so keep results for a while to
// stay under the unauthenticated search limit (10 requests a minute)
const TTL = 10 * 60 * 1000;
const cache = new Map<OssRepo, { count: number; at: number }>();

async function fetchMerged(repo: OssRepo): Promise<number> {
  const hit = cache.get(repo);
  if (hit && Date.now() - hit.at < TTL) return hit.count;

  const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
  const token = import.meta.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const url = `https://api.github.com/search/issues?per_page=1&q=${encodeURIComponent(mergedQuery(repo))}`;
    const res = await fetch(url, { headers, signal: AbortSignal.timeout(5000) });
    if (!res.ok) throw new Error(`GitHub search ${res.status}`);
    const { total_count } = (await res.json()) as { total_count: number };
    cache.set(repo, { count: total_count, at: Date.now() });
    return total_count;
  } catch (error) {
    console.warn(`[github] using fallback PR count for ${repo}:`, (error as Error).message);
    return hit?.count ?? FALLBACK[repo];
  }
}

export async function getMergedCounts() {
  const repos = Object.values(OSS_REPOS);
  const counts = await Promise.all(repos.map(fetchMerged));
  const byRepo = Object.fromEntries(repos.map((repo, i) => [repo, counts[i]])) as Record<OssRepo, number>;
  return { byRepo, total: counts.reduce((sum, n) => sum + n, 0) };
}
