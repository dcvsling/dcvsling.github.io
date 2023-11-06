
import { paths } from "../schema";

export type GitContentDir = paths['/repos/{owner}/{repo}/contents/{path}']['get']['responses']['200']['content']['application/json'] extends infer R
  ? R extends Array<infer I> ? I & { type: 'dir' } : never : never;
export type GitContentFile = paths['/repos/{owner}/{repo}/contents/{path}']['get']['responses']['200']['content']['application/json'] extends infer R
? R extends Array<any> ? never : R : never;
export type GitContent = GitContentDir | GitContentFile;
export type GitRef = paths['/repos/{owner}/{repo}/git/ref/{ref}']['get']['responses']['200']['content']['application/json'];

export interface GitTree {
  sha: string;
  url: string;
  truncated: boolean;
  tree: GitTreeItem[];
}
export interface GitTreeItemTree {
  path: string;
  type: 'tree';
  sha: string;
  size: number;
  url: string;
}
export interface GitTreeItemBlob {
  path: string;
  type: 'blob';
  sha: string;
  size: number;
  url: string;
}
export type GitTreeItem = GitTreeItemTree | GitTreeItemBlob;

export interface GitBlob {
  content: string;
  encoding: string;
  url: string;
  sha: string;
  size: number | null;
  node_id: string;
  highlighted_content?: string;
}

export type Commits = GitCommit[]

export interface GitDbCommit {
  url: string
  author?: SimpleUser
  committer?: SimpleUser
  message: string
  comment_count: number
  tree: Omit<GitTree, 'truncated' | 'tree'>
  verification: Verification
  parents: {
    sha: string
    url: string
    html_url?: string
  }[]
}
/**
 * Commit
 */
export interface GitCommit {
  url: string
  sha: string
  node_id: string
  html_url: string
  comments_url: string
  commit: GitDbCommit
  author?: GitUser
  committer?: GitUser
  stats: {
    additions?: number
    deletions?: number
    total?: number
  }
  parents: {
    sha: string
    url: string
    html_url?: string
  }[]
  file: GitFileDiff[]

}


/**
 * Metaproperties for Git author/committer information.
 */
export interface SimpleUser {
  name?: string
  email?: string
  date?: string
}

export interface Verification {
  verified: boolean
  reason: string
  payload?: string
  signature?: string
}

export type GitUser = paths['/user']['get']['responses']['200']['content']['application/json'];

export type GitDiffFileStatus
= "added"|
  "removed"|
  "modified"|
  "renamed"|
  "copied"|
  "changed"|
  "unchanged";

/**
 * Diff Entry
 */
export interface GitFileDiff {
  sha: string
  filename: string
  status: GitDiffFileStatus
  additions: number
  deletions: number
  changes: number
  blob_url: string
  raw_url: string
  contents_url: string
  patch?: string
  previous_filename?: string
}
