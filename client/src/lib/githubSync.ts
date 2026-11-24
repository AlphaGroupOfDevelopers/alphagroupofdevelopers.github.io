/**
 * GitHub Sync Service
 * Commits site data changes directly to the GitHub repository via the GitHub API.
 * This triggers GitHub Actions to rebuild and redeploy the site globally.
 */

import { SiteData } from "@/types/site";

const GITHUB_API = "https://api.github.com";
const REPO_OWNER = "AlphaGroupOfDevelopers";
const REPO_NAME = "alphagroupofdevelopers.github.io";
const FILE_PATH = "client/src/data/initialSiteData.ts";
const BRANCH = "main";

const PAT_STORAGE_KEY = "alpha_github_pat";

export function saveGitHubPAT(token: string) {
  localStorage.setItem(PAT_STORAGE_KEY, token.trim());
}

export function getGitHubPAT(): string {
  return localStorage.getItem(PAT_STORAGE_KEY) || "";
}

export function clearGitHubPAT() {
  localStorage.removeItem(PAT_STORAGE_KEY);
}

export function hasGitHubPAT(): boolean {
  return !!localStorage.getItem(PAT_STORAGE_KEY);
}

/**
 * Converts the SiteData object into a valid TypeScript file content string.
 */
function generateSiteDataFile(data: SiteData): string {
  // Strip lastUpdated before writing (it's runtime metadata)
  const { lastUpdated, ...cleanData } = data as SiteData & { lastUpdated?: string };
  const jsonString = JSON.stringify(cleanData, null, 2);
  return `import { SiteData } from "@/types/site";\n\nexport const initialSiteData: SiteData = ${jsonString};\n`;
}

interface GitHubFileInfo {
  sha: string;
  content: string;
}

/**
 * Fetches the current SHA of the file (required by GitHub API for updates).
 */
async function getCurrentFileSHA(token: string): Promise<GitHubFileInfo> {
  const url = `${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}?ref=${BRANCH}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      `GitHub API error ${res.status}: ${(err as { message?: string }).message || res.statusText}`
    );
  }

  const data = await res.json() as { sha: string; content: string };
  return { sha: data.sha, content: data.content };
}

/**
 * Commits the updated site data to GitHub.
 * Returns true on success, throws on failure.
 */
export async function commitSiteDataToGitHub(
  siteData: SiteData,
  commitMessage = "chore: update site content via admin panel"
): Promise<{ success: true; commitUrl: string }> {
  const token = getGitHubPAT();
  if (!token) {
    throw new Error("No GitHub PAT configured. Please add it in Admin → Settings → GitHub Sync.");
  }

  // 1. Get current SHA of the file
  const { sha } = await getCurrentFileSHA(token);

  // 2. Build new file content
  const newContent = generateSiteDataFile(siteData);
  const encodedContent = btoa(unescape(encodeURIComponent(newContent)));

  // 3. Commit via GitHub API
  const url = `${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`;
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: JSON.stringify({
      message: commitMessage,
      content: encodedContent,
      sha,
      branch: BRANCH,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      `Commit failed ${res.status}: ${(err as { message?: string }).message || res.statusText}`
    );
  }

  const result = await res.json() as { commit: { html_url: string } };
  return { success: true, commitUrl: result.commit.html_url };
}

/**
 * Validates a GitHub PAT by checking it can read the repo.
 */
export async function validateGitHubPAT(token: string): Promise<boolean> {
  try {
    const url = `${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
    return res.ok;
  } catch {
    return false;
  }
}
