import { paths } from '../schema';


export type GitIssues = paths['/repos/{owner}/{repo}/issues']['get']['responses']['200']['content']['application/json'];
export type GitIssue = GitIssues[number];
export type GitIssueAdd = paths['/repos/{owner}/{repo}/issues']['post']['requestBody']['content']['application/json'];
export type GitIssueUpdate = paths['/repos/{owner}/{repo}/issues/{issue_number}']['patch']['requestBody'] extends infer O ? O extends { 'content': {
  'application/json': infer T
} } ? T : never : never;


export type GitIssueComments = paths['/repos/{owner}/{repo}/issues/comments']['get']['responses']['200']['content']['application/json'];
export type GitIssueComment = GitIssueComments[number];
export type GitIssueCommentAdd = paths['/repos/{owner}/{repo}/issues/{issue_number}/comments']['post']['requestBody']['content']['application/json'];
export type GitIssueCommentUpdate = paths['/repos/{owner}/{repo}/issues/comments/{comment_id}']['patch']['requestBody']['content']['application/json'];
export type GitIssueCommentRemove = paths['/repos/{owner}/{repo}/issues/comments/{comment_id}']['delete']['parameters']['path'];
