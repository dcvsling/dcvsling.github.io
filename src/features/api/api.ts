import { UrlParam } from "../fs";


export namespace GitApi {

  export const REPO_CONTENTS_URL = `/repos/{owner}/{repo}/contents{path}`;
  export const REPO_BLOB_URL = `/repos/{owner}/{repo}/git/blobs/{file_sha}`;
  export const REPO_TREE_URL = `/repos/{owner}/{repo}/git/trees/{tree_sha}`;
  export const REPO_TREE_RECURSIVE_URL = `/repos/{owner}/{repo}/git/trees/{tree_sha}?recursive={recursive}`;
  export const REPO_REF_URL = `/repos/{owner}/{repo}/git/ref/{ref}`;
  export const REPO_LAST_COMMITS_URL = `/repos/{owner}/{repo}/commits?per_page={itemsPerPage}&page={pages}`;
  export const REPO_COMMIT_DETAIL_URL = `/repos/{owner}/{repo}/commits/{sha}`;
  export const USER_URL = `/user`;
  export const ISSUES_URL = `/repos/{owner}/{repo}/issues`;
  export const ISSUE_URL = `/repos/{owner}/{repo}/issues/{issue_number}`;
  export const ISSUE_COMMENTS_WITH_NUMBER_URL = `/repos/{owner}/{repo}/issues/{issue_number}/comments`;
  export const ISSUE_COMMENTS_URL = '/repos/{owner}/{repo}/issues/comments';
  export const ISSUE_COMMENTS_WITH_ID_URL = '/repos/{owner}/{repo}/issues/comments/{comment_id}';

  export const REPO_CONTENTS = get(REPO_CONTENTS_URL);
  export const REPO_BLOB = get(REPO_BLOB_URL);
  export const REPO_TREE = get(REPO_TREE_URL);
  export const REPO_TREE_RECURSIVE = get(REPO_TREE_RECURSIVE_URL);
  export const REPO_REF = get(REPO_REF_URL);
  export const REPO_LAST_COMMITS = get(REPO_LAST_COMMITS_URL);
  export const REPO_COMMIT_DETAIL= get(REPO_COMMIT_DETAIL_URL);
  export const USER = get(USER_URL);
  export const ISSUES = get(ISSUES_URL);
  export const ISSUE = get(ISSUE_URL);
  export const ISSUE_COMMENTS_WITH_NUMBER = get(ISSUE_COMMENTS_WITH_NUMBER_URL);
  export const ISSUE_COMMENTS = get(ISSUE_COMMENTS_URL);
  export const ISSUE_COMMENTS_WITH_ID = get(ISSUE_COMMENTS_WITH_ID_URL);

  export function get<T extends string>(url: T): (param: UrlParam<T>) => string {
    return param => param ? fillSlot(url, param) : url;
  }

  export function fillSlot<U extends string>(url:U, param: UrlParam<U>): string {
    return Object.keys(param).reduce((u, key) => u.replace(`{${key}}`, param[key]), url);
  }
}
